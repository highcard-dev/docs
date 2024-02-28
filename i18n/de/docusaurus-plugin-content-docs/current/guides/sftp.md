---
sidebar_position: 1
---

# Zugriff auf deine Serverdateien

---

Druid bietet mehrere Möglichkeiten, um alle Dateien deines Servers hochzuladen und zu bearbeiten. Du kannst das sehr bekannte **FTP** oder das modernere HTTP-basierte **WebDAV**-Protokoll verwenden.

## SFTP verwenden

---

FTP ist wahrscheinlich die bekannteste Methode, um mit entfernten Dateien zu interagieren. Wir verwenden die sichere FTP- oder SFTP-Variante, die SSH nutzt, um Dateien verschlüsselt zwischen Server und Client zu übertragen. Sie wird von allen wichtigen FTP-Clients unterstützt.

Du findest deine SFTP IP-Adresse und Portnummer im Druid Deployment Dashboard:

![SFTP-IP im Druid Dashboard](/img/sftp-ip.png)

**Wichtig:** Stelle sicher, dass du das **SFTP-Protokoll** in deinem FTP-Client auswählst. (Vergleiche das [Filezilla-Beispiel unten](#filezilla-beispiel))

### Kontozugangsdaten

Der Benutzername und das Passwort für FTP sind die gleichen wie in der Druid-App. 

**Das heißt, der Benutzername ist deine E-Mail und das Passwort ist dein normales Passwort**

### Discord Registrierung
Solltest du Discord für die Registrierung verwendet haben, so muss du bevor du dich per SFTP verbinden kannst ein Passwort setzen.

#### 1. Drücke auf dein Benutzericon unten links auf der Webseite 

![Benutzericon drücken](/img/filezilla/reg_discord.png)

#### 2. Setze dein Passwort

![Benutzericon drücken](/img/filezilla/set_password.png)


### Filezilla Beispiel

Schauen wir uns kurz ein praktisches Beispiel an, wie man sich mit dem Filezilla FTP-Client verbindet.

#### 1. Öffne den Site Manager

![Site Manager auswählen](/img/filezilla/1-site-manager.png)

#### 2. Konfiguriere die Verbindung

![Site Manager auswählen](/img/filezilla/2-site-manager-config.png)

Hier ist es wichtig, die folgenden Felder zu setzen:

- **Protokoll:** SFTP - SSH File Transfer Protocol
- **Host:** _Host Ip vom Druid Dashboard_
- **Port:** _Host Port vom Druid Dashboard_
- **Anmeldetyp:** Wähle **Normal**, um auch das Passwort auf deinem Rechner zu speichern.
- **Benutzer:** Die E-Mail-Adresse, mit der du dich bei Druid angemeldet hast.
- **Passwort:** Das Passwort, das du auch für die Anmeldung in der Druid App verwendest.

#### 3. Verbinden!

Wenn du eine Meldung über die unbekannte Server-Identität erhältst, kannst du einfach **Ok** drücken.

![Site Manager auswählen](/img/filezilla/4-cert.png)

Danach solltest du verbunden sein. Wenn nicht, wird in der Filezilla-Konsole ein Fehler angezeigt.
Normalerweise solltest du alle deine Dateien im **deployment**-Ordner finden.

![Select Site Manager](/img/filezilla/5-connected.png)

### Unterstützte FTP-Clients für jedes OS

- [Filezilla](https://filezilla-project.org/download.php?type=client) - Sehr bekannter FTP-Client

  - OS: Windows, Linux, MacOS

- [WinSCP](https://winscp.net/eng/downloads.php) - Ebenfalls weit verbreitet, aber nur für Windows

  - OS: Windows

- [Cyberduck](https://cyberduck.io/download/)

  - OS: Windows, MacOS

Du kannst auch eine [sehr umfassende Liste auf Wikipedia](https://en.wikipedia.org/wiki/Comparison_of_FTP_client_software#Operating_system_support) finden

## WebDAV verwenden

---

Die Verwendung von WebDAV ist ähnlich wie die Verwendung von FTP, die Authentifizierung mit Benutzername und Passwort ist die gleiche.

Wenn du WebDAV in Erwägung ziehst, bist du wahrscheinlich schon erfahrener und hast einen besonderen Bedarf für die Nutzung von WebDAV.

Im Allgemeinen kannst du dem FTP-Leitfaden folgen, du musst nur sicherstellen, dass du einen Client verwendest, der das WebDAV-Protokoll unterstützt.
