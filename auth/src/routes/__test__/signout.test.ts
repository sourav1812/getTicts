import request, { Request } from "supertest";
import app from "../../app";

it('returns a 201 on successful signout',async()=>{
    await request(app).post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "password123"
    })
    .expect(201); //assertion

    const response = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200); //assertion

    expect(response.get('Set-Cookie')[0]).toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
    
})