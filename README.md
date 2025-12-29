

# 🔐 FMVTS Auth Microservice

The **FMVTS Authentication Microservice** is responsible for **user authentication and authorization** within the Fleet Management and Vehicle Tracking System (FMVTS).  
It acts as the **security backbone** of the platform by validating user credentials, generating JWT tokens, and coordinating with the **User Microservice** for user verification and registration.

---

## 📌 Core Responsibilities

- Authenticates users during login
- Generates **JWT tokens** for valid users
- Communicates with the **User Microservice** to:
  - Validate user credentials
  - Fetch user details
  - Register new users
- Ensures secure access to protected services via token-based authentication

---

## 🏗️ Architecture Role


The Auth Microservice does **not store user data**.  
Instead, it relies on the **User Microservice** as the source of truth for user credentials and roles.

---

## 🔐 Authentication Flow
  Client
   |
   v
 Auth Microservice
   |
   v
 User Microservice


### 🔑 Login Flow
1. Client sends login request with email and password
2. Auth Service requests user details from User Microservice
3. Password is validated using **bcrypt**
4. On successful validation:
   - JWT token is generated
   - Token includes user email and role
5. Token is returned to the client

### 📝 Sign-Up Flow
1. Client submits user registration details
2. Auth Service forwards request to User Microservice
3. User is enrolled and persisted by User Microservice
4. Registration metadata is returned to the client

---

▶️ Running the Service
   Install Dependencies
    npm install
   
   Start Service
   npm start


🔌 API Usage Examples (cURL)
🔑 Login User

Authenticate an existing user and generate a JWT token.

  Endpoint
     [POST /v1/auth/login] (http://localhost:3007/api/auth-ms/v1/auth/login)
  

{
  "email": "user@gmail.com",
  "password": "***************"
}


{
  "message": "User login success!",
  "token": "string"
}


📝 Register (Sign-Up) User

    [POST /v1/auth/sign-up](http://localhost:3007/api/auth-ms/v1/auth/sign-up)
  
 {
  "username": "string",
  "email": "string",
  "fullName": "string",
  "password": "string",
  "contactNumber": "string",
  "licenseNumber": "string",
  "role": "string"
}


Sample Success Response

{
  "message": "User Registration successful",
  "_id": "694fc9fb4ed2e7c50742743e"
}




