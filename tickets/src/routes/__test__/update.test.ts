import request from 'supertest';
import { Ticket } from '../../models/ticket';
import app from '../../app';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';

it('return 404 if user provided id does not exists  ',async()=>{
    const Id = new mongoose.Types.ObjectId().toHexString();
    await request(app).put(`/api/tickets/${Id}`)
    .set('Cookie', global.signin())
    .send({
        title: "new ticket",
        price: 20
    }).expect(404);
})

it('return a 401 if the user is not authenticated',async()=>{
    const Id = new mongoose.Types.ObjectId().toHexString();
    await request(app).put(`/api/tickets/${Id}`)
    .send({
        title: "new ticket",
        price: 20
    }).expect(401);
})

it('return 401 if user do not own the ticket',async()=>{
    const resp = await request(app).post(`/api/tickets`)
    .set('Cookie', global.signin())
    .send({
        title: "new ticket",
        price: 20
    }).expect(201);

    await request(app).put(`/api/tickets/${resp.body.id}`)
    .set('Cookie', global.signin())
    .send({
        title: "new ticket",
        price: 200
    }).expect(401);
})

it('return 400 if invalid values are provided',async()=>{
    const cookie = global.signin()
    const resp = await request(app).post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({
        title: "new ticket",
        price: 20
    }).expect(201);

    await request(app).put(`/api/tickets/${resp.body.id}`)
    .set('Cookie', cookie)
    .send({
        title: "new ticket",
        price: -200
    }).expect(400);
})

it('return 200 if update was successfull',async()=>{
    const cookie = global.signin()
    const resp = await request(app).post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({
        title: "ticket",
        price: 20
    }).expect(201);
    

    await request(app).put(`/api/tickets/${resp.body.id}`)
    .set('Cookie', cookie)
    .send({
        title: "new ticket",
        price: 200
    }).expect(200);

    const newData = await request(app)
    .get(`/api/tickets/${resp.body.id}`)
    .send();

    expect(newData.body.title).toEqual("new ticket");
    expect(newData.body.price).toEqual(200);
})

it('publishes an event',async()=>{
    const cookie = global.signin()
    const resp = await request(app).post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({
        title: "new ticket",
        price: 20
    }).expect(201);

    await request(app).put(`/api/tickets/${resp.body.id}`)
    .set('Cookie', cookie)
    .send({
        title: "new ticket",
        price: 200
    }).expect(200);
  
      expect(natsWrapper.client.publish).toHaveBeenCalled()
  })