# Hardware Specifications

### Progress Photos

![alt text](./markdown_images/IMG-8567.JPG)

**Fig. 1** Before frame assembly.

![alt text](./markdown_images/IMG-8568.JPG)

**Fig. 2** After assembly of front frame.

![alt text](./markdown_images/IMG-8570.JPG)

**Fig. 3** Drying wood glue in between the front frame and the side frame pieces, mirror has been attached (covered by plastic).

![alt text](./markdown_images/clean_mirror.jpg)

**Fig. 4** Cleaning the glass before applying finish.

![alt text](./markdown_images/IMG-8572.JPG)

**Fig. 5** Frame varnished and drying.

![alt text](./markdown_images/IMG-8577.JPG)

**Fig. 6** Frame completed, before adding monitor.

![alt text](./markdown_images/IMG_8581.jpg)

**Fig. 7** Monitor fitted in back of frame and secured.

![alt text](./markdown_images/testing_front.jpg)

**Fig. 8** Front view of mirror during hardware testing.

![alt text](./markdown_images/testing_back.jpg)

**Fig. 9** Back view of mirror during hardware testing.

![alt text](./markdown_images/IMG_8590.jpg)

**Fig. 10** Full view of mirror after completion, with unfinished app displayed.

### Design

#### Front View

![alt text](./markdown_images/mirror_design2.jpg)

#### Side and Back View

![alt text](./markdown_images/mirror_design.jpg)

### Hardware Specification
* Quad Core 1.2GHz Broadcom BCM2837 64bit CPU
* 1GB RAM 
* BCM43438 wireless LAN and Bluetooth Low Energy (BLE)

### Operating System Information

##### Attempt 1: Raspbian

https://www.raspberrypi.org/downloads/raspbian/

The first linux distribution that we attempted to use was the default Rasbian
operating system officially supported by RaspberryPi. This eventually was
removed as installations of NodeJS and various NPM modules caused dependency
issues that greatly slowed production of the application. Because we need to test
on our limited hardware concurrently with development machines, we needed to
switch to a more reliable distribution.

##### Current: Ubuntu MATE

https://ubuntu-mate.org/download/

We switch to Ubuntu MATE as a lightweight version of one of the most common
linux distributions. We hoped that with this change in operating system to one
with more support, we would be able to see a significant decrease in
development time.

##### Future: Arch

https://www.archlinux.org/download/

In the future, we would like to switch to a custom Arch distribution that would
allow us to configure the Raspberry Pi to be as minimal as possible. We would
hope that the immense customizability of this distribution would allow better
performance metrics while running the application on the mirror.

### Current Status & Bugs

* App currently functional on Raspberry Pi
* CPU Utilization - ~(10-20)%
* BLE communication is accepted and propagated correctly through application


### Voice Recognition
* Voice recognition is currently handled within react-speech-recognition.
Previous attempts at speech recognition included PiAUISuite and Jasper.
However, we realized that PiAUISuite relies on outdated dependencies and
Jasper would incorrectly interpret our system as NOT a Raspberry Pi.
Ultimately, these issues couldn't be resolved and we currently utilize
react-speech-recognition.
* UPDATE: Voice recognition can work on the application on any other machine 
other than the Raspberry Pi. The Raspberry Pi, we assume, needs more
computational power in order to handle the TTS service as well as running the
npm server. Test the voice recognition technology using the keyword "mirror"
followed by "toggle <widget>" where <widget> is the name of the widget to be
toggled.

### List of Materials

#### Frame
* 16" x 24" acrylic two-way mirror
* 3 pieces of .688" x 3" x 8' lumber
* 48 5/8" wood screws
* 4 1 1/2" wood screws
* 24 3/4" metal corner braces
* Dark cedar wood varnish
* 2 all-paint/stain brushes

#### Electronics
* 22" monitor, stripped
* Raspberry pi 3 model B
* USB Microphone


Item | Cost | Link | Already Acquired
---  | ---  | ---  | ---
Raspberry Pi 3 Model B | 35 | https://www.amazon.com/Raspberry-Pi-RASPBERRYPI3-MODB-1GB-Model-Motherboard/dp/B01CD5VC92/ | Yes
Monitor | 109.99 | https://www.amazon.com/dp/B0098Y77OG/ | Yes
Custom two-way acrylic mirror | 139.95 + shipping | https://www.twowaymirrors.com/product/18x24-smart-mirror-polished-edges/ | Yes
Wood frame | | | Yes
