---
title: 播放 Lofi Girl 的小脚本
date: 2023-08-27T19:18:26+08:00 
---

自测 Lofi 对集中注意力有些帮助，然而如果长时间用 Chrome / Firefox 来播放似乎会导致奇怪的内存溢出问题，原因可能和 Youtube 的播放器默认会缓存已播放的片段有关。换用 MPV 似乎可以解决此问题。于是顺手写了个小脚本，结合 yt-dlp 和 mpv，一键播放 Lofi Girls。使用前请先自行下载 [yt-dlp](https://github.com/yt-dlp/yt-dlp) 和 [mpv](https://sourceforge.net/projects/mpv-player-windows/files/)。

```bat
::set HTTP_PROXY=http://localhost:[some_port]
cd C:\Apps\mpv-x86_64-20230723-git-ca4192e
mpv --no-video  "https://www.youtube.com/watch?v=jfKfPfyJRdk" --script-opts=ytdl_hook-ytdl_path=yt-dlp.exe
```


另外附上一些常见快捷键（[完整见此](https://defkey.com/mpv-media-player-shortcuts)）
```
9：减小音量
0：增大音量
空格：暂停播放（但是依然会在后台继续缓冲）
M：静音
```