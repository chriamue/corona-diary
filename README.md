# corona-diary
App to automatically log which people you met to predict i you could have been infected if other people have symptoms.

Project status: ideation

[![Build Status](https://travis-ci.org/chriamue/corona-diary.svg?branch=master)](https://travis-ci.org/chriamue/corona-diary)
[![Coverage Status](https://coveralls.io/repos/github/chriamue/corona-diary/badge.svg?branch=master)](https://coveralls.io/github/chriamue/corona-diary?branch=master)

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

Both users have the public key of the other user in their own app now.
They know now when, (and if they also logged the location, where) they
had contact to the other user.
Information about who the other user is not inteded to be saved, they are pseudonym.

## Part 2

In the second part the user has to log his wellbeing.
This information can be shared by the user.
It will be signed by private key, which can be verified by others using the public key.
The information will be shared using a server.
Signed information and list of public key, which are users that are allowed to view the information will be uploaded to the server.
Other users can login to their public key account using their private key.
Their Apps will download information of all users that shared information with them.

![part1](http://www.plantuml.com/plantuml/proxy?src=https://raw.github.com/chriamue/corona-diary/master/diagrams/log_wellbeing.puml)

## Part 3

Visualizes probability to be infected.
Charts and diagrams should show when contact to persons
which are infected now happened.
Based on the data and own symptoms, probability of illnes can be calculated.

## Fraud

What happenes if people upload information to lead others to believe they are ill, but they are not.

There should be an interface, doctors can sign and validate the users public key to be ill.

![part1](http://www.plantuml.com/plantuml/proxy?src=https://raw.github.com/chriamue/corona-diary/master/diagrams/validate.puml)

## Technology Stack

Following some devices, technology, services and APIs that could be usefull.

### Devices

On the client side, the app should run on mobile phones.
The server part could run on any container based cloud instance.

### Peer 2 Peer

Devices should find each other using mainly bluetooth.
Ultrasonic, based on the phones speaker and microphone
could also be implemented.

### APIs

To make connections to nearby devices [Connections API](https://developers.google.com/nearby/connections/overview) can be used.

### Self Sovereign Identity

To able People to proof if reported People they had contact with are truly ill,
an identity system is needed.

![part1](http://www.plantuml.com/plantuml/proxy?src=https://raw.github.com/chriamue/corona-diary/master/diagrams/validate.puml)

After a diagnose was made by the doctor, the doctor will report the person to
a helth office. The health office will issue a credential for the corona infected person. When the person now informs the other persons, they can request a proof
to make sure the person is truly ill.
The proof will only contain the public key of the ill person,
so the real identity is still anonym.

[The Sovrin SSI Stack](https://sovrin.org/wp-content/uploads/SovrinSSIStack.png)

## Related Projects

[Pan-European Privacy-Preserving Proximity Tracing](https://www.pepp-pt.org/)