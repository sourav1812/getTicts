import request from 'supertest'
import app from '../../app'
import { Ticket } from '../../models/ticket';

it('fetches the order',async()=>{
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
    const {body: order} = await request(app)
    .get(`/api/order/${resp.body.id}`)
    .set('Cookie',user)
    .expect(200)

    expect(order.id).toEqual(resp.body.id)
})

it('return error if one user try to fetch another user\'s order',async()=>{
    const ticket = Ticket.build({
        title: "concert",
        price: 20
    })
    await ticket.save();    

    const user = global.signin();
    const user2 = global.signin();
    const resp = await request(app)
    .post('/api/orders')
    .set('Cookie',user)
    .send({ticketId: ticket.id})
    .expect(201)

    //make a request to fetch a order
    await request(app)
    .get(`/api/order/${resp.body.id}`)
    .set('Cookie',user2)
    .expect(401)
})
