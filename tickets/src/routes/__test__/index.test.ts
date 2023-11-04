import request from 'supertest'
import app from '../../app'
import { Ticket } from '../../models/ticket';

const createTickets = ()=>{
    return request(app).post('/api/tickets')
    .set('Cookie',global.signin())
    .send({
        title: "new ticket",
        price: 20
    });
}

it('can fetch a list of tickets',async()=>{
    const num = 10;
    for(let i =0; i<num ;i++ ){
        await createTickets();
    }

    const resp:any  = await request(app).get('/api/tickets').send();    

    expect(resp._body.length).toEqual(num);
    expect(resp._body[0].title).toEqual("new ticket");
})