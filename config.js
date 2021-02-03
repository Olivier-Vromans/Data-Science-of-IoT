/* Magic Mirror Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
	address: "localhost", 	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/", 	// The URL path where MagicMirror is hosted. If you are using a Reverse proxy
					// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], 	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"],
	timeFormat: 24,
	units: "metric",
	// serverOnly:  true/false/"local" ,
	// local for armv6l processors, default
	//   starts serveronly and then starts chrome browser
	// false, default for all NON-armv6l devices
	// true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left"
		},
		// {
		// 	module: "compliments",
		// 	position: "lower_third"
		// },
		{
			module: "calendar",
			position: "top_left",	// This can be any of the regions. Best results in left or right regions.
			config: {
				calendars:[
					{
					symbol: "calendar",
					url: "https://calendar.google.com/calendar/ical/olivier.appel%40gmail.com/private-ce136a2a0c2921ae8704b5e2e16ba336/basic.ics"
					}
				]
				// The config property is optional.
				// If no config is set, an example calendar is shown.
				// See 'Configuration options' for more information.
			}
		},
		{
			module: "currentweather",
			position: "top_right",
			config: {
				location: "Pijnacker, The Netherlands",
				locationID: "2748591", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				appid: "1a6b00b2fdc263653773dfc8debdeab1"
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				location: "Pijancker, The Netherlands",
				locationID: "2748591", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				appid: "1a6b00b2fdc263653773dfc8debdeab1"
			}
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "NU.nl",
						url: "https://www.nu.nl/rss/"
					},
					{
						title: "Telegraaf",
						url: "https://www.telegraaf.nl/rss/"
					}
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true
			},
		},
		{
        		module: "bustimes",
        		position: "bottom_right",
        		header: "Metro Times",
        		config: {
            			timingPointCode: "31008715,31008716",
            			displaymode: "large",
				showTransportTypeIcon: "true",
				showLiveIcon: "true",
            			showTownName: true,
				showDelay: true,
            			departs: 3
        		}
    		},
		{
  			module: "MMM-Spotify",
  			position: "bottom_left",
  			config: {
    				debug: false, // debug mode
				style: "default", // "default" or "mini" available (inactive for miniBar)
				moduleWidth: 240, // width of the module in px
    				control: "default", // "default" or "hidden"
    				showAccountButton: false, // if you want to show the "switch account" control button
    				showDeviceButton: false, // if you want to show the "switch device" control button
    				useExternalModal: false, // if you want to use MMM-Modal for account and device popup selection instead of the build-in one (which is restricted to the album image size)
    				updateInterval: 50, // update interval when playing
    				idleInterval: 3000, // update interval on idle
  				miniBarConfig: {
      					album: true, // display Album name in miniBar style
      					scroll: true, // scroll title / artist / album in miniBar style
      					logo: true, // display Spotify logo in miniBar style
    				}
			}
		},
		{
			module: 'MMM-Rest',
			position: 'top_right',
        		config: {
				updateInterval: 36000, 
                		debug: false,
                		mappings: {
                    		on_off: {
                        		true: 'on',
                        		false: 'off',
                    		},
                    		temperature: {
                        		1: 'cold',
                        		2: 'warm',
                        		3: 'HOT',
                    		},
                		},
                		sections: [
                		{
                    			format: '%.1f<span class="wi wi-celsius"></span>',
                    			url: 'https://thingspeak.com/channels/1277680/fields/1/last.txt',
                		},
                		{
                    			format: '%d<span class="wi wi-humidity"></span>',
                    			url: 'https://thingspeak.com/channels/1277680/fields/2/last.txt',
                		},
                		{
                    			format: '%.1f<span class="wi wi-celsius"></span>',
                    			url: 'https://thingspeak.com/channels/1277680/fields/3/last.txt',
                		},
                		{
                    			format: '%d<span class="wi wi-humidity"></span>',
                    			url: 'https://thingspeak.com/channels/1277680/fields/4/last.txt',
                		},

            			],
            			output: [
                			['Livingroom','@1','@2'],
                			['Bedroom','@3','@4'],
            			],
	    		},
		}
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
