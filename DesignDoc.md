# Reflection Design Doc
# Updated architecture as of 5/23/18
The original architecture we built was effective on most laptops; however, upon loading the software onto the Raspberry Pi, we ran into several difficulties. For one, the architecture took 7-8 minutes to load on the Pi; on top of that, the app would frequently crash and oftentimes shut down the Pi itself, due to using 80-90% of the total available CPU. Consequently, we re-wrote the majority of the architecture to be much more lightweight and simple

## Base Application
We stripped down to using a React architecture only, completely removing the backend component and cutting down the size by over 60%. The application by default is mostly static; all API calls are made directly from the React frontend, and all input/output will be done purely on the frontend as well. The app is structured as a normal React application -- a standard AppContainer style object was designed to hold all of the individual widgets, each of which have their own render() and process() functions. The AppContainer maintains these in a grid, keeping the center of the grid clear to allow for the user to continue to see their own reflection. The order in which the widgets are loaded into the grid is configurable, but as of the current date of writing, we have opted to keep it static until we have a clear input / output mechanism. This updated app importantly reduces CPU usage to sub-50% levels, and startup time is now under a minute. 

## Input / Output
As a baseline input / output mechanism, we keep a config.json file which contains all of the user information and allows the mirror to render a UI custom to the user. In order to modify the file, we currently allow for SSH access into the Pi. As a further point, we currently have developed a basic Bluetooth Low Energy (BLE) framework for communicating between the Pi and a phone app -- we are currently robustness testing this functionality on the Pi, and, provided the Pi can handle the BLE processing without being overloaded, we will allow for further configurability directly through the app. 

## Widgets
We provide the following widgets. Note that each widget has an unfocused and focused view; by default, the widgets are all unfocused, but we allow for a focused view to be toggled on and off either via click (for testing), or eventually, via phone app. 
* Time and Date: This is a basic time and date widget which pulls real-time information from the Pi itself. No API calls are necessary. 
* Calendar: This widget leverages the Google Calendar API. Originally, we had a full calendar displayed on-screen, but we have since opted for a much simpler / cleaner UI, where only the next upcoming event is displayed. The calendar widget links to a publicly available Calendar, the information for which is directly configurable through the config.json
* News: This widget pulls from the New York Times API, pulling the most recent news headlines and displaying them on-screen. This refreshes every 10-20 seconds, accounting for the real-time nature of news.  
* Twitter: This widget pulls the Twitter feed from a specified Twitter user using the standard Twitter API; the rendering is also performed using standard a Twitter javascript script embedding. The user whose feed is pulled is configurable throug hte config.json. 
* Traffic: This widget pulls traffic data between the user's home and work using the Google Maps API; it then calculates internally the approximate compute time, and renders this for the user. The home and work addresses are both configurable through the config.json
* Quote of the Day: This widget pulls a daily quote from the quote of the day API; it refreshes once every 24 hours to reflect the most updated daily quote. 
* Music Player: This widget looks at the system's Spotify account and plays music from said account; the rendering occurs using a standard Spotify javascript script embedding. Right now, playing / pausing can only be done via click, but we plan to add play/pause functionality to the phone app directly. 


# Original Design 
Here we'll detail the software architecture necessary for the Reflection smart mirror. In particular, having done our benchmarking research, we identified a few key characteristics for our design:

* Modularity is important -- we want each widget to be self-contained
* Compute is limited (Raspberry Pi uses an ARM A53, which has a 28 clock cycle latency on read/write to memory, small cache, runs at 1.6Ghz), so we want the architecture to be lightweight
* Easy access to hardware is necessary for any advanced functionality

Based on team experience and benchmarking evaluation, we opt to use the MERN stack to build a lightweight app. We'll run the app locally on the Raspberry Pi (important -- app is not on a separate server), for fairly instantaneous response time. 

As an overview, the main app architecture will look as follows
![alt text](https://i.imgur.com/MTbAn4q.png)

## Input / Output (I/O)
We would like to take input from the following sources (MVP sources bolded)
* **Attached Keyboard**
* Camera
* Microphone
* Amazon Alexa
* Phone App
  
The input/output (I/O) module of the program will be passively listening for inputs from any of these sources. Each source will define its own input processor class (e.g. Camera will have a "CameraProcessor" class), which will convert the raw input into standard packet for the widget router. Importantly, we'll let this component run async, especially with the microphone and camera inputs, to allow for real-time capture of information. The input/output module will send a standard data packet to the module router containing the following information:
 * Input source
 * Destination widget type
 * Input data in JSON (destination widget should expect data of a particular type and schema, processor classes should comply this typing)
 * Priority (optional ?)
 
 ## Widget Router
 Update: For now this won't actually be a class, it'll just be some function that gets called and sends data to the appropriate widget; all widgets will be objects or functions of the I/O module or will at minimum exist in an acessible way. An explicit router object is only needed if we need to process multiple inputs asynchronously with limited number of threads, but we can force the user (at least for MVP), to only give one input at a time.
 
<s>The module router will eventually be run as a threadpool, but for now (for compute and simplicity sake), we treat it as a (priority?) queue, which pushes inputs from the I/O module onto the queue in a synchronous manner. Every time the module router thread frees // finishes its last processing task, it pops a new data packet from the queue, determines the appropriate widget to route to, and pushes the data to the widget. The widgets are instantiated as objects at start time and are objects owned by the router (this might have to change if space is too big -- e.g. maybe widgets are just well-typed functions).</s>
 
 ## Widget
 A widget will either be a full class or a standardly typed function for performing the specific compute for a widget of a given type. It defines a JSON schema for the input data it expects (**TODO: find a way to enforce compliance**). Widget takes the data as input, and as output, sends a signal and relevant rendering data to the Renderer to render the widget on the UI
 
 ## Renderer
The renderer keeps an internal data structure maintaining what widgets are occupying what parts of the grid. On receiving a signal, it chooses the next available spot on the grid, and asks the relevant widget to render itself at that spot. (Probably want to separate widget processing and widget rendering? @James, we'll discuss how to do this correctly)
