import request from "supertest";
import app, { server } from "./index.js";
import mongoose from "mongoose";

describe("get all users api", () => {
  it("should get all users", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("success");
  });
});

describe("add user api", () => {
  it("should add user", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        name: "test1",
        email: `test1${Date.now()}@example.com`,
        password: "password123",
      });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("success");
  });

  it("should success if user already exists", async () => {
    await request(app).post("/users").send({
      name: "test2",
      email: "test2@example.com",
      password: "password123",
    });

    const res = await request(app).post("/users").send({
      name: "test2",
      email: "test2@example.com",
      password: "password123",
    });
    expect(res.status).toBe(409);
    expect(res.body.message).toBe("User already exists");
  });
});

describe("update user api", () => {
  // it("should update the user", async () => {
  //   const res = await request(app)
  //     .put("/users/69c3c84323dbff7d6b76b05b")
  //     .send({ name: "mohamed" });
  //   expect(res.status).toBe(200);
  //   expect(res.body.message).toBe("success");
  // });

  it("should success when the user is not found", async () => {
    const res = await request(app)
      .put("/users/69c3abb4dd8288e675f68c4b")
      .send({ name: "mohamed" });
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("User not found");
  });
});

describe("delete user api", () => {
  // it("should delete the user when found", async () => {
  //   const res = await request(app).delete("/users/69c3c84323dbff7d6b76b05b");
  //   expect(res.status).toBe(200);
  //   expect(res.body.message).toBe("success");
  // });

  it("should success when the user is not found", async () => {
    const res = await request(app).delete("/users/69c3abb4dd8288e675f68c4b");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("User not found");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});
