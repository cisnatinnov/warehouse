const app = require('../app')
const request = require("supertest");

describe("Check Email", () => {
  test("success check email", async () => {
    let email = {
      email: "coba@gmail.com"
    }
    let response = await request(app).post("/api/v1/checkemail").send(email);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.message).toStrictEqual('Email registered');
  })

  test("failed check email (not valid)", async () => {
    let email = {
      email: "coba"
    }
    let response = await request(app).post("/api/v1/checkemail").send(email);

    expect(response.status).toBe(401);
    expect(response.body.status).toBe(401);
    expect(response.body.message).toStrictEqual(`${email.email} is not valid`);
  })

  // test("failed check email (error)", async () => {
  //   let email = {
  //     emai: "coba@gmail.com"
  //   }
  //   let response = await request(app).post("/api/v1/checkemail").send(email);

  //   expect(response.status).toBe(500);
  //   expect(response.body.status).toBe(500);
  //   expect(response.body.message).toStrictEqual(`Internal server error`);
  // })
})


describe("Check Password", () => {
  test("success check password", async () => {
    let email = {
      email: "coba@gmail.com",
      password: "Coba123!!"
    }
    let response = await request(app).post("/api/v1/checkpassword").send(email);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.message).toStrictEqual('Login successfully');
  })

  test("failed check password (email not valid)", async () => {
    let email = {
      email: "coba",
      password: "Coba123!!"
    }
    let response = await request(app).post("/api/v1/checkpassword").send(email);

    expect(response.status).toBe(401);
    expect(response.body.status).toBe(401);
    expect(response.body.message).toStrictEqual(`${email.email} is not valid`);
  })

  test("failed check password (password not valid)", async () => {
    let email = {
      email: "coba@gmail.com",
      password: "coba123!!"
    }
    let response = await request(app).post("/api/v1/checkpassword").send(email);

    expect(response.status).toBe(401);
    expect(response.body.status).toBe(401);
    expect(response.body.message).toStrictEqual(`Please use minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number and 1 special character!`);
  })

  // test("failed check password (error)", async () => {
  //   let email = {
  //     email: "coba@gmail.com",
  //     password: "Coba123!!"
  //   }
  //   let response = await request(app).post("/api/v1/checkpassword").send(email);

  //   expect(response.status).toBe(500);
  //   expect(response.body.status).toBe(500);
  //   expect(response.body.message).toStrictEqual(`Internal server error`);
  // })
})