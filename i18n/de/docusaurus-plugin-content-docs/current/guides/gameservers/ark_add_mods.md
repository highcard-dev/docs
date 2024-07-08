---
sidebar_position: 2
---

# Wie du Mods zu deinem ARK-Server hinzufügst

---

## 1. Auto Managed Mods aktivieren
---

Stelle sicher, dass `-automanagedmods` in deinen Startparametern enthalten ist. Dadurch kann dein Server Mods automatisch herunterladen und aktualisieren. Diese Einstellung ist standardmäßig in deinen Startparametern enthalten.

## 2. `GameUserSettings.ini.scroll_template` bearbeiten
---

Öffne die Datei `GameUserSettings.ini.scroll_template`, die du unter folgendem Pfad findest:
```plaintext
\serverfiles\ShooterGame\Saved\Config\LinuxServer\GameUserSettis.ini.scroll_template
``` 

Füge nun deine Mod-IDs unter `[ServerSettings]` hinzu:

```ini
[ServerSettings]
ActiveMods=modID1,modID2
``` 
![GameUserSettings.ini.scroll_template](/img/ark/serversettings.png)

Die Mod-IDs findest du in der Beschreibung der Mods im [Steam Workshop](https://steamcommunity.com/app/346110/workshop/), wie im folgenden Screenshot dargestellt.

![ModId](/img/ark/modid.png)

## 3. `Game.ini` bearbeiten
---
Öffne die Datei `Game.ini` im gleichen Verzeichnis:

```plaintext
\serverfiles\ShooterGame\Saved\Config\LinuxServer\Game.ini
```
Füge deine Mod-IDs unter `[ModInstaller]` hinzu:

```ini
[ModInstaller]
ModIDS=modID1
ModIDS=modID2
```
![Game.ini](/img/ark/gameini.png)

## 4. Server neu starten
---
Starte deinen Server neu, um die Änderungen zu übernehmen und überprüfen, ob die Mods geladen sind.

![alt text](/img/ark/checkmods.png)

---
Für weitere Details schaue bitte in die [offizielle LGSM-Dokumentation](https://docs.linuxgsm.com/game-servers/ark-survival-evolved#adding-mods).

