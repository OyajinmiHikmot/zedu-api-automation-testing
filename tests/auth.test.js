const axios = require("axios");
require("dotenv").config({ quiet: true });

describe("Authentication API Tests", () => {

    // POSITIVE TEST CASE
    test("Valid user login should return access token", async () => {
        const response = await axios.post(`${process.env.BASE_URL}/auth/login`, {
            email: process.env.EMAIL,
            password: process.env.PASSWORD
        });

        // Status code
        expect(response.status).toBe(200);

        // Field presence
        expect(response.data.status).toBeDefined();
        expect(response.data.message).toBeDefined();
        expect(response.data.data).toBeDefined();
        expect(response.data.data.access_token).toBeDefined();

        // Data type
        expect(typeof response.data.status).toBe("string");
        expect(typeof response.data.message).toBe("string");
        expect(typeof response.data.data.access_token).toBe("string");

        // Field values
        expect(response.data.status).toBe("success");
        expect(response.data.message.toLowerCase()).toContain("login");
    });


    // NEGATIVE TEST CASE - wrong password
    test("Login should fail with wrong password", async () => {
        try {
            await axios.post(`${process.env.BASE_URL}/auth/login`, {
                email: process.env.EMAIL,
                password: "wrongpassword"
            });
        } catch (err) {

            // Status code
            expect(err.response.status).toBe(400);

            // Field presence
            expect(err.response.data.status).toBeDefined();
            expect(err.response.data.message).toBeDefined();

            // Data type
            expect(typeof err.response.data.status).toBe("string");
            expect(typeof err.response.data.message).toBe("string");

            // Field values
            expect(err.response.data.status).toBe("error");

            // Error messages
            expect(err.response.data.message.length).toBeGreaterThan(0);
        }
    });


    // NEGATIVE TEST CASE - wrong email
    test("Login should fail with wrong email", async () => {
        try {
            await axios.post(`${process.env.BASE_URL}/auth/login`, {
                email: "wrong@mail.com",
                password: process.env.PASSWORD
            });
        } catch (err) {

            // Status code
            expect(err.response.status).toBe(400);

            // Field presence
            expect(err.response.data.message).toBeDefined();

            // Data type
            expect(typeof err.response.data.message).toBe("string");

            // Error messages
            expect(err.response.data.message.length).toBeGreaterThan(0);
        }
    });


    // EDGE TEST CASE - empty email
    test("Login should fail with empty email", async () => {
        try {
            await axios.post(`${process.env.BASE_URL}/auth/login`, {
                email: "",
                password: process.env.PASSWORD
            });
        } catch (err) {

            // Status code
            expect(err.response.status).toBe(400);

            // Field presence
            expect(err.response.data.message).toBeDefined();

            // Data type
            expect(typeof err.response.data.message).toBe("string");

            // Error messages
            expect(err.response.data.message.length).toBeGreaterThan(0);
        }
    });


    // EDGE TEST CASE - empty password
    test("Login should fail with empty password", async () => {
        try {
            await axios.post(`${process.env.BASE_URL}/auth/login`, {
                email: process.env.EMAIL,
                password: ""
            });
        } catch (err) {

            // Status code
            expect(err.response.status).toBe(400);

            // Field presence
            expect(err.response.data.message).toBeDefined();

            // Data type
            expect(typeof err.response.data.message).toBe("string");

            // Error messages
            expect(err.response.data.message.length).toBeGreaterThan(0);
        }
    });


    // EDGE TEST CASE - missing both email and password
    test("Login should fail with missing email and password", async () => {
        try {
            await axios.post(`${process.env.BASE_URL}/auth/login`, {});
        } catch (err) {

            // Status code
            expect(err.response.status).toBe(400);

            // Field presence
            expect(err.response.data.message).toBeDefined();

            // Data type
            expect(typeof err.response.data.message).toBe("string");

            // Error messages
            expect(err.response.data.message.length).toBeGreaterThan(0);
        }
    });


    // EDGE TEST CASE - invalid email format
    test("Login should fail with invalid email format", async () => {
        try {
            await axios.post(`${process.env.BASE_URL}/auth/login`, {
                email: "invalid-email-format",
                password: process.env.PASSWORD
            });
        } catch (err) {

            // Status code
            expect(err.response.status).toBe(400);

            // Field presence
            expect(err.response.data.message).toBeDefined();

            // Data type
            expect(typeof err.response.data.message).toBe("string");

            // Error messages
            expect(err.response.data.message.length).toBeGreaterThan(0);
        }
    });

});
