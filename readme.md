# Ecommerce-Microservice Backend

This is a simple ecommerce microservice backend built with Node.js(Typescript), Express, and MongoDB. This Project contains the following services:

### Auth Service

- This service is responsible for user authentication and authorization. It uses JWT for authentication and authorization. It also uses bcrypt for hashing passwords.

### Shop Service

- This service is responsible for managing the shop(products). It uses MongoDB for storing the products and NATS Streaming Server for event based communication.

### Order Service

- This service is responsible for managing the orders. It uses MongoDB for storing the orders and NATS Streaming Server for event based communication.

### Payment Service

- This service is responsible for managing the payments. It uses MongoDB for storing the payments and NATS Streaming Server for event based communication. It also uses Stripe for payment processing.

### Expiration Service

- This service is responsible for managing the expiration of orders. It uses redis for storing the expiration times and NATS Streaming Server for event based communication.
