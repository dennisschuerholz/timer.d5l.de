# timer.d5l.de

Dies ist das Repository des D5L Timers ([timer.d5l.de](https://timer.d5l.de)).

Dieser Countdown ist als ablenkungsfreie Alternative zu vielen verfügbaren Angeboten für den Unterricht konzipiert.
Ziel ist die Entwicklung eines einfachen, konfigurierbaren Timers zum Einsatz im Unterricht, auf Lehrgängen oder zu beliebigen anderen Gelegenheiten.

Da dieser Timer rein im Browser ausgeführt wird und keinerlei Infrastruktur benötigt kann er auch als [Archiv heruntergeladen](https://github.com/dennisschuerholz/timer.d5l.de/archive/refs/heads/main.zip) und die `index.html`-Datei lokal im Browser geöffnet werden.

## Funktionen

* Countdown in MM:SS Schreibweise
  * optional: HH:MM:SS für Timer von mehr als einer Stunde
* Vollständige Steuerung über konfigurierbare Tastaturkürzel
  * **T** Neuer Timer
  * **Leertaste** Start/Pause
  * **Rücktaste** Zurücksetzen
  * **+/Pfeiltaste nach oben/rechts** Zeit erhöhen
  * **-/Pfeiltaste nach unten/links** Zeit verringern
  * **F** Vollbild
  * **Q** Einstellungen
* Konfigurierbare Schrittweite für die **+/-** Funktion
* 9 Konfigurierbare Voreinstellungen
  * Aktivierung/Abrufen via Tasten **1** - **9**
* Alle Eingabefelder (im Einstellungsdialog und bei *Neuer Timer*) verstehen verschiedene Zahlenformate
  * *5.5h* entspricht 5 Stunden, 30 Minuten und 0 Sekunden
  * *7.5* oder *7.5m* entspricht 7 Minuten und 30 Sekunden
  * *42s* entspricht 42 Sekunden
  * *13:37* entspricht 13 Minuten und 37 Sekunden
  * *1:23:45* entspricht 1 Stunde, 23 Minuten und 45 Sekunden
  * Alle Dezimalzahlen sind auch mit Komma **,** statt Punkt **.** schreibbar.
* Die Einstellungen sind über Neustarts hinweg persistent, da sie im LocalStorage des Browsers abgelegt werden.
* Der aktuelle Status ist persistent:
  * Zustand (gestartet, angehalten)
  * Restzeit
  * D.h. man kann einen Timer über bspw. 24h starten, den Browser zwischendurch schließen und der Countdown läuft anschließend normal weiter.

## Planung

- [ ] Konfigurierbares Basisdesign (über verschiedene Farbschemata)
- [ ] Bedienelemente zur Steuerung per Maus
- [ ] Optionale Töne während bzw. beim Ablauf des Timers
- [ ] Unterschiedliche Timerdesigns (ggf. mit/ohne digitale Zeitangabe)
  - Kreisausschnitt (vgl. TimeTimer)
  - Ringausschnitt
  - horizontale/vertikale Balken
  - Sanduhr
  - ...
- [ ] Konfiguration via URL-Parameter (Links auf spezifische Timer)
- [ ] Möglichkeit zum Einstellen der Zielzeit statt Dauer

## Unterstützung

Da das Hosting durch GitHub Pages realisiert wird fallen hierfür keine Kosten an und die Homepage kommt ohne Werbung aus.
Falls du dennoch die Entwicklung unterstützen möchtest gibt es vielseitige Möglichkeiten:
* Eröffne ein [Issue](https://github.com/dennisschuerholz/timer.d5l.de/issues) bei Fehlern/Problemen oder wenn du eine Funktion vermisst
* Arbeite aktiv mit und stelle einen [Pull request](https://github.com/dennisschuerholz/timer.d5l.de/pulls)
* Zahle mir die nächste Mate (ich trinke keinen Kaffee): https://paypal.me/schuerholz
* Teile den Timer mit Kolleg:innen und der Welt

## Autor

Dennis Schürholz, https://dennisschuerholz.de
