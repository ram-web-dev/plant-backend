# Plant E-commerce Website - Backend

This repository contains the backend code for a plant e-commerce website. It provides API endpoints for user authentication, product management, shopping cart functionality, and order processing.

## Features

- User Authentication
  - User signup and login with JWT (JSON Web Token) authentication.
- Product Management
  - API endpoints to create, retrieve plant products.
- Shopping Cart
  - Allows users to add products to their cart.
  - Provides endpoints to view, update, and delete cart items.
- Order Processing
  - Enables users to place orders from their cart.
  - Stores order details and provides order history.

## Technologies Used

- **Node.js:** JavaScript runtime environment.
- **Express.js (v4.21.2):** Web application framework for Node.js.
- **SQLite (v5.1.1, sqlite3 v5.1.7):** Embedded SQL database engine.
- **JWT (jsonwebtoken v9.0.2):** JSON Web Token for authentication.
- **bcrypt (v5.1.1):** Library for hashing passwords.
- **cors (v2.8.5):** Middleware for enabling Cross-Origin Resource Sharing.
- **dotenv (v16.4.7):** Loads environment variables from a `.env` file.

## API Endpoints

### Authentication

- `POST /signup`: User signup
  - Request body:
    ```json
    {
      "username": "Ram",
      "email": "ram2gmail.com",
      "password": "1234"
    }
    ```
  - Response:
    - 201: User created successfully.
    - 400: `{"err_msg": "Username, Email, Password cannot be empty!"}` (if any field is missing).
    - 409: `{"errMsg": "email already exists"}` (if email is already registered).
- `POST /login`: User login
  - Request body:
    ```json
    {
      "email": "ram@gmail.com",
      "password": "1234"
    }
    ```
  - Response:
    - 200: JWT token for authorization.
    - 400: `{"errMsg": "Email, Password cannot be empty!"}` (if any field is missing).
    - 404: `{"errMsg": "Email not found"}` (if email is invalid).
    - 401: `{"errMsg": "Invalid Password"}` (if password is incorrect).

### Cart

- `GET /cart`: Fetch cart items
  - Requires authorization (JWT token)
  - Response:
    - 200: `{"cartList": [...]}` (an object with an array of cart items, or an empty array if the cart is empty).
- `POST /cart`: Create cart item
  - Request body:
    ```json
    {
      "productId": 1,
      "quantity": 3
    }
    ```
  - Requires authorization (JWT token)
  - Response:
    - 201: Cart item created successfully.
- `PATCH /cart`: Edit cart item quantity
  - Request body:
    ```json
    {
      "cartItemId": 1,
      "quantity": 2
    }
    ```
  - Requires authorization (JWT token)
  - Response:
    - 200: Cart item updated successfully.
- `DELETE /cart`: Delete cart item
  - Request body:
    ```json
    {
      "cartItemId": 1
    }
    ```
  - Requires authorization (JWT token)
  - Response:
    - 200: Cart item deleted successfully.

### Orders

- `POST /orders`: Create order
  - Requires authorization (JWT token)
  - Response:
    - 201: Order created successfully.
- `GET /orders`: Get user orders
  - Requires authorization (JWT token)
  - Response:
    - 200: `{"orders": [...]}` (an object with an array of orders placed by the user).

### Products

- `GET /products`: Get products
  - Response:
    - 200: `{"products": [...]}` (an object with an array of products).
- `POST /products`: Create product
  - Request body:
    ```json
    {
      "name": "car",
      "imageUrl": "[https://picsum.photos/seed/picsum/200/300](https://picsum.photos/seed/picsum/200/300)",
      "description": "A beautiful car",
      "price": 300
    }
    ```
    - Requires authorization (JWT token) **and Admin Role.**
    - Response:
      - 201: Product created successfully.
      - 403: `{"err_msg": "Access Denied"}` (if accessed by a non-admin user).

## Setup Instructions

1.  Clone the repository:
    ```bash
    git clone [repository URL]
    cd [repository directory]
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure database connection:
    - Update database connection details in the relevant configuration file.
4.  Start the server:
    ```bash
    npm start
    ```
    The API will be accessible at `http://localhost:3000` (or the port specified in your configuration).
