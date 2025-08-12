---
title: 让 Claude Code 使用 tmux/screen 执行交互式操作
date: 2025-08-13T00:45:01+08:00
tags:
- hack
- llm
---

起因是逛 YouTube 时看到了 [Armin Ronacher](https://www.youtube.com/@ArminRonacher) 的这两个视频：
- [Claude Runs LLDB in Screen](https://www.youtube.com/watch?v=chSL6p5u-74)
- [Claude Code Debugs with LLDB in TMUX](https://www.youtube.com/watch?v=tg61cevJthc)

看起来很酷炫，但实际上原理很简单：screen/tmux 都支持通过命令行传递输入并返回当前正在展示的内容，只需要写个文档让 Claude Code 用就好了（见文末）。
- Screen: `-X stuff` 输入，`-X hardcopy` 输出
- Tmux: `send-keys` 输入，`capture-pane` 输出

甚至还可以 attach 上去看看在做什么。
- Screen: `screen -r ${session_name}` (Ctrl+A D 释放)
- Tmux: `tmux attach-session -t ${session_name}` (Ctrl+B D 释放)

两者相比，tmux 似乎更好一些，因为 screen 只能输出到文件，llm 还需要再 read 一次；tmux 的输出直接在 stdout，不用多绕一道。

这是一个 GIF 示例，展示了 Claude Code 在 tmux 中使用 gdb 解决经典的 bomb lab 问题。（加速 10x）
> 这只是一个通用能力的展示；如果你真的想要用 gdb，可能 [mcp-gdb](https://github.com/signal-slot/mcp-gdb) 是更好的选择。

![Demo](/img/claude-code-tmux.gif)

---

完整 prompt：
<pre>
# Debugging Guide for AI Agents

This guide provides instructions for debugging using `gdb` within terminal multiplexers. It covers two options: `screen` and `tmux`. Use these multiplexers to run a command in a detached session, allowing for input sending, output capturing, and session management. Sessions are named using `${session_name}` for consistency.

Sessions can be started with a specific command (e.g., `gdb`) or empty, with commands sent later. Examples assume a session running `gdb`.

## Using Screen

- **Starting the Session**: Start a detached `screen` session named `${session_name}`. Use flags like `-S` (session name), `-d` (detach), and `-m` (create even if detached). The `${command}` can be `gdb [optional-program]` or any other command.

  ```bash
  screen -S ${session_name} -d -m ${command}
  # Example: screen -S my-debug-session -d -m gdb my_program
  # Example: screen -S my-shell-session -d -m bash
  ```

- **Sending Input**: Send strings or commands into the session using the `stuff` command. Use `$'\n'` for newlines.

  ```bash
  screen -S ${session_name} -X stuff $'${input_string}\n'
  # Example: screen -S my-debug-session -X stuff $'run < /usr/share/dict/words\n'
  # Example: screen -S my-shell-session -X stuff $'ls -l\n'
  ```

- **Reading Output**: Screen does not output directly to stdout, so use a workaround: Capture the session output to a text file using `-X hardcopy`, then read the file.

  ```bash
  screen -S ${session_name} -X hardcopy tmp_screen_out.txt
  cat tmp_screen_out.txt
  ```

- **Closing the Session**: When debugging is finished, quit the session.

  ```bash
  screen -S ${session_name} -X quit
  ```

## Using Tmux

- **Starting the Session**: Start a detached `tmux` session named `${session_name}`. Use `new-session` with `-s` (session name) and `-d` (detach). The `${command}` can be `gdb [optional-program]` or any other command.

  ```bash
  tmux new-session -s ${session_name} -d ${command}
  # Example: tmux new-session -s my-debug-session -d gdb my_program
  # Example: tmux new-session -s my-shell-session -d bash
  ```

- **Sending Input**: Send strings or commands into the session using `send-keys`. Use `C-m` for Enter (newline).

  ```bash
  tmux send-keys -t ${session_name} '${input_string}' C-m
  # Example: tmux send-keys -t my-debug-session 'run < /usr/share/dict/words' C-m
  # Example: tmux send-keys -t my-shell-session 'pwd' C-m
  ```

- **Reading Output**: Capture the pane output directly to stdout using `capture-pane` with `-p`.

  ```bash
  tmux capture-pane -t ${session_name} -p
  ```

- **Closing the Session**: When debugging is finished, kill the session.

  ```bash
  tmux kill-session -t ${session_name}
  ```
```
</pre>