import request, { Request } from "supertest";
import app from "../../app";

it('returns a 201 on successful signup',async()=>{
    return request(app).post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "password123"
    })
    .expect(201); //assertion
})

it('returns a 400 with a invalid email',async()=>{
    return request(app).post("/api/users/signup")
    .send({
        email: "tesm",
        password: "123"
    })
    .expect(400); //assertion
})

it('returns a 400 with a invalid password',async()=>{
    return request(app).post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "124"
    })
    .expect(400); //assertion
})

it('returns a 400 with missing email and password',async()=>{
    await  request(app).post("/api/users/signup")
    .send({email:"test@test.com"})
    .expect(400);

    await request(app).post("/api/users/signup")
    .send({password:"1222"})
    .expect(400); //assertion
})

it('disallows duplicate emails',async()=>{
    await request(app).post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "password123"
    })
    .expect(201); //assertion

    await request(app).post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "password123"
    })
    .expect(400); //assertion
})

it('sets a cookie after success signup',async()=>{
    const response = await request(app).post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "password123"
    })
    .expect(201); //assertion

    expect(response.get('Set-Cookie')).toBeDefined();
})