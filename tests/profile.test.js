const axios = require("axios");
const { getTestData } = require("../utils/auth");
require("dotenv").config({ quiet: true });

describe("Profile API Tests", () => {

    //  POSITIVE TEST CASE
    test("Authorized user should retrieve profile", async () => {
        const { token } = await getTestData();

        const response = await axios.get(`${process.env.BASE_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Status code
        expect(response.status).toBe(200);

        // Field presence
        expect(response.data.status).toBeDefined();
        expect(response.data.message).toBeDefined();
        expect(response.data.data).toBeDefined();

        // Data structure
        expect(typeof response.data.status).toBe("string");
        expect(typeof response.data.message).toBe("string");
        expect(typeof response.data.data).toBe("object");

        // Field values
        expect(response.data.status.toLowerCase()).toBe("success");
    });


    //  NEGATIVE TEST CASE
    test("Should fail with invalid token", async () => {
        try {
            await axios.get(`${process.env.BASE_URL}/profile`, {
                headers: { Authorization: "Bearer invalid" }
            });
        } catch (err) {
            // Status code
            expect(err.response.status).toBe(401);

            // Error structure
            expect(err.response.data).toBeDefined();
        }
    });


    //  NEGATIVE TEST CASE
    test("Get profile with invalid user ID", async () => {
        const { token } = await getTestData();

        try {
            await axios.get(`${process.env.BASE_URL}/profile/invalid-id`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (err) {
            // Status code
            expect(err.response.status).toBe(400);

            // Error response validation
            expect(err.response.data).toBeDefined();
        }
    });


    //  NEGATIVE TEST CASE
    test("Delete profile image without token should fail", async () => {
        try {
            await axios.delete(`${process.env.BASE_URL}/profile/image`);
        } catch (err) {
            // Status code
            expect(err.response.status).toBe(401);

            // Error structure
            expect(err.response.data).toBeDefined();
        }
    });


    //  POSITIVE TEST CASE
    test("Update profile status", async () => {
        const { token } = await getTestData();

        const response = await axios.post(
            `${process.env.BASE_URL}/profile/change-status`,
            {
                icon: "",
                text: "Busy",
                pause_notification: false,
                status_timeout: "20 minutes",
                clear_status: false,
                online: true
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        // Status code
        expect(response.status).toBe(200);

        // Field presence
        expect(response.data.status).toBeDefined();
        expect(response.data.message).toBeDefined();

        // Data type
        expect(typeof response.data.status).toBe("string");
        expect(typeof response.data.message).toBe("string");

        // Field values
        expect(response.data.status.toLowerCase()).toBe("success");
    });


    //  POSITIVE TEST CASE
    test("Get user presence", async () => {
        const { token } = await getTestData();

        const response = await axios.get(`${process.env.BASE_URL}/profile/presence`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Status code
        expect(response.status).toBe(200);

        // Field presence
        expect(response.data.status).toBeDefined();
        expect(response.data.message).toBeDefined();
        expect(response.data.data).toBeDefined();

        // Data type
        expect(typeof response.data.data).toBe("object");

        // Field values
        expect(response.data.status.toLowerCase()).toBe("success");
    });

});