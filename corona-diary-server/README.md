# corona-diary-server

The server is needed to as middle-man for the communication between the clients.

## Database

An ill person stores data for the people he had contact with on the server.

![database](http://www.plantuml.com/plantuml/proxy?src=https://raw.github.com/chriamue/corona-diary/master/corona-diary-server/diagrams/database.puml)

The server stores the data sent by the ill person as connection to a person identified as public key.
The data will be encrypted for the public key of the other person on client side.
Data contains the public key of the ill person and a message as string.
The message is not specified yet.
Could be something like 'ILL' or 'MAYBE_ILL'.
Next to the data, a signature of the data has to be sent.
This allows the other person to check the data is no fake and truly sent by the ill person owning the public key in data.


## Authentification

There is no need to create any login information on the server.
Each communication with the server will just signed with the
keypair of the client.
It makes sure less thrash will stored on the server and
only the owner of the public key can download data directed to him.

* **URL**

  /api/v1/authentificate/:pubkey/:timestamp/:signature

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `pubkey=[base64]`

   `timestamp=[base64]`

   `signature=[base64]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{}`
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/api/v1/authentificate/LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JR0pBb0dCQUpIdzJ2WkRGS25wckptQzdsZDFMWENxZVNaaVhuSWhXanBpNVBOU2FRWTFPR2ErTUtFYlNmaFkKWlJmTFRoemcrUm1CN2N4WHA1TkcyWXNJZzg5YzNYWGkyQ3VxMDN1TkEwb0NBcHNxRThtUTkzakZTTDB1M2NRZwozZFNnZTByMmhSY3pWbHAySlIySG9hNGVUQnk1dEZWWDN2T2w1Uy9xM0FPZmxUVEJjdFdIQWdNQkFBRT0KLS0tLS1FTkQgUlNBIFBVQkxJQyBLRVktLS0tLQ%3D%3D/MTU4NjA5NTU5MjcwMg%3D%3D/SGF5WTg1eDc3ZTBnK1MvYXN5aERPVnBpcnJyYzJPY3EvSEdpNDJFTmhwS0JBZmMxeURxWWRYcXBjd2hidFRMRnF4OEl6dDh6RHNKTUZ6Y3ZTSDhRdTQzRkM3ZFRHaWt0VGRQMUxTTWNtM2t0R3dnVUxBZFZsd2dUeEpPZU12T1lZQUxRT2pTRXo5VFpJRlUvRFcvbXpsQVdyc3o2dVUvM1ZuS1RaUG1iaGo4PQ%3D%3D",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

## Fraud

### Man-in-the-middle Attack

If the server is compromised or the database is leaked, only the public key of
the persons an ill person sent data to is visible.
The public key of the ill person is encrypted.
To prevent to know the person really had contact to an ill person,
the person could generate randomly public keys and make noise by sending
dummy data to his own public key.

### Replay Attack

Is it possible for Marvin to record data sent by Alice to Bob and send the same message again to Carol?
Is it possible for Marvin to replace the public key of Bob with the public key of Carol?

No. The signature is generated using the private key of Alice. The signature is made for
the data and the public key of Bob. If the public key of Bob is replaced, the signature
has to be replaced too. It is not possible for Marvin to create a signature as Alice.
