1. Welche KI-Tools hast du verwendet und für welche Aufgaben?
   Copilot - Kommentare, Autocompletion und Commits
   Claude CLI - Design und Accessibility

Prompt
Bearbeite das Projekt im Brutalism-Stil.
Stelle sicher, dass alles accessible bleibt. Benutze Tailwind 4.1

2. Wo musste KI-generierter Code korrigiert oder angepasst werden?

   - Unvollständige Accessibility: aria-labels waren teilweise generisch oder fehlten
     komplett (z.B. bei Category-Select-Elementen innerhalb von Tasks)
   - Focus-Styles: Mussten verstärkt werden - ursprüngliche Implementierung war nicht
     deutlich genug sichtbar für Accessibility-Anforderungen

3. Was hast du über effektives Prompting oder KI-Limitierungen gelernt?

   - Spezifität ist entscheidend: "Brutalism-Stil" allein reicht nicht - "mit Tailwind
     4.1" machte den Unterschied zwischen Custom CSS und Tailwind-Klassen
   - Iterativer Prozess: Die KI brauchte mehrere Anläufe und musste explizit auf
     "fehlende Stylings" hingewiesen werden, um alles zu erfassen
   - Review ist wichtig: Auch wenn Code generiert wird, muss man ihn durchgehen - die
     KI übersieht manchmal Details
   - Konkrete Anforderungen: "Accessibility" ist zu vague - "stark sichtbare Focus-
     Styles" führte zu besseren Ergebnissen

4. Welche Teile des Codes kannst du am besten/am wenigsten gut erklären?
   Am besten:

   - Die Brutalism-Design-Patterns (dicke Borders, Hover-Effekte mit Transform,
     Schwarz-Weiß-Kontraste)
   - Tailwind 4.1 @theme Direktive und Custom Properties
   - React State-Management für Tasks, Editing, Categories

   Am wenigsten gut:

   - Accessibility-Features (ARIA-Labels, Focus-Management, Screen Reader Support)
