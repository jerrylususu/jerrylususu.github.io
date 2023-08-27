---
title: Go Timer 的使用姿势
date: 2021-12-13T16:32:43+03:00 
tags:
- Go
---


之前写 Raft 的时候，用 Timer 来处理定时事件，但是之后在测试的时候遇到了一些诡异的问题，具体表现是随着测试重复进行，CPU 占用率越来越高。上 pprof 检查了一下，发现存在 Timer 泄露，根源是自己 Timer 的使用有些问题。下文记录正确的 Go 中 Timer 的使用姿势。



使用场景：

- 如果有 channel 里有数据（发生了事件），从 channel 里取出，并重置 heartbeat
- 如果没有事件，维持 heartbeat

例子：

* heartbeat interval = 1s
* event @ 200ms, 600ms
* 预期输出：200ms event, 600ms event, 1600ms heartbeat, 2600ms heartbeat ..



错误用法：

* 错误用法1：在 for 里，select 外用 time.Tick，每次循环都会产生一个新 Ticker 且不会被 GC （CPU 不断上升）
* 错误用法2：在 for 外用 time.NewTicker 创建一个 Ticker，但是不 Close （consumer 退出后 Ticker 依然存在，可以用 pprof 发现）

正确用法：for 外用 time.NewTicker 创建一个 Ticker，defer close，然后在 select 内，如果有事件则 reset。



示例代码：

```go
package main

import (
	"fmt"
	"log"
	//"math/rand"
	"net/http"
	"time"
	_ "net/http/pprof"
)

func main() {
	fmt.Println("hello world")

	go func() {
		log.Println(http.ListenAndServe("0.0.0.0:6060", nil))
	}()


	c := make(chan bool)

	// consumer
	// correct
	go func() {
		heartbeatInterval := 5 * time.Millisecond
		heartbeatTicker := time.NewTicker(heartbeatInterval)
		defer heartbeatTicker.Stop()
		for {
			select {
			case val := <- c:
				fmt.Println("received ",val, " at " , time.Now())
				heartbeatTicker.Reset(heartbeatInterval)
				if !val{
					return
				}
			case <- heartbeatTicker.C:
				fmt.Println("heartbeat: ", time.Now())
			}
		}
	}()


	// faulty, will cause heartbeak leak
	//go func() {
	//	for {
	//		heartbeat := time.Tick(5 * time.Millisecond)
	//		select {
	//		case val := <- c:
	//			fmt.Println("received ",val, " at " , time.Now())
	//		case <- heartbeat:
	//			//fmt.Println("heartbeat: ", time.Now())
	//		}
	//	}
	//}()

	// producer
	go func() {
		time.Sleep(1500 * time.Millisecond)
		c <- true
		time.Sleep(50 * time.Millisecond)
		c <- true
		time.Sleep(300 * time.Millisecond)
		c <- true
		time.Sleep(900 * time.Millisecond)
		c <- true
		time.Sleep(5 * time.Second)
        
        // stop the simulation
		c <- false
		//rng := rand.New(rand.NewSource(time.Now().Unix()))
		//for {
		//	time.Sleep(time.Duration(rng.Intn(5000)) * time.Millisecond)
		//	c <- true
		//}
		//fmt.Println("PRODUCER DONE")
	}()

	// keep main alive
	select {

	}


}
```



```bash
# run pprof
go tool pprof -http=0.0.0.0:8090  "http://localhost:6060/debug/pprof/profile?seconds=10"
```



如果使用上文代码中标记 faulty 的版本，在 pprof 的输出中可以发现 `epollwait` 和 `sendTime` 占用了大量的 CPU 时间。在 Raft 作业的测试中，每个测试样例都会开启一个新的 Raft Run，但是不会重启 Runtime，导致之前样例中泄露的 Timer 在整个测试过程中会一直存活，CPU 占用率不断上升。

![Leak](/img/raft_timer_leak.png)




