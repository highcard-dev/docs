---
sidebar_position: 6
---

# Rust Oxide Mod Server Mods hinzufügen
---

Für das Hinzufügen von Mods zu einem Rust Oxide Mod Server, beziehe dich auf die folgenden Schritte zum Herunterladen und Konfigurieren von Mods.  

Nutze für SFTP-Verbindung und Dateiübertragung unsere separate [SFTP-Anleitung](/guides/sftp#sftp-verwenden).

Danach musst du folgende Ansicht haben:
![deploy Folder](/img/minecraft/deployfolder.png)

## Mods herunterladen
---

**Mod-Quellen:**  
Für Rust Oxide Mod geeignete Mods findest du auf Websites wie:
- [uMod](https://umod.org/plugins?page=1&sort=title&sortdir=asc&categories=rust)
- [Codefling](https://codefling.com/mods)

Bsp.
![uMod](/img/rust/umod.png)
 
- **Kompatibilität:** Vergewissere dich, dass die Mods mit der von dir verwendeten Version von Rust Oxide Mods und dem Spiel selbst kompatibel sind.


Wähle nur Mods von vertrauenswürdigen Seiten, um die Sicherheit deines Servers zu gewährleisten!

## Mods auf den Server hochladen
---

Nachdem du die benötigten Mods heruntergeladen hast, verwende die in der SFTP-Anleitung beschriebenen Schritte, um diese Dateien in den `/oxide/plugins/`-Ordner deines Rust Servers hochzuladen.

![Mod Hochladen](/img/rust/mod_folder.png)

## Server Ressourcen neu laden
---

- **Server Ressourcen neu laden:** Um die hinzugefügten Mods zu aktivieren, kannst du in der Konsole  
`oxide.reload *` eingeben.

- **Überprüfung:** Nach dem Neuladen kannst du überprüfen, ob die Mods korrekt geladen wurden, indem du entweder das Server-Log kontrollierst oder direkt im Spiel auf die Mod-Liste zugreifst.

## Mods konfigurieren (optional)
---

Einige Mods bieten die Möglichkeit, Einstellungen über Konfigurationsdateien anzupassen. Diese befinden sich normalerweise im `/oxide/config/` Ordner deines Servers. Du kannst diese Dateien ähnlich wie die Mod-Dateien selbst über SFTP bearbeiten und anpassen.

Vergiss nicht, vor Beginn der Mod-Installation ein Backup deines Servers zu erstellen, um möglichen Datenverlust zu vermeiden.
