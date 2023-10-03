import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from "supertest";
import app from '../app';

let mongo: any;

declare global {
    var signin: () => Promise<string[]>;
}

beforeAll(async()=>{

    process.env.JWT_KEY = 'hdsaskdj'

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
})

beforeEach(async()=>{
    const collections = await mongoose.connection.db.collections();
    for(let col of collections){
        await col.deleteMany({})
    }
})

afterAll(async () => {
    if (mongo) {
      await mongo.stop();
    }
    await mongoose.connection.close();
  })

global.signin = async ()=>{
    const email = "test@test.com"
    const password = "1234"

    const resp = await request(app).post('/api/users/signup')
    .send({
        email,
        password
    })
    expect(201);

    const cookie = resp.get('Set-Cookie');

    return cookie;
}