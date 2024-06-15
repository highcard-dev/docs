---
sidebar_position: 1
---


# How to Change ARK Server Start Parameters (Change Map/Disable Anti Cheat)

---

## 1. Open Your Files

![Open Files](/img/ark/open_files.png)

## 2. Open lgsm-config Directory

![Open lgsm-config](/img/ark/config_lgsm.png)

## 3. Open _default.cfg

Copy the selected settings as shown in the picture below.

![Copy Settings](/img/ark/copy_default_cfg.png)

## 4. Paste Your Settings

Paste your copied settings into the `arkserver.cfg.scroll_template` file below the existing lines as shown in the picture below.

![Copy Settings 2](/img/ark/copy_into_arkserver.png)

## 5. Change the Default Map

Replace "TheIsland" with one of the default maps you want to play on.

`Default Map: TheIsland, Ragnarok, CrystalIsles, Aberration_P, ScorchedEarth_P, TheCenter, Extinction, Valguero_P, Genesis, Gen2, Fjordur`

![Change Default Map](/img/ark/change_defaultmap.png)

## 6. Disable Anti Cheat BattlEye and VAC

If you experience connection issues with the Epic Games or Steam, add `-NoBattlEye` and `-insecure` to your start parameters.

If you want, you can also just copy this content and replace it with yours.

`startparameters="${defaultmap}?AltSaveDirectoryName=${altsavedirectoryname} -MultiHome=${ip} -Port=${port} -QueryPort=${queryport} -AutoManagedMods -Crossplay -PublicIPForEpic=${publicip} -NoBattlEye -insecure"`

## 7. Restart Your Server to Apply the Changes

Click the restart button once.

![Restart Server](/img/ark/restart_server.png)

## 8. Start Your Client without Anti Cheat

Steam:

![Steam](/img/ark/start_without_anti_steam.png)

Epic Games:

![Epic Games](/img/ark/start_without_anti_epic.png)


## 9. More Startparameters

More start parameters can be found on the [LinuxGSM documentation](https://docs.linuxgsm.com/game-servers/ark-survival-evolved).

---

**Important Information:**

- Ensure you **paste your settings** correctly into the `arkserver.cfg.scroll_template` file.
- **Restart your server** after making changes to apply the new settings.
- **Disable Anti Cheat** settings if experiencing connection issues.

Enjoy your gaming experience!