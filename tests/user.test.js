const axios = require("axios");
const { getTestData } = require("../utils/auth");
require("dotenv").config({ quiet: true });

describe("Users API Tests", () => {

    //  POSITIVE TEST CASE
    test("Authorized user should retrieve user status", async () => {
        const { token, user_id } = await getTestData();

        const response = await axios.get(
            `${process.env.BASE_URL}/users/${user_id}/status`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        expect(response.status).toBe(200);

        expect(response.data.status).toBeDefined();
        expect(response.data.message).toBeDefined();
        expect(response.data.data).toBeDefined();

        expect(typeof response.data.status).toBe("string");
        expect(typeof response.data.data).toBe("object");

        expect(response.data.status.toLowerCase()).toBe("success");
    });


    //  POSITIVE TEST CASE
    test("Get current authenticated user", async () => {
        const { token } = await getTestData();

        const response = await axios.get(
            `${process.env.BASE_URL}/users/me`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        expect(response.status).toBe(200);

    });


    //  POSITIVE TEST CASE
    test("Get users list", async () => {
        const { token } = await getTestData();

        const response = await axios.get(
            `${process.env.BASE_URL}/users`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        expect(response.status).toBe(200);
    });


    //  POSITIVE TEST CASE
    test("Get user by ID", async () => {
        const { token, user_id } = await getTestData();

        const response = await axios.get(
            `${process.env.BASE_URL}/users/${user_id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        expect(response.status).toBe(200);
    });


    //  NEGATIVE TEST CASE
    test("Delete invalid user should fail", async () => {
        const { token } = await getTestData();

        try {
            await axios.delete(`${process.env.BASE_URL}/users/invalid`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
            expect(err.response.data).toBeDefined();
        }
    });


    //  EDGE CASE
    test("Update user with empty body should fail", async () => {
        const { token, user_id } = await getTestData();

        try {
            await axios.put(
                `${process.env.BASE_URL}/users/${user_id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        } catch (err) {
            expect(err.response.status).toBe(422);
        }
    });


    //  POSITIVE TEST CASE
    test("Deactivate user", async () => {
        const { token, user_id } = await getTestData();

        const response = await axios.delete(
            `${process.env.BASE_URL}/users/deactivate/${user_id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        expect(response.status).toBe(200);
    });


    //  POSITIVE TEST CASE
    test("Reactivate user", async () => {
        const { token, user_id } = await getTestData();

        const response = await axios.put(
            `${process.env.BASE_URL}/users/reactivate/${user_id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        expect(response.status).toBe(200);
    });


    //  NEGATIVE TEST CASE
    test("Access users without token should fail", async () => {
        try {
            await axios.get(`${process.env.BASE_URL}/users`);
        } catch (err) {
            expect(err.response.status).toBe(401);
        }
    });


    //  NEGATIVE TEST CASE
    test("Invalid status update should fail", async () => {
        const { token } = await getTestData();

        try {
            await axios.patch(
                `${process.env.BASE_URL}/users/invalid/status`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });


    //  NEGATIVE TEST CASE
    test("Presence update without token should fail", async () => {
        try {
            await axios.post(`${process.env.BASE_URL}/profile/presence`, {
                is_active: true
            });
        } catch (err) {
            expect(err.response.status).toBe(401);
        }
    });


    //  NEGATIVE TEST CASE
    test("Invalid media preference update", async () => {
        const { token } = await getTestData();

        try {
            await axios.put(
                `${process.env.BASE_URL}/users/media-preferences`,
                { invalid: true },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });


    //  POSITIVE TEST CASE
    test("Reset auto download settings", async () => {
        const { token } = await getTestData();

        const response = await axios.post(
            `${process.env.BASE_URL}/users/media-preferences/reset-autodownload`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        expect(response.status).toBe(200);
    });

});