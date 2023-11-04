---
title: Monitor the number of goroutines
date: 2021-12-13T16:44:43+03:00 
tags:
- Go
---

Continuing to complete the previous debug process of writing Raft. After solving the Timer issue, it was discovered that even with repeated testing (using `--count 10`), the CPU usage continued to increase, although the rate of increase was reduced, it was still quite severe after multiple iterations. There was a preliminary suspicion that when transitioning roles, there might be a mishandling of goroutines leading to goroutine leaks. So, I searched on Stack Overflow and made some modifications to a code snippet that could print the current number of goroutines in the Go Runtime at regular intervals. Finally, it was indeed found that the number of goroutines kept increasing as the tests progressed. After fixing the leak issue (by adding various conditional checks), each time the test restarted, the number of goroutines would decrease to a level similar to the initial state, and the resource consumption during multiple tests also returned to normal.


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