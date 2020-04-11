# Self Sovereign Identity

To able People to proof if reported People they had contact with are truly ill,
an identity system is needed.

![part1](http://www.plantuml.com/plantuml/proxy?src=https://raw.github.com/chriamue/corona-diary/master/diagrams/self_sovereign_identity.puml)

After a diagnose was made by the doctor, the doctor will report the person to
a helth office. The health office will issue a credential for the corona infected person. When the person now informs the other persons, they can request a proof
to make sure the person is truly ill.
The proof will only contain the public key of the ill person,
so the real identity is still anonym.

![The Sovrin SSI Stack](https://sovrin.org/wp-content/uploads/SovrinSSIStack.png)

## DID

As an institution health offices will get DIDs.
They will issue the credentials.

## Schema

```javascript
{
    "name": "disease",
    "version": "0.1",
    "attrNames": [
        "symptoms",
        "first_time_symptoms",
        "coombs_test",
        "virus_test",
        "test_positive",
        "tested_date"
    ]
}
```

## What will be shared?

Tested persons do not need to share everything.
They can just share 'test_positive' and 'tested_date'.
