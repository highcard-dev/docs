---
sidebar_position: 2
---

# Zur Dokumentation beitragen.

Wenn du zur Dokumentation beitragen möchtest, musst du mit [unserem Git-Repository](https://github.com/highcard-dev/docs) interagieren.
Du musst nicht mit Git vertraut sein, um dies zu tun, obwohl es empfohlen wird.
Wenn du dich bereits mit Git auskennst, ist die folgende Anleitung wahrscheinlich zu detailliert.

Sieh dir auch [Hilfreiche Links zum Bearbeiten der Dokumentation](#helpful-links-to-edit-the-documentation) an, um mehr über die Werkzeuge zu erfahren, die wir zum Erstellen dieser Dokumentation verwenden. Es ist auch sehr hilfreich, wenn du deine technischen Kenntnisse verbessern möchtest, da Tools wie Git, Github, Markdown usw. häufig verwendet werden.

## Eine bestehende Seite bearbeiten

### 1. Gehe zu der Seite, die du bearbeiten möchtest.

Gehe zu der Seite, die du bearbeiten möchtest, und klicke auf den Link zum Bearbeiten unten auf der Seite.

![drücke Bearbeiten](img/1-start.png)

### 2. Melde dich bei Github an oder logge dich ein.

Nun musst du dich in dein Github-Konto einloggen.

Wenn du bereits eingeloggt bist, kannst du diesen Schritt überspringen.

Wenn du noch kein Konto hast, kannst du dich [hier auf github.com](https://github.com/signup) registrieren.

![Bei Github anmelden](img/2-login.png)

### 3. Ein Repository forken

Nun musst du einen Fork des druid docs Repositories in deinem Github Account erstellen.

![press edit](img/3-fork.png)

### 4. Bearbeiten

Nun kannst du die Seite bearbeiten. Jede Seite wird in Markdown geschrieben.
Markdown ist eine einfache Methode, um ein Dokument zu formatieren und Bilder, Text, Links usw. einzufügen.
Hier kannst du mehr über Markdown lesen: [Markdown Leitfaden](https://www.markdownguide.org/)
Wenn du es kurz magst, findest du hier ein Cheatsheet: [Markdown Cheatsheet](https://www.markdownguide.org/cheat-sheet/)

![press edit](img/4-edit.png)

### 5. Änderungen eintragen

Nun müssen die Änderungen ins Repository übertragen werden.

![press edit](img/5-commit.png)
![press edit](img/6-commit-preview.png)

### 6. Pull-Request erstellen

Nun erstellen wir einen Pull-Request. Ein Pull-Request ist ein Vorschlag, deine Änderungen zu den Druid-Dokumenten hinzuzufügen.
Er bleibt offen, bis wir deine Änderungen geprüft haben und sie entweder zusammenführen oder Änderungen anfordern.

![press edit](img/7-pr-create.png)
![press bearbeiten](img/8-pr-preview.png)

## Eine Dokumentseite erstellen

Es gibt verschiedene Möglichkeiten, eine neue Datei hinzuzufügen. Wenn du mit Git vertraut bist, kannst du das Repository klonen und die Änderungen lokal vornehmen.
Wenn du Anfänger bist, folge einfach dieser Anleitung. Wenn du mehr wissen möchtest, findest du unten weitere Links, die dir helfen, mehr über die Werkzeuge zu erfahren, die wir in dieser Dokumentation verwenden.

### 1. docs-Repository forken

![fork](img/add/1-fork.png)
![fork submit](img/add/2-fork-submit.png)

### 2. Datei hinzufügen

Jetzt kannst du das gesamte Repository sehen und in der Ordnerstruktur navigieren.
Navigiere einfach zum Ordner `/docs/` und du solltest einige `md` Dateien und andere Ordner sehen. Diese sind repräsentativ für die Struktur, die du in den Docs sehen kannst.
Gehe einfach zum richtigen Ordner und wähle `Add file`.

![Datei hinzufügen](img/add/3-add-file.png)

Nun kannst du die Änderungen vornehmen. Weitere Details findest du in [Schritt 5 der vorherigen Anleitung](#4-edit).

Alternativ kannst du auch eine Markdown-Datei hochladen, achte aber darauf, dass sie mit `.md` endet.

![Beitrag einreichen](img/add/4-submit-file.png)

### 3. Übertrage die Änderungen für die Pull-Anfrage.

Wenn du fertig bist, klicke auf Commit.

**Wichtig** Bitte aktiviere die Checkbox unten, die besagt: `Erstelle einen neuen Zweig für diesen Commit und starte einen Pull Request`.

![Änderungen übertragen](img/add/5-commit-pr.png)

### 4. Pull Request erstellen

Folge ab hier einfach [Schritt 6 der Anleitung zum Bearbeiten einer Seite](#6-create-pull-request).

## Hilfreiche Links zum Bearbeiten der Dokumentation

### Github & Git

Um an der Druid-Dokumentation mitarbeiten zu können, muss man sich einloggen.

[Git Dokumentation & Videos](https://git-scm.com/doc)

[Anmeldung für Github](https://github.com/signup)

Wenn du einen tieferen Einblick in diese Werkzeuge bekommen möchtest, ist das auch sehr hilfreich.
Wenn du dich für Softwareentwicklung oder andere softwarebezogene Bereiche interessierst, sind diese Tools definitiv wichtig.
[Wie man zu einem Open-Source-Projekt auf GitHub beiträgt](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

### Docusaurus

Docusaurus ist ein einfach zu bedienendes Werkzeug zur Erstellung und Pflege von Dokumentation.
Es richtet sich an Entwickler, macht es aber auch Anfängern leicht, zu offenen Dokumentationen beizutragen.

Docusaurus selbst hat auch sehr gute Dokumentationen: [Docusaurus Dokumentation](https://docusaurus.io/)