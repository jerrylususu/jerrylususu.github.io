---
title: Reinstall Without Data Loss - Repair Install
date: 2021-02-18T01:47:01+03:00
description: Essentially, it is a major version update for Windows.
---

## Introduction
Recently, my main computer running Windows 10 encountered some strange issues, such as the Start menu not opening at times. My initial reaction was to try repairing using the `sfc`/`dism` commands, but it didn't work. I also tried various other methods, but the problem persisted. At this point, reinstalling seemed like the only option, but the thought of backing up data and reinstalling all the software was daunting. However, I stumbled upon a little trick called "Repair Install" that actually solved the problem. I couldn't find anyone else mentioning it on the forum, so I decided to share it here.

## What is "Repair Install"?
You may not have heard of Repair Install as a Windows user, but you have probably experienced it before: major updates in Windows 10. After completing an update, if you go to "Settings - System - About," you'll notice that the "Installation date" has been changed to the date of the update. This is because a major update in Windows 10 is actually a reinstallation of the system that preserves user data (including files, applications, and settings). That's why major updates usually take longer and show progress percentages similar to a fresh installation.

Looking at it from a different perspective, since the Windows update mechanism allows for this special type of reinstallation that preserves user data, can users perform it manually? That's essentially what Repair Install is: a manual "major update."
(Note: "major update" is in quotes because it doesn't necessarily require a higher version of the installation media compared to the currently installed system; it can be done with the same version.)

## When is "Repair Install" suitable?
"Repair Install" is suitable when Windows 10 has strange issues that cannot be fixed through other means, including but not limited to:
- Start menu not opening
- UWP apps not opening
- Missing fonts/icons
- Registry corruption

## Prerequisites for "Repair Install"
- Windows can be started normally and accessed from the desktop (if the system cannot be started, there is no solution, even safe mode cannot use this method)
- The installation ISO needs to match the current installed system: same SKU (Home/Pro), same architecture (x86/x64), same language, and the installation ISO version needs to be higher than or equal to the current installed system version
- The current system partition has sufficient free space (according to tenforums, at least 8.87 GB, although the source of this number is unknown. It is recommended to reserve at least 15 GB to avoid a situation similar to [MacOS Big Sur](https://mrmacintosh.com/big-sur-upgrade-not-enough-hd-space-serious-issue-possible-data-loss/).)

## How to perform "Repair Install"
- Obtain the Windows 10 ISO (you can use Microsoft's official [Media Creation Tool](https://www.microsoft.com/en-gb/software-download/windows10) or a third-party direct link like [TechBench by WZT (v4.1.1) (rg-adguard.net)](https://tb.rg-adguard.net/public.php))
- Double-click to mount the ISO (you can also use other virtual drive tools)
- Go to the mounted drive and run `setup.exe`
- Proceed with the installation, and on the "Choose what to keep" page, select "Keep personal files, apps, and Windows settings"
- Wait patiently for the installation to complete

## Reference links
* [How to: Perform a Repair Upgrade Using the Windows 10 ISO file - Microsoft Community](https://answers.microsoft.com/en-us/windows/forum/windows_10-windows_install-winpc/how-to-perform-a-repair-upgrade-using-the-windows/35160fbe-9352-4e70-9887-f40096ec3085)
* [Repair Install Windows 10 with an In-place Upgrade | Tutorials (tenforums.com)](https://www.tenforums.com/tutorials/16397-repair-install-windows-10-place-upgrade.html)
* [How To Reinstall Windows 10 (neosmart.net)](https://neosmart.net/wiki/windows-10-repair-installation/#When_to_repair_install_Windows_10)