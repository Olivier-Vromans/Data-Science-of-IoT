// toevoegen van  de libaries
#include <DHT.h>
#include <ESP8266WiFi.h>
 
#define DHTPIN 5          //DHT22 is aangesloten op GPIO Pin 2

String apiKey = "xxxxxxxxxxxxxxxx";     // De Write API key van ThingSpeak
const char* ssid =  "xxxx";     // De WiFi Netwerk's SSID
const char* pass =  "xxxx"; // De WiFi Netwerk's Password
const char* server = "api.thingspeak.com"; // verbinden met de ThingSpeak API server
 

float humi; // Vochtigheid bepalen
float temp; // Tempratuur bepalen
 
DHT dht(DHTPIN, DHT22);
WiFiClient client;

// Verbinden met het Wifi Netwerk
void setup() 
{
       Serial.begin(115200);
       delay(10);
       dht.begin();
 
       Serial.println("Connecting to ");
       Serial.println(ssid);
 
 
       WiFi.begin(ssid, pass);
 
      while (WiFi.status() != WL_CONNECTED) 
     {
            delay(100);
            Serial.print("*");
     }
      Serial.println("");
      Serial.println("***WiFi connected***");
 
}

// Gegevens bepalen van de DHT22 en versturen naar Thingspeak
void loop() 
{
      humi = dht.readHumidity();
      temp = dht.readTemperature();
 
      if (client.connect(server,80))   //   "184.106.153.149" or api.thingspeak.com
      {  
       String sendData = apiKey+"&field1="+String(temp)+"&field2="+String(humi)+"\r\n\r\n"; 

       client.print("POST /update HTTP/1.1\n");
       client.print("Host: api.thingspeak.com\n");
       client.print("Connection: close\n");
       client.print("X-THINGSPEAKAPIKEY: "+apiKey+"\n");
       client.print("Content-Type: application/x-www-form-urlencoded\n");
       client.print("Content-Length: ");
       client.print(sendData.length());
       client.print("\n\n");
       client.print(sendData);

       Serial.print("Temperature: ");
       Serial.print(temp);
       Serial.print("deg C. Humidity: ");
       Serial.print(humi);
       Serial.println("%. Connecting to Thingspeak.");
       }
      
      client.stop();

      Serial.println("Sending....");
  
 delay(10000);
}
