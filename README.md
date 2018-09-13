<img src="https://i.imgur.com/uBfNxsC.png" width="400">

# Synopsis
We are looking to integrate a personalized morning experience into your everyday mirror. Reflection will be the best smart-mirror solution available, providing facial recognition technology and customizable widgets such as a calendar, weather report, traffic report, music player and more! Wake up, and get ready in front of Reflection with all the information and entertainment you need to have a fun and productive day.


# Team Members
Member | Photograph
--- | ---
Rodrigo Grabowsky |
Connor Normand |
James Lyons | 
Marcus Vincent Gomez |
Tyler Dammann | 


# Team Skills Matrix:

Member | Skills | Personal Traits | Desired Growth | Weaknesses
--- | --- | --- | --- | ---
Rodrigo | AI, NLP, Web Applications, Python, communication | Optimistic, hardworking, fast-learner, detail-oriented | Front-end, web APIs, groupwork | Cannot function on low levels of sleep. Forgetful.
Connor | Hardware, Operating Systems, Digital Systems, C, C++ | Disciplined, organized |  Programming, collaboration | Procrastination, responsiveness
James | iOS Development, Android Development, C, C++, Python | Optimistic, disciplined | Management, collaboration, GitHub, Documentation | Tends to procrastinate often
Marcus | Product Management, Dev Ops, Computer Vision / AI, Optimization, Backend Dev | Pragmatic, aggressive work-ethic | Front-end, product design | Incredibly stubborn
Tyler | AI, ML, graphical modeling, web dev | Good work ethic, fast learner | Low-level programming, hardware, working as a team | Tendency to procrastinate

# Team Communication:
1. Slack: [reflection-hq.slack.com](https://reflection-hq.slack.com) (signup at [reflection-hq.slack.com/signup](http://reflection-hq.slack.com/signup)).

2. [Google Team Drive](https://drive.google.com/drive/u/1/folders/0AG_-DdtPQdukUk9PVA) (ping [mvgomez@stanford.edu](mailto:mvgomez@stanford.edu) to gain access)

# Development

## Version 1: MERN

### Description
We believed initially that starting off with ExpressJS and NodeJS on the server and MongoDB as our lightweight database would be helpful in developing the features we planned, such as user profiles. We quickly ran into a variety of issues with this stack. The MERN project seems outdated and there were some mismatching dependencies that were causing issues with `npm install`. Trying to install new node modules that we needed would result in dependency errors and prevented us from moving forward. The MERN stack itself had a really long list of node modules, most of which we didn't. Most importantly, right off the bat, even with really simple functionality, our webpack bloat (i.e.: huge number of files being bundled) was making start-up really slow and consuming a lot of the Pi's resources (processing power, to be specific). This caused the Pi to crash with simple things such as plugging in a keyboard and/or mouse (which we needed for development). We predicted similar things would happen when connecting devices we needed for the demo such as phone and speaker paired with bluetooth. We have kept our initial notes about this version of the project below under the headings **Set-up** and **Miscellaneous**. Moreover, our code was kept in the `reflection` folder.

### Set-up
We used the MERN scaffolding tool to create the boilerplate for this project. More information about this tool can be found in this [repository](https://github.com/Hashnode/mern-starter) and in this [website](http://mern.io/). To start your setup, clone the top-level repository [Reflection](https://github.com/StanfordCS194/Reflection) and step into the `reflection` folder. Make sure you have [mongodb](https://docs.mongodb.com/v3.0/installation/) and npm3 before following these steps:
1. Run `npm install` to install the node modules (dependencies) for this project.
2. Type `mongod` into a shell tab to run MongoDB and then `npm start` in another to start the server. Note that if this is your first time using MongoDB, you will have to create a data folder: `mkdir -p /data/db`.
3. Finally, navigate to [localhost:8000](http://localhost:8000/) in your browser.

### Miscellaneous
We've noticed the app takes around a minute to start up. If we want to incorporate a motion detector into our hardware setup and write a shell script to quickly start the database and server as soon as a user steps in front of the mirror, we will probably have to make the project as lightweight as possible and delete some of the convenient boilerplate code.
