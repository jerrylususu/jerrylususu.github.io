---
title: Connecting to Physical Screen with VNC
date: 2021-12-13T16:50:43+03:00 
tags:
- Pitfalls
---

When searching for "Linux remote desktop," most tutorials suggest using the combination of "xrdp + xfce4." In general, this combination works well, but it may not be as effective for certain special requirements. In my use case, there are times when I have a long-running task on a Linux workstation in the lab, and I need to check if the process is running smoothly when I return to my dormitory. If it were a regular CLI program, using terminal multiplexers like "screen" or "tmux" would be more than sufficient. However, I am using a GUI program. So, I searched for a solution and found that it is possible to connect to an ongoing X session using VNC, similar to tools like TeamViewer. Here are the specific steps:

1. Install the TigerVNC server.
2. Run "vncpasswd" to create a VNC password.
3. Start the TigerVNC service.
4. Use "x0vncserver" to open a VNC session connected to Display 0.
   ```bash
    x0vncserver -display :0 -PasswordFile=/home/{username}/.vnc/passwd 
   ```
5. Connect using a VNC client on another device.

In my own experience on Windows, it seems that RealVNC Viewer provides a better user experience compared to TigerVNC Viewer.

Another issue that may affect the user experience is scaling and screen resolution. The lab workstation has a 4K screen with 200% scaling, and when connecting from a 1080p laptop, the text may appear too small. TigerVNC seems to have an auto-scaling feature, but it doesn't seem to work when connecting the VNC session to a physical screen. My workaround is to first connect and then manually adjust the resolution settings on the remote system (usually setting it to 2560x1440 is sufficient), then restart x0vncserver and reconnect. Although it's a bit cumbersome, at least it solves the problem of usability.