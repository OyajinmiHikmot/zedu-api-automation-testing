
# API Testing Project (Jest + Axios)

This project contains automated API tests written using **Jest** and **Axios**. It covers authentication, user management, and profile-related endpoints with positive, negative, and edge case testing.

---

## 1. Project Setup

### Step 1: Initialize Node project

```bash
npm init -y
cd

```

This creates a `package.json` file.

---

### Step 2: Install dependencies

```bash
npm install axios dotenv
npm install --save-dev jest
```

* axios  for making HTTP requests
* dotenv for environment variables
* jest for testing framework

---

### Step 3: Configure Jest

Open `package.json` and add:

```json
"scripts": {
  "test": "jest --runInBand"
}
```

---

## 2. Project Structure

Create the following structure:

```
project-root/
│
├── tests/
│   ├── auth.test.js
│   ├── profile.test.js
│   ├── users.test.js
│
├── utils/
│   └── auth.js
│
├── .env
├── package.json
└── README.md
```

---

## 3. Environment Variables

Create a `.env` file:

```env
BASE_URL=http://your-api-url.com
EMAIL=your-email@example.com
PASSWORD=your-password
```

---

## 4. Helper Utility

### `utils/auth.js`

Used to fetch authentication token and user ID for tests.

```js
const axios = require("axios");
require("dotenv").config();

async function getTestData() {
    const response = await axios.post(`${process.env.BASE_URL}/auth/login`, {
        email: process.env.EMAIL,
        password: process.env.PASSWORD
    });

    return {
        token: response.data.data.access_token,
        user_id: response.data.data.user.id
    };
}

module.exports = { getTestData };
```

---

## 5. Running Tests

Run all tests:

```bash
npm test
```

Run a single file:

```bash
npx jest tests/auth.test.js
```

---

## 6. Test Coverage

This project includes tests for:

### Authentication

* Login success (positive test)
* Wrong password (negative test)
* Wrong email (negative test)
* Empty fields (edge cases)
* Invalid email format (edge case)

---

### Profile

* Get user profile (positive)
* Invalid token (negative)
* Delete profile image without token (negative)
* Update status (positive)
* Get user presence (positive)

---

### Users

* Get user by ID (positive)
* Get current user (positive)
* Get users list (positive)
* Delete invalid user (negative)
* Update with empty payload (edge case)
* Deactivate user (positive)
* Reactivate user (positive)
* Unauthorized access (negative)
* Invalid status update (negative)
* Media preference errors (negative)
* Reset auto-download settings (positive)

---

## 7. Test Design Rules Used

Each test follows:

* Positive test cases (valid API behavior)
* Negative test cases (invalid input or unauthorized access)
* Edge cases (empty payloads, invalid formats)
* Proper assertions:

  * Status codes
  * Response structure
  * Data types
  * Key presence

---

## 8. What to Do After Writing Tests

After completing at least 25+ test cases:

### Step 1: Run all tests

```bash
npm test
```

### Step 2: Fix failing tests if any

### Step 3: Push to GitHub

```bash
git init 
git add .
git commit -m "completed API test coverage"
git push origin main
```

### Step 4: Ensure:

* `.env` is in `.gitignore`
* No secrets are pushed


9. Final Submission Checklist

Before submitting:

All tests passing
Minimum 25 test cases written
Organized folder structure
README included
GitHub repo updated
No exposed secrets




