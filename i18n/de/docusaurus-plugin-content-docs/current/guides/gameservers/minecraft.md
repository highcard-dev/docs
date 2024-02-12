---
sidebar_position: 6
---

# Minecraft Forge Server Mods hinzufügen
---

Für das Hinzufügen von Mods zu einem Minecraft Forge Server, beziehe dich auf die folgenden Schritte zum Herunterladen und Konfigurieren von Mods.  

Nutze für SFTP-Verbindung und Dateiübertragung unsere separate [SFTP-Anleitung](/guides/sftp#sftp-verwenden).

Danach musst du folgende Ansicht haben:
![deploy Folder](/img/minecraft/deployfolder.png)

## Mods herunterladen
---

**Mod-Quellen:**  
Für Minecraft Forge geeignete Mods findest du auf Websites wie:
- [CurseForge](https://www.curseforge.com/minecraft)
- [9Minecraft](https://www.9minecraft.net/)
- [TLMODS](https://tlmods.org/en/)

Bsp.
![Curseforge](/img/minecraft/curseforge.png)
 
- **Kompatibilität:** Vergewissere dich, dass die Mods mit der von dir verwendeten Version von Minecraft Forge und dem Spiel selbst kompatibel sind.


Wähle nur Mods von vertrauenswürdigen Seiten, um die Sicherheit deines Servers zu gewährleisten!

## Mods auf den Server hochladen
---

Nachdem du die benötigten Mods heruntergeladen hast, verwende die in der SFTP-Anleitung beschriebenen Schritte, um diese Dateien in den `mods`-Ordner deines Minecraft Forge Servers hochzuladen.

![Mod Hochladen](/img/minecraft/uploadmod.png)

## Server neustarten und Mods überprüfen
---

- **Server neustarten:** Um die hinzugefügten Mods zu aktivieren, ist ein Neustart deines Servers erforderlich. 

- **Überprüfung:** Nach dem Neustart kannst du überprüfen, ob die Mods korrekt geladen wurden, indem du entweder das Server-Log kontrollierst oder direkt im Spiel auf die Mod-Liste zugreifst.

## Mods konfigurieren (optional)
---

Einige Mods bieten die Möglichkeit, Einstellungen über Konfigurationsdateien anzupassen. Diese befinden sich normalerweise im `config`-Ordner deines Servers. Du kannst diese Dateien ähnlich wie die Mod-Dateien selbst über SFTP bearbeiten und anpassen.

Vergiss nicht, vor Beginn der Mod-Installation ein Backup deines Servers zu erstellen, um möglichen Datenverlust zu vermeiden.
