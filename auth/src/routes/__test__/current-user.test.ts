import request from "supertest";
import app from "../../app";

it('returns a details about the current user',async()=>{
    const cookie = await signin();

    const response = await request(app)
    .get("/api/users/currentUser")
    .set("Cookie",cookie)
    .send()
    .expect(200); //assertion

    expect(response.body.currentUser.email).toEqual("test@test.com")    
})

it('return null  if not authenticated',async()=>{
    const response = await request(app)
    .get("/api/users/currentUser")
    .send()
    .expect(200); //assertion

    console.log("response",response.body);

    expect(response.body.currentUser).toEqual(null)    
})