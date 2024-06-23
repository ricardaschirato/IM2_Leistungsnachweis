# IM2_Leistungsnachweis

Projektdokumentation Interaktive Medien 2

Corina Engel corina.engel@stud.fhgr.ch
Ricarda Schirato ricarda.schirato@stud.fhgr.ch
Tanja Julmy tanja.julmy@stud.fhgr.ch

# Kurzbeschreibung des Projekts 

Auf unserer Webseite können die Nutzer ihr geografisches Wissen in Form eines Spiels testen. Ziel des Spiels ist es, die Fahrzeit zwischen zwei gegebenen Destinationen richtig zu erraten. Liegt die Antwort im Bereich von plus/minus zehn Prozent, erhält der Spieler einen Punkt. Erreicht der Spieler so fünf Punkte, erhält er zur Belohnung einen digitalen Konfettiregen und das Spiel beginnt von vorne. Zudem kann man sich die Verbindung auch auf einer Karte anzeigen lassen. Die Verbindungen, die im Spiel überprüft werden, ergründen sich auf die API der SBB. 

# Learnings

Nicht parallel codieren auf Github 

Obwohl uns bereits im Voraus bewusst war, dass paralleles Codieren auf Github nicht funktioniert und ein Arbeitsstand überschritten werden kann, ist uns dieses Malheur trotzdem noch passiert. Zum Glück war es kein grosser Projektfortschritt, der uns auf diese Weise abhandengekommen ist. 

Bodenstriche im Dateinamen schaden nicht

Visual Code erstellte bei einigen Teammitgliedern automatisch identische Ordner. Einzig durch einen vorhergehenden Unterstrich konnten diese unterschieden werden. Da diese nur bei einem Teil zu sehen war, waren wir dementsprechend irritiert. Zudem wollten wir nicht irrelevante Dokumente auf Github pushen, um zu verhindern, dass in einem der getürkten Dokumente gearbeitet wird. Nach langem hin und her haben wir herausgefunden, weshalb die Ordner überhaupt erstellt werden. Der Grund dafür war das Speichern auf einer externen Speicherkarte. Dies wahrscheinlich, weil diese anders Formatiert ist. Daraus mussten wir lernen, dass diese Unterstriche nicht weiter schlimm sind, aber auch nicht durch vorheriges Löschen eliminiert werden können. Als Folge daraus mussten wir darauf achten, in den richtigen Dokumenten zu codieren.     

# Schwierigkeiten

Nur grössere Städte der Schweiz wurden abgefragt

Nach nur kurzer Zeit wiederholten sich im Spiel die vorgegebenen Standorte relativ schnell. Dies führte zu weniger Spielspass und Voraussehbarkeit im Spiel. Dieses Problem haben wir so gelöst, indem wir eine Variable mit den 50 grössten Bahnhöfen der Schweiz gespeichert haben, um eine höhere Varianz zu erlangen. In einer früheren Version konnten sogar die grössten 200 Bahnhöfe bespielt werden. Da das Spiel jedoch auch für Geografie-Laien spielbar sein sollte und nach einem Testdurchlauf mit einem Probanden, haben wir uns dann doch “nur” für die grössten 50 Bahnhöfe entschieden. Dies erschien uns als ein zumutbarer Schwierigkeitsgrad für die breite Masse..

Nicht immer die schnellste Verbindung wurde gewählt 

Aus der API wurde jeweils nur die nächste Verbindung herausgelesen. Aus diesem Grund  ergaben sich unterschiedliche richtige Möglichkeiten für dieselbe Verbindung, da auch unterschiedliche Verbindungen unterschiedlich lange benötigen.
Dieses Problem haben wir gelöst, indem wir die 10 nächsten Verbindungen aus der API herausgelesen haben, diese nach Schnelligkeit sortiert. So erhielten wir stets die schnellste Verbindung und nicht einfach die nächste im Fahrplan. 

Destination - wie sie mir gefällt

Bei der ersten Version unseres Spiels war es möglich, über einen Button “neue Verbindung", das sich neben dem Button “überprüfen” befand, neue Destinationen zu erhalten. So war es aber für den Spieler auch möglich, endlos neue Bahnhöfe generieren zu lassen und durch bekannte Verbindungen Punkte zu sammeln. Dies war natürlich nicht der Sinn und Zweck dieses Buttons, sondern, dass nach der Auswertung eines Resultats eben eine “neue Verbindung” generiert werden konnte. Dies konnten wir beheben, indem wir nur noch einen Button einsetzten. Der wechselt je nach Spielsituation seine Funktion von "Überprüfen" zu "neue Verbindung”. 

Konfettiregen ohne Konfetti und Regen

Um den Spieler für seine grandiosen Leistungen zu belohnen, wollten wir einen Konfettiregen einbauen. Dies stellte sich in der Theorie jedoch einfacher dar, als in der Praxis angenommen. Wir versuchten durch diverse Optionen den Regen einzubauen. Als erstes haben wir probiert, eine Open Source zu nutzen, welche den Konfettiregen direkt in HTML und JS generiert. Dies hat jedoch nicht wirklich funktioniert. Wir dachten, dass es eventuell am kopierten Code liegen könnte. dass wir ihn beispielsweise nicht richtig eingefügt haben. Daher haben wir unsere Dateien durch Chat GPT überprüfen lassen. Doch auch diese Methode führte nicht zum erhofften Erfolg. Um als nächsten Schritt zu überprüfen, ob unsere Funktion grundlegend nicht funktioniert oder der eingefügte Konfetticode, haben wir  diesen zuerst durch ein GIF ersetzt. Aber auch hier das nüchterne Ergebnis - der Code hat wieder nicht funktioniert. Mit der Unterstützung eines Informatikers gelang es uns schlussendlich doch noch, den bereits bestehenden Konfetti-Code von der zu Beginn gewählten Open-Source in unser Javascript einzubinden. Das war eigentlich gar nicht einmal so eine grossse Sache, wenn man denn weiss wie… 

Auch ChatGpt hat seine Grenzen


# Benutzte Ressourcen

ChatGpt - Freund und Helfer

Zu unserer Unterstützung haben wir uns die Eigenschaften von Chatgpt zu Nutze gemacht. Es diente uns als Inspirationsquelle und Informationsgrundlage für unseren Code. Die Schwierigkeit bestand darin, die Prompts verständlich zu formulieren. Ein weiterer Nachteil war, dass Chatgpt teilweise relevante Teile des Codes wegliess, sobald man den bereits bestehenden Code ergänzen wollte. Dies führte dazu, dass wir mittels Chat GPT teilweise zwar einen Schritt vorwärts gemacht haben, gleichzeitig aber auch zwei Schritte zurück. 

Unterlagen aus dem Unterricht

Die Unterlagen aus dem Unterricht waren sehr nützlich. Bei Unsicherheiten konnten wir diese noch einmal konsultieren und unsere verstaubten Hirnzellen auffrischen.

Kontakte spielen lassen

Da wir zu Beginn mehrere verschiedene Spielideen hatten, holten wir uns die Zweitmeinung eines Profis ein, um uns nicht etwas Unmögliches aufzubürden. Der Arbeitskollege von Corina ist Informatiker und hat unsere Ideen miteinander verglichen. Vor dem Hintergrund von Aufwand und Ertrag hat er uns schliesslich zur Umsetzung des Spieles geraten. Mit ihm konnte Corina gerade auch eine Skizze des logischen Aufbaus fertigen, wie wir dies Analog im Unterricht für die Cocktail Website getan haben. So konnten wir in unser Codier-Abenteuer starten. 
Da uns der Konfetticode so viel Mühe bereitete und wir auch nach mehreren erfolglosen und frustrierenden Stunden immer noch nicht das gewünschte Resultat erhielten, holten wir uns nochmals Hilfe von einem Informatiker unseres Vertrauens. Er unterstützte uns bei der Einbindung des Konfetticodes in unserem Javascript.



