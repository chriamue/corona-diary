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

## Part 2

In the second part the user has to log his wellbeing.
This information can be shared by the user.
It will be signed by private key, which can be verified by others using the public key.
The information will be shared using a server.
Signed information and list of public key, which are users that are allowed to view the information will be uploaded to the server.
Other users can login to their public key account using their private key.
Their Apps will download information of all users that shared information with them.

![part1](http://www.plantuml.com/plantuml/proxy?src=https://raw.github.com/chriamue/corona-diary/master/diagrams/log_wellbeing.puml)
