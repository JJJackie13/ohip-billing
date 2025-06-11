# OHIP Medical Billing System API

A backend system built with **NestJS** to simplify medical billing processes based on the **Ontario Health Insurance Plan (OHIP)** model. The system supports patient records, physician management, claims submission, and integration with both **PostgreSQL** and **MongoDB** for transactional and metadata storage respectively.

---

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based secure login for users
  - Role-based access control (Admin, Physician, Billing Clerk)

- **Patient & Physician Management**
  - Create, read, update, and delete patient and physician records
  - Validation and ID linking between services

- **Claim Submission**
  - Submit OHIP billing claims with service codes
  - Automatic mapping of fee schedules from MongoDB
  - Status tracking (pending, submitted, rejected, approved)

- **Fee Schedule Metadata**
  - Fee codes, descriptions, and modifiers stored in MongoDB
  - Dynamic fee lookups and validation

- **API Documentation**
  - Swagger/OpenAPI support for easy testing and integration

---

## 📦 Tech Stack

| Layer         | Technology        |
|--------------|-------------------|
| Backend       | [NestJS](https://nestjs.com)     |
| Authentication| JWT + Passport.js |
| Relational DB | PostgreSQL (for patients, claims, users) |
| NoSQL DB      | MongoDB (for OHIP metadata, fee codes) |
| ORM           | TypeORM + Mongoose |
| Validation    | class-validator, DTOs |
| API Docs      | Swagger UI |

---

## 🛠️ Setup & Installation

### Prerequisites

- Node.js v18+
- PostgreSQL 13+
- MongoDB

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/ohip-nestjs-api.git
cd ohip-nestjs-api
```

 ### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a .env file in the root directory:
```env
PORT=3000
JWT_SECRET=your_jwt_secret
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=ohip_billing
MONGO_URI=mongodb://localhost:27017/ohip_metadata
Run Migrations (If applicable)
bash
npm run typeorm:migration:run
```

### 4. Run the App
```bash
npm run start:dev
```

### 🧪 Testing API with Postman
Login endpoint:
Use Postman or curl to interact with the API.

#### 1. Login
```http
POST /auth/login
{
  "email": "doctor@example.com",
  "password": "securepassword"
}
```

Response:
```json
{
  "access_token": "your-jwt-token"
}
```

#### 2. Authenticated Requests
Add this to your headers:
```makefile
Authorization: Bearer your-jwt-token
```
#### 3. Common Endpoints
POST /login

POST /patients

POST /providers

GET /patients

GET /providers

GET /billing/:id

GET /patients/:id/billings

GET /fee-schedule/:code

### 📄 Swagger Docs
Available at:

```bash
http://localhost:3000/api
```
### 🗂️ Project Structure
```bash
src/
├── auth/           # Auth module (JWT, guards)
├── users/          # User management
├── patients/       # Patient CRUD
├── providers/      # Physician CRUD
├── encounters/     # Billing claims logic
├── billings/       # OHIP fee code handling
├── feeschedule/    # Ohip fee schedule
├── common/         # DTOs, interceptors, guards
├── main.ts         # App entry point
├── app.module.ts   # Root module that wires together all other modules
```

### 🧑‍💻 Author
Jacky Leung
Full Stack Developer
📍 Toronto, ON
🔗 LinkedIn

### 📜 License
MIT © 2025 Jacky Leung

```yaml

---

Let me know if you want me to include:
- Example Swagger screenshots
- Dockerfile + `docker-compose.yml`
- Seed scripts for fake patients and fees
```

Just say the word!
