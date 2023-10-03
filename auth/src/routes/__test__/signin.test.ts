import request, { Request } from "supertest";
import app from "../../app";

it('returns a 201 on successful signin',async()=>{
    await request(app).post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "password123"
    })
    .expect(201); //assertion

    await request(app).post("/api/users/signin")
    .send({
        email: "test@test.com",
        password: "password123"
    })
    .expect(201); //assertion
})

it('User does not exists',async()=>{
    await request(app).post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "password123"
    })
    .expect(201); //assertion

    await request(app).post("/api/users/signin")
    .send({
        email: "test@test1.com",
        password: "password123"
    })
    .expect(400); //assertion
})

it('Invalid password or email',async()=>{
    return request(app).post("/api/users/signin")
    .send({
        email: "test@test.com",
        password: ""
    })
    .expect(400); //assertion
})

it('sets a cookie after success signin',async()=>{
    await request(app).post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "password123"
    })
    .expect(201); //assertion

    const response = await request(app).post("/api/users/signin")
    .send({
        email: "test@test.com",
        password: "password123"
    })
    .expect(201); //assertion

    expect(response.get('Set-Cookie')).toBeDefined();
})