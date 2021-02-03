# Smart Mirror
Inleiding
Om een project op te starten in Internet of Things ben ik begonnen bij mijzelf te kijken welke problemen ik dagelijks ondervind waar ik doormiddel van technologie dit kan oplossen. Ik begon met het idee om ledlampen in de tuin voor als het s’ avonds donker is zodat je de tuin in het donker kan zien wanneer ik laat thuis kom. Hierin kwam ik erachter dat de huidig ledverlichting een hoge helderheid kon hebben waardoor dit probleem er niet meer is.  Dus moest ik wat anders verzinnen. 

# Het probleem
Ik bedacht me dat ik s’ochtends altijd veel tijd verlies met informatie op te zoeken zoals hoe warm ik mij moet kleden, hoelaat ik precies weg moet, wat ik die dag in de agenda heb staan etc. Hierdoor moet ik vaak haasten om op tijd van huis te vertrekken. 

# De oplossing
Om het probleem op te lossen en zelf s’ochtends tijd kan besparen waardoor minder hoef te haasten om op tijd weg te gaan. ik bedacht de oplossing om een Smart Mirror te bouwen. 
Ik kan hierdoor s’ochtends nadat ik uit bed kom tijdens het aankleden en mijn haren voor de spiegel doe kan zien hoe ik moet reizen.  Hiermee kan ik meteen zien hoelaat ik moet vertrekken en wat voor weer het wordt zodat ik s’ochtends niet te warm/koud kleed voor de dag. 

# Benodigdheden
Ik heb al wat onderzoek gedaan in de benodigdheden dit ik hiervoor nodig ga hebben om dit te realiseren:
* Een frame
*	Een dubbelzijdig spiegel van plexiglas
*	Raspberry Pi
*	Een monitor
*	HDMI Kabel


# Het Frame
Ik heb eerst een meting in mijn kamer gemaakt waar ik de Magic Mirror wil gaan plaatsen om te kijken hoe groot ik hem kan maken. Daarna ben ik naar de bouwmarkt gegaan om verf en hout te halen wat ik kan uitsnijden. Vervolgen heb ik de stukken aan elkaar gemaakt om de voorkant van het frame te maken. Daarna heb ik de achterkant van het frame uitgesneden. Daarna heb ik eerst een grijze grondverf gebruikt zodat het normale verf er beter uitkomt. Het Frame aan de achterkant heeft alleen nog 1 laagje verf nodig.

![alt text](https://github.com/Olivier-Vromans/Data-Science-of-IoT/blob/main/IMG_8131.jpg?raw=true)
![alt text](https://github.com/Olivier-Vromans/Data-Science-of-IoT/blob/main/IMG_8132.jpg?raw=true)


# De Code
Om te beginnen heb ik het micro usb in mijn computer gestopt en de software voor de Raspberry Pi erop gezet. Ik heb er ook een lege ssh bestand zonder extensie in de boot map gezet zodat het mogelijk is om meteen ssh te gebruiken. Vervolgens heb ik de Rasberry aangesloten op het netwerk met een internet kabel. Nadat de Raspberry was aangesloten op het netwerk heb ik doormiddel van de terminal gebruikt gemaakt van ssh pi@raspberrypi.local om een ssh verbinding te maken met de Raspberry. Ik werdt gevraagt om een wachtwoord en gaf het standaard wachtwoord.
<br><br>
De eerste stap die ik heb genomen is de wifi instellingen aan te passen door:
`sudo nano /etc/dhcpcd.conf` uit te voeren. hierin heb ik een static ip-adress gezet en de router opgegeven. Om dit door te voeren moest ik hem restarten met `sudo reboot now`. Nadat die weer was opgestart was het eerst tijd om alles up te date en te upgraden. Dit deed ik door `sudo apt update && apt upgrade` uit te voeren.
<br><br>
Nadat alles up to date was heb ik een virtuele desktop opgezet zodat ik niet al tijd een beeldscherm aan hoef te sluiten om mijn progressie te zien. Dit deed ik via VNC Viewer, dit ging heel makelijk omdat dit vanuit Raspberry Pi aanbevolen wordt. Om het aan te zetten ga je naar de instellingen van de Raspberry met de commando: `sudo raspi-config`. Vervolgens ga je naar **interface opties** en vervolgens naar **VNC** en klik op **Yes**. Dat is alles aan de kant van de Rasberry. Op mijn computer had ik de applicatie geinstallerd en typte ik het ip addres in. hier werd ik gevraagt voor een gebruikers naam en wachtwoord. Nadat ik dat hat ingevult klikte ik op vebinden en ben ik verbonden met de desktop.
<br><br>
Nu alles klaar staat was is het tijd om de Magic Mirror 2 te installeren van de [website](https://magicmirror.builders/). Hier heb ik de stappen van de documentatie gevolgt om alles te installeren:
* Eerste moetst ik de laatse node.js ophalen `curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -`
* Vervolgens installeerde ik het door `sudo apt install -y nodejs` uit te voeren.
* Nadat node.js erop staat kan ik de bestanden van de Magic Mirror copieren door `git clone https://github.com/MichMich/MagicMirror` te typen.
* Nu moeten we in de map zijn door `cd MagicMirror/` te typen
* het installeren van de applicatie deed ik door `npm install`
* het laatste voordat we het konden starten was om de config file te kopieren door deze commando `cp config/config.js.sample config/config.js`
* Omdat ik het via de VNC deed kan ik `npm run start` doen om de Magic Mirror te starten.

# De modules
Om de Magic Mirror te personaliseren kan je verschillende modules toevoegen via de [website](https://magicmirror.builders/) van Magic Mirror of via andere websites. 
<br><br>
Ik heb gebruikt gemaakt van de Spotify module van [skuethe](https://github.com/skuethe/MMM-Spotify), de metro tijden doormiddel van de module van [73cirdan](https://github.com/73cirdan/MMM-bustimes), en de standaard weervoorspelling, nieuwsfeed en de kalender van de Magic Mirror zelf. De kalendar heb ik aangesloten aan mijn kalendar van Google. Tenslotte heb ik een sensor gemaakt van een ESP8266 board met een DHT22 sensor erop. Deze sensor met de temperatuur en de luchtvochtigheid in een kamer. Ik heb ervoor gekozen om er 2 te maken waarvan één in mijn slaapkamer staat en één in de woonkamer. Bijde sensoren sturen hun data naar mijn channel op [Thingspeak](https://thingspeak.com/channels/1277680). De laatste metingen worden vervolgens met de rest module van [Tuxdiver](https://github.com/Tuxdiver/MMM-Rest) opgehaald zodat ze op de spiegel afgelezen kunnen worden.
