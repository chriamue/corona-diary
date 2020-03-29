# corona-diary
App to automatically log which people you met to predict i you could have been infected if other people have symptoms.

Project status: ideation

## 3 Parts

This project contains of 3 parts.

### 1. Measure and log contact to other persons

Contact to other persons should be measured via mobile phone.

### 2. Log your symptoms in a diary

Symptoms can be logged in a calendar so it is possible to calculate where you have been infected.

### 3. Predict your possibility to be infected

Based on contacts to other persons, their symptoms and your symptoms, an infection can be approximated.

## Privacy

Most data should be stored on the devices of the users.
Timestamp, location and public key of people around you will be stored on your device.
The public key is a pseudonym for the persons device, nobody needs to know who is owner of the public key.

## Devices

Each person needs a mobile phone with wifi and bluetooth.
For some special data to share, a server is needed.

![devices](http://www.plantuml.com/plantuml/proxy?src=https://raw.github.com/chriamue/corona-diary/master/diagrams/devices.puml)

## Part 1

In the first part the app has to detect surrounding devices,
connect to them and share the public key.

![part1](http://www.plantuml.com/plantuml/proxy?src=https://raw.github.com/chriamue/corona-diary/master/diagrams/log_contact.puml)
