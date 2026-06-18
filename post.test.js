import request from "supertest";
import app, { server } from "./index.js";
import mongoose from "mongoose";

describe("get all posts api", () => {
  it("should get all posts", async () => {
    const res = await request(app).get("/posts");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("success");
  });
});

describe("add post api", () => {
  it("should add post", async () => {
    const res = await request(app).post("/posts").send({
      title: "test post",
      content: "post content",
    });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("success");
  });
});

describe("update post api", () => {
  // it("should update the post", async () => {
  //   const res = await request(app)
  //     .put("/posts/69c3c91b54ad16fb871cb29f")
  //     .send({ title: "updated title", content: "updated content" });
  //   expect(res.status).toBe(200);
  //   expect(res.body.message).toBe("success");
  // });

  it("should success when the post is not found", async () => {
    const res = await request(app)
      .put("/posts/69c3c6b74adf51548f6b6807")
      .send({ title: "updated title", content: "updated content" });
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("post not found");
  });
});

describe("delete post api", () => {
  // it("should delete the post when found", async () => {
  //   const res = await request(app).delete("/posts/69c3c91b54ad16fb871cb29f");
  //   expect(res.status).toBe(200);
  //   expect(res.body.message).toBe("success");
  // });

  it("should success when the post is not found", async () => {
    const res = await request(app).delete("/posts/69c3c8425523fc7f62ead517");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("post not found");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

