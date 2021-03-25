# Ticket

This is a complex application to understand how to create micro-services and how they can communicate with each other.

## Index
**[Application Design](#application-design)** </br>

## Application Design
**[Entities](#entities)** </br>
**[Services](#services)** </br>
**[Architecture](#architecture)** </br>

### Entities

#### User
|  Name   |  Type  |
| :-----------: |:-------------:|
| email | string |
| password | string |

#### Order

|  Name   |  Type  |
| :-----------: |:-------------:|
| userId | ref to user |
| status | Created - Canceled - Awaiting Payment - Completed |
| ticketId | ref to ticket |
| expiresAt | Date |

#### Ticket

|  Name   |  Type  |
| :-----------: |:-------------:|
| title | string |
| price | number |
| userId | ref to User |
| orderId | ref to Order |

#### Charge

|  Name   |  Type  |
| :-----------: |:-------------:|
| orderId | ref to Order |
| status | Created - Failed - Completed |
| amount | number |
| stripeId | string |
| stripeRefundId | string |

### Services

#### [Auth](auth/)

Will represent everything related to user sign-up, sign-in and sign-out.

#### [Tickets](tickets/README.md)

Will represent everything related to creating and editing tickets.

#### [Orders](orders/README.md)

Will represent everything related to creating and editing orders.

#### [Expiration](expiration/README.md)

Will watch for orders being created and will canceled them after 15 minutes.

#### [Payments](payments/README.md)

Will represent credit card payments. Cancels orders if payment fails, completes if payment succeeds.

### Architecture

This application is built using the following architecture:

#### Client

The front-end application is created using NextJs (Server side rendering).

#### Common

This application will have common library logic used in all the services.

#### Services

All the services will have a NodeJs application using Typescript, connected to a Mongo database, except the Expiration service that will use Redis.

#### Message Bus

For the Message Bus application will use a NATS streaming service.