
# API Automation Testing Project (Jest + Axios)

This project contains automated API tests for the **Zedu platform**, built using **Jest** and **Axios**.

It validates authentication, user management, and profile endpoints using:

* Positive test cases
* Negative test cases
* Edge cases

The project is designed to reflect **real-world QA automation practices**, including reusable authentication, environment configuration, and CI integration.

---

## 1. Project Overview

This automation suite ensures that:

* APIs behave correctly under valid conditions
* Errors are properly handled
* Edge cases do not break the system
* Authentication is handled dynamically

All tests are independent, repeatable, and idempotent.

---

## 2. Tech Stack

* Node.js
* Jest (test framework)
* Axios (HTTP client)
* dotenv (environment variable management)
* GitHub Actions (CI/CD)

---

## 3. Project Structure

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
├── .github/
│   └── workflows/
│       └── ci.yml   <-- GitHub Actions goes here
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 4. Environment Variables

Create a `.env` file in the root directory:

```
BASE_URL=https://api.staging.zedu.chat/api/v1
EMAIL=your-email
PASSWORD=your-password
```

Important:

* Do NOT commit `.env`
* Provide `.env.example` for evaluators

---

## 5. Installation

Clone the repository:

```bash
git clone <your-repo-link>
cd project-root
```

Install dependencies:

```bash
npm install
```

---

## 6. Running Tests

Run all tests:

```bash
npm test
```

Run a specific test file:

```bash
npx jest tests/auth.test.js
```

---

## 7. Authentication Handling

Authentication is handled dynamically via a reusable utility:

**utils/auth.js**

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

No tokens are hardcoded anywhere in the project.

---

## 8. Test Coverage

### Authentication Tests

* Valid login
* Invalid password
* Invalid email
* Empty fields
* Missing payload
* Invalid email format

### Profile Tests

* Retrieve profile (authorized)
* Invalid token access
* Unauthorized actions
* Update profile status
* Get user presence

### Users Tests

* Get current user
* Get users list
* Get user by ID
* Delete invalid user
* Unauthorized access
* Invalid updates
* Media preference validation
* Reset settings

---

## 9. Assertion Strategy

Each test validates:

* Status code
* Response structure (field presence)
* Data types
* Field values
* Error messages

---

## 10. Test Design Principles

* Independent tests (no dependency between tests)
* Repeatable execution
* Dynamic test data
* Clear and descriptive test names
* Proper separation of concerns (utils vs tests)

---

## 11. Continuous Integration (CI)

CI is configured using **GitHub Actions**.

### Location of CI File

```
.github/workflows/ci.yml
```

---

### CI Pipeline Behavior

The pipeline:

* Runs on every push and pull request
* Installs dependencies automatically
* Injects environment variables securely
* Executes all tests
* Fails if any test fails
* Uploads test reports as artifacts

---

### CI Workflow File (ci.yml)

Use your working version:

```yaml
name: API Automation Tests

on:
  push:
    branches: [ main, master, develop ]
  pull_request:
    branches: [ main, master ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Create .env file
        run: |
          echo "BASE_URL=${{ secrets.BASE_URL }}" >> .env
          echo "EMAIL=${{ secrets.EMAIL }}" >> .env
          echo "PASSWORD=${{ secrets.PASSWORD }}" >> .env

      - name: Run tests
        run: npm test

      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-reports
          path: test-results.xml
```

---

## 12. How to Verify CI Failure (Important)

To confirm your pipeline behaves correctly:

1. Intentionally break a test:

   ```js
   expect(1).toBe(2);
   ```

2. Push changes:

   ```bash
   git add .
   git commit -m "test failure check"
   git push
   ```

3. Confirm:

   * CI fails
   * Logs show the error

4. Revert the change after testing

---

## 13. Submission Checklist

* Minimum 25 test cases
* Includes negative and edge cases
* All tests passing
* No hardcoded tokens or credentials
* Proper project structure
* CI pipeline working
* README complete
* `.env` excluded from repository
