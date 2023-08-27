---
title: Go 监控协程数量
date: 2021-12-13T16:44:43+03:00 
tags:
- Go
---

继续补全之前写 Raft 的 debug 过程。在解决了 Timer 问题之后，发现如果多次重复测试（用 `--count 10`），依然会存在 CPU 占用率不断上升的情况，虽然上升幅度有所减小，但多次循环之后依然很严重。初步怀疑是角色转换的时候，可能协程没处理好导致出现了 goroutine 泄露，于是找了找 Stack Overflow，魔改了一个能间隔一定时间打印出当前 Go Runtime 中协程数量的代码。最后发现的确是随着测试进行，协程数不断上升；修复泄露问题后（加了各种判断 flag），每次测试重新开始的时候，协程数会降低到和一开始差不多的水平，多次测试的资源占用也正常多了。


```go
const Debug = 0

var DebugShowGoroutineCount uint32

func showGoroutineCount() {
	beginTime := time.Now()
	ticker := time.NewTicker(5 * time.Second)
	defer ticker.Stop()
	for {
		select {
		case <-ticker.C:
			fmt.Println("time:", time.Since(beginTime), "goroutine count:", runtime.NumGoroutine())
		}
	}
}

func runShowGoroutineCount() {
	if atomic.CompareAndSwapUint32(&DebugShowGoroutineCount, 0, 1) {
		go showGoroutineCount()
	}
}

// to start, just invoke `runShowGoroutineCount` at anywhere you like, perhaps at `ServerStart` or something like that.
```