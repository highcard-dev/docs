---
sidebar_position: 2
---

# How to Add Mods to an ARK Server

---

## 1. Enable Auto Managed Mods
---

Ensure `-automanagedmods` is in your start parameters to allow the server to auto-download and update mods.
This is included by default in your start parameters.

## 2. Edit `GameUserSettings.ini.scroll_template`
---

Open `GameUserSettings.ini.scroll_template` located in 
```plaintext
\serverfiles\ShooterGame\Saved\Config\LinuxServer\GameUserSettings.ini.scroll_template
``` 

Add your mod IDs under `[ServerSettings]`:

```ini
[ServerSettings]
ActiveMods=modID1,modID2
``` 
![GameUserSettings.ini.scroll_template](/img/ark/serversettings.png)

You can find the mod IDs within the description of the mods in [Steam Workshop](https://steamcommunity.com/app/346110/workshop/), as shown in the screenshot below.
![ModId](/img/ark/modid.png)

## 3. Edit `Game.ini`
---
Open `Game.ini` in the same directory:

```plaintext
\serverfiles\ShooterGame\Saved\Config\LinuxServer\Game.ini
```
Add your mod IDs under `[ModInstaller]`:

```ini
[ModInstaller]
ModIDS=modID1
ModIDS=modID2
```
![Game.ini](/img/ark/gameini.png)

## 4. Restart Server
---
Restart your server to apply the changes and verify mods are loaded by checking the Info.

![alt text](/img/ark/checkmods.png)

---
For more details, refer to the [official LGSM documentation](https://docs.linuxgsm.com/game-servers/ark-survival-evolved#adding-mods).

