const UserModel = require("../api/models/User");
const request = require("supertest");
const expect = require("chai").expect;
const app = require("../server");
var token = "";

describe("api/v1/", () => {

  describe("base url", () => {
    it("Should return hello world", async () => {
      const req = await request(app).get("/");
      expect(req.status).to.equal(200);
      expect(req.body.message).to.equal("Hello World")
    })

    it("Should ping", async () => {
      const req = await request(app).get("/ping");
      expect(req.status).to.equal(200);
      expect(req.body.message).to.equal("Server is up")
    })
  })

  describe("auth/register", () => {
    it("Should not register a user without email", async () => {
      const user = {
        password: "123456",
        role: "user"
      }
      const req = await request(app).post("/api/v1/auth/register").send(user);
      expect(req.status).to.equal(400)
    })

    it("Should register a user", async () => {
      const user = {
        email: "test@test.com",
        password: "123456",
        role: "user"
      }
      const req = await request(app).post("/api/v1/auth/register").send(user);
      expect(req.status).to.equal(200)
      expect(req.body.success).to.equal(true)
    })

    it("Should not register a user with same email", async () => {
      const user = {
        email: "test@test.com",
        password: "123456",
        role: "user"
      }
      const req = await request(app).post("/api/v1/auth/register").send(user);
      expect(req.status).to.equal(400)
    })
  })

  describe("auth/login", () => {
    it("Should not login a newly created user without email or password", async () => {
      const user = {
        email: "test@test.com",
      }
      const req = await request(app).post("/api/v1/auth/login").send(user);
      expect(req.status).to.equal(400);
    })

    it("Should login a newly created user", async () => {
      const user = {
        email: "test@test.com",
        password: "123456",
      }
      const req = await request(app).post("/api/v1/auth/login").send(user);
      token = req.body.token;
      expect(req.status).to.equal(200);
      expect(req.body.success).to.equal(true);
    })

    it("Should not login a user with wrong password", async () => {
      const user = {
        email: "test@test.com",
        password: "123457",
      }
      const req = await request(app).post("/api/v1/auth/login").send(user);
      expect(req.status).to.equal(401);
    })

    it("Should not login a user with wrong email", async () => {
      const user = {
        email: "test1@test.com",
        password: "123456",
      }
      const req = await request(app).post("/api/v1/auth/login").send(user);
      expect(req.status).to.equal(401);
    })
  })

  describe("get logged user", async () => {
    it("should not return a user without token", async () => {
      const req = await request(app).get("/api/v1/users/me")
      expect(req.status).to.equal(401);
    })

    it("should return a user", async () => {
      const req = await request(app).get("/api/v1/users/me").set('Authorization', `Bearer ${token}`)
      expect(req.status).to.equal(200);
      expect(req.body.success).to.equal(true);
    })
  })

  describe("delete user", () => {
    it("Should delete testing user", async () => {
      await UserModel.deleteOne({email: "test@test.com"});
    })
  })
})