---
sidebar_position: 1
---

# ARK-Server Startparameter ändern (Map ändern/Anti-Cheat deaktivieren)

---

## 1. Öffne deine Dateien

![Open Files](/img/ark/open_files.png)

## 2. Öffne das lgsm-config Verzeichnis

![Open lgsm-config](/img/ark/config_lgsm.png)

## 3. Öffne _default.cfg

Kopiere die ausgewählten Einstellungen wie im Bild unten gezeigt.

![Copy Settings](/img/ark/copy_default_cfg.png)

## 4. Füge deine Einstellungen ein

Füge deine kopierten Einstellungen in die Datei `arkserver.cfg.scroll_template` unter den vorhandenen Zeilen ein, wie im Bild unten gezeigt.

![Copy Settings 2](/img/ark/copy_into_arkserver.png)

## 5. Ändere die Standard Map

Ersetze "TheIsland" durch eine der Standard Maps, die du spielen möchtest.

`Standard Maps: TheIsland, Ragnarok, CrystalIsles, Aberration_P, ScorchedEarth_P, TheCenter, Extinction, Valguero_P, Genesis, Gen2`

![Change Default Map](/img/ark/change_defaultmap.png)

## 6. Deaktiviere Anti-Cheat BattlEye und VAC

Wenn du Verbindungsprobleme mit Epic Games oder Steam hast, füge `-NoBattlEye` und `-insecure` zu deinen Startparametern hinzu.

Wenn du möchtest, kannst du diesen Inhalt auch einfach kopieren und mit deinem ersetzen.

`startparameters="${defaultmap}?AltSaveDirectoryName=${altsavedirectoryname} -MultiHome=${ip} -Port=${port} -QueryPort=${queryport} -AutoManagedMods -Crossplay -PublicIPForEpic=${publicip} -NoBattlEye -insecure"`

## 7. Starte deinen Server neu, um die Änderungen zu übernehmen

Klicke einmal auf den Neustart Button.

![Restart Server](/img/ark/restart_server.png)

## 8. Starte deinen Client ohne Anti-Cheat

Steam:

![Steam](/img/ark/start_without_anti_steam.png)

Epic Games:

![Epic Games](/img/ark/start_without_anti_epic.png)

## 9. Weitere Startparameter

Weitere Startparameter findest du in der [LinuxGSM-Dokumentation](https://docs.linuxgsm.com/game-servers/ark-survival-evolved).

---

**Wichtige Informationen:**

- Stelle sicher, dass du deine **Einstellungen korrekt** in die Datei `arkserver.cfg.scroll_template` einfügst.
- **Starte deinen Server neu**, nachdem du Änderungen vorgenommen hast, um die neuen Einstellungen zu übernehmen.
- **Deaktiviere Anti-Cheat-Einstellungen**, wenn du Verbindungsprobleme hast.

Viel Spaß!
