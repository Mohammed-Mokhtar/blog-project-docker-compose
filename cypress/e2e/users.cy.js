// const API_URL = "http://localhost:3000";
// const notFoundUserId = "69c3abb4dd8288e675f68c4b";

describe("get users Api", () => {
  it("should get all users", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/users",
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.eq("success");
    });
  });
});

describe("add post API", () => {
  it("should add user", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/users",
      body: {
        name: "test1",
        email: `test${Date.now()}@example.com`,
        password: "password123",
      },
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.message).to.eq("success");
    });
  });
});

