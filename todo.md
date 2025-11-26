## Teil 1: Kern-Funktionalität der To-Do-Liste

### Datenmodell

~~A. Eine Aufgabe hat eine **Beschreibung** (string), ein **Erstellungsdatum** (Date) und einen **Status** („offen" oder „erledigt")~~

~~B. Aufgaben, die länger als 1 Minute offen sind, sollen **automatisch** als **dringend** markiert werden (d.h. die UI aktualisiert sich von selbst, ohne dass der Nutzer etwas tun muss)~~

### Benutzeroberfläche

~~C. Nutzer können klar zwischen offenen und erledigten Aufgaben unterscheiden~~

~~D. Jede Aufgabe zeigt ihr Erstellungsdatum und -uhrzeit an~~

~~E. Dringende Aufgaben werden visuell hervorgehoben~~

~~F. Eine Zusammenfassung zeigt die Anzahl der offenen und erledigten Aufgaben~~

~~G. Alles soll accessible sein - also u.a. mit Tastatur bedienbar, mit Screenreader nutzbar und gut lesbar~~

### Aktionen

~~H. **Erstellen:** Nutzer können eine neue Aufgabe nur mit einer Beschreibung hinzufügen (startet als „offen")~~

~~I. **Erledigen:** Offene Aufgaben können als erledigt markiert werden~~

~~J. **Wiedereröffnen:** Erledigte Aufgaben können wieder als offen markiert werden~~

~~K. **Bearbeiten:** Nur offene Aufgaben können bearbeitet werden~~

~~L. **Löschen:** Sowohl offene als auch erledigte Aufgaben können gelöscht werden~~

---

## Teil 2: Kategorien (Stretch Goal)

Aufgaben können jetzt Kategorien zugeordnet werden (z.B. „Arbeit", „Privat", „Einkaufen"). Erweitere deine Anwendung:

A. Nutzer können beim Erstellen einer Aufgabe eine Kategorie auswählen

B. Nutzer können eine Aufgabe in eine andere Kategorie verschieben

C. Aufgaben werden in der Benutzeroberfläche nach Kategorien gruppiert, wobei jede Kategorie ihre eigene Aufgabenliste anzeigt
