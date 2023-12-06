import request from 'supertest'
import app from '../../app'
import { Ticket } from '../../models/ticket';
import { OrderStatus } from '@ss_microservice_auth_service/common';

it('delete order',async()=>{
    const ticket = Ticket.build({
        title: "concert",
        price: 20
    })
    await ticket.save();    

    const user = global.signin();
    const resp = await request(app)
    .post('/api/orders')
    .set('Cookie',user)
    .send({ticketId: ticket.id})
    .expect(201)

    //make a request to fetch a order
    await request(app)
    .delete(`/api/order/${resp.body.id}`)
    .set('Cookie',user)
    .expect(204)

    const {body: myOrder} =  await request(app)
    .get(`/api/order/${resp.body.id}`)
    .set('Cookie',user)
    .expect(200)

    expect(myOrder.status).toEqual(OrderStatus.Cancelled)
})

it.todo('emits a order cancelled events')