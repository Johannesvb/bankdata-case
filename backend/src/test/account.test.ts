import request from "supertest";
import app from "../index";

describe("Account API create account", () => {
    it("should create an account", async () => {
        const res = await request(app)
            .post("/accounts/create")
            .send({ owner: "Test User", initialBalance: 1000 });

        // Test User should have been created with expected values
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("id");
        expect(res.body.owner).toBe("Test User");
        expect(res.body.balance).toBe(1000);
    });

    it("should fail if data is missing", async () => {
        const res = await request(app)
            .post("/accounts/create")
            .send({ owner: "" }); // no initialBalance

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty("error");
    });
});
