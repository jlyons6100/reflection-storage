# Benchmarking

**Goal**: Look at how other people have built these kinds of architectures.

| Name | Link | Arch Details | Implication|
| --- | --- | --- | --- | 
| MagicMirror^2 | https://magicmirror.builders/ | <ul><li>Electron App</li><li>Defines generic module</li><li>each module has its own DOM and has its own show function</li><li>Creates backend thread that runs for the module (only one thread per module type -- i.e. with two calendar apps, only one thread runs them in the back)</li></ul> | <ul><li>defining generic modules seems standard (consistent with our theory)></li><li>separation of frontend and backend may be important (need to do load considerations -- Marcus/Connor should discuss having separate hardware running for rendering and compute)</li></ul> |
| DakBoard | http://dakboard.com/site | <ul><li>Display with no mirror</li><li>No access to make custom modules -- emphasis // value add is that all the modules are extremely streamlined</li><li>high price point ($99 for just CPU, $299 for display + CPU)<\li></ul> | <ul><li>Constraining the environment might be good (//allowing access to an "app store" kind of thing might not be good business practice -- e.g. compare Android app store to Apple app store, one is filled with *anything* you can think of, the other has extreme QC)</li><li>People are willing to pay a high premium for good design</li></ul> |
| smart-mirror | https://github.com/n3a9/smart-mirror | <ul><li>Computer monitor (case removed) + two-way mirror + rasbperry bi + motion sensor</li><li>Shows time & date, weather, and, one news feed item, and integrates with Google Calendar</li><li>Many values (such as location and news source) are hard-coded</li><li>Each widget is a different component in a javascript app</li><li>Python and shell scripts used to turn mirror on and off based on motion detection</li><li>Good project to use as a benchmark for a baseline version of our mirror, for mid-point demo?</li><li>Overall, not that much code</li></ul>|It's easy to build a very simple version of this product and likely the harder pieces will be increasing interactivity, allowing some form of control (voice, gesture, touch, or paired smartphone app), and storing user profiles + customizing widgets given a logged in user.|
| MartinCraft | http://martiancraft.com/blog/2017/02/smart-mirror-software/ | <ul><li>iOS supported Smart-Mirror + two-way mirror </li><li>Shows time, weather, and, upcoming appointments</li><li>Native iOS app using Swift 3</li><li>Simple animations for weather</li>|It should be easy for the creator to expand and add new features to this product. During the design process, he intentionally kept things simple in order to be able to do that at a later date.|
  
# Roadmap

**Goal**: Plan out work items for the next four weeks (5 - 8) so that we can have a good demo, track our progress, start coding as soon as possible, and get to an acceptable final product with two weeks to spare at the end of the quarter in which we can add our favorite extensions / advanced features.

### Week 5:
Simple smart mirror with fixed widgets and hard coded values (such as always displaying Rodrigo's Google calendar and always getting news from the New York Times feed).

### Week 6:
Add control for interactivity through an iPhone app. We want to allow the user to open certain widgets and display more info about them, and then upon closing returning to the default fixed layout. The app should show which widgets are in use and upon clicking on a widget show which actions are possible. A command to open the calendar widget could cause it to go from displaying as a small square at the edge of the mirror to a larger square at the middle and from showing your schedule for a day to that of the whole week. Similarly for news feed, opening it could cause it to go from showing one news headlines to showlines multiple articles. Furthermore, we could support opening a whole news article for reading (more on widget design and features on a separate doc).

### Week 7:
Replicate phone app interactivity commands on Alexa for ease-of-use and 'smarter' feel. 

### Week 8:
Add control for layout in the phone app for customization. This entails a separate screen showing widget slots on the mirror. Upon clicking on a slot, we give the user options of widgets to choose from. So, for example, upon clicking on the bottom slot (more on widget layout in Front-end UI doc) we let the user choose from news feed, inspirational quote and phone notifications.

*Note: The above plan is flexible and will likely change slightly as some parts might take more or less time than we're budgeting for it. Additionally, we might want to add to it if we move through the 4 work items quicker than expected.*
*TODO (Rodrigo): add links to other docs*

# Overview of Front-end UI:

Color Scheme: Black background and White main color

Reasoning: Using two main colors enhances readability. Additionally, prevents background information from being too distracting for a user to do the usually things they would want to do with a mirror. It’s important that the UI doesn’t diminish the users ability to do things they do with a normal mirror.

Placement of Widgets: Grid pattern 3 out of 4 sides (Left, Top, Right).
Saying open “Widget Name” expands the widget (Also possible to open using the phone app), giving the user more information.
Small personal widget at the bottom of the screen. Gives a inspirational quote for a short period of time upon recognizing the user. Afterwards, displays most recent notification from phone (Assuming they’re connected).

Widget changes upon expansion:
Simple animations when appropriate.
For Weather widget, rain and snow fall, thunder clouds flash, etc.
Splashes of color that were not present in the condensed version. Eg. Yellow sun, blue rain
The reason why we don’t want all of this to be present when the widget is not expanded is because we don’t want the widgets to be distracting and obnoxious for users who are using the Smart Mirror as an actual mirror.
https://www.figma.com/file/cG7ZDaAuR7Xd7lBvgGfqDMgx/CS-194-Mockup

# Widgets (v1)

**Goal**: To state the desired design and functional specifications of the widgets (in rough order of increasing complexity) that will be presented in the version of the smart mirror used for the midpoint demo. Note that some of the described functionality requires an ability to interact with the widgets. We plan to achieve this at first with a phone app that pairs with the smart mirror. However, this app and pairing mechanism might not be ready for the midpoint demo and we might have to demonstrate that functionality on a laptop (by say, clicking on the widgets) or not demonstrate it at all for now.

## Default (appearance of widgets when mirror starts up; no user interactions)

### Date & Time

Simply displays the time and full date of the mirror's locale (internal state). 

_Future work: user should be able to change mirror locale from this widget. This change in locale would also cause changes to other widgets that depend on this information, such as the Weather widget._

### Weather

Shows the current temperature and weather forecast of the mirror's locale. Weather should be displayed as an icon, like a cloud with the sun behind it (and potentially include a text description, like "partly cloudy"). Should also display the predicted high and low temp. of the day, in a smaller font. The default temperature unit will be the Fahrenheit. 

_Future work: allow user to change mirror locale and toggle temperature to Celsius._

### Traffic

Allows the user to enter their home address and work address, and accesses Google's maps API to find the estimated travel time to get to work. 

_Future work: depending on hardware, we could automatically find the mirror's location._

### News Feed

Shows one news headline for the default news source (say, New York Times). Note that while most other widgets will have a square-like shape, this widget is shaped as a single line of text by default. Hence, it is would fit best in the top or bottom of the screen.

_Future work: allow user to change between different valid News API [TODO (Rodrigo): insert link here] sources_

### Calendar

Shows the schedule for one day of a Google Calendar account hard-coded in the mirror. 

_Future work: allow for multiple mirror users, with a mechanism for login (maybe triggered at start up) and logout. Calendar widget would display the schedule for the logged in user's Google Calendar account. This might entail some offline manual work every time a user is added since it seems like a OAuth client ID (API Credential) has to be created manually for every Google API account that is integrated. Also, the Google Calendar must be public._

### Music Player

Allows the user to play music from a Spotify account hard-coded in the mirror. Has next track and previous track buttons as well as a spot in the middle that shows either a play or pause button, like most music players. Should also show the name of the song as well as the artist, in smaller font. Note that we might need to encode a notion of a default playlist to play from at mirror start up since we want the music player's UI to be minimal by default. We might allow users to search for songs and navigate to other playlists after open the widget. 

_Future work: similarly to Calendar widget, allow for multiple users, and play music from the corresponding saved Spotify account._

