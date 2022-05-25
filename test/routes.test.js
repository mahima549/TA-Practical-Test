const request = require('supertest')
const app = require('../server')
var mongoose = require("mongoose");

beforeAll(done => {
    mongoose.connect(process.env.mongouri, {
    useNewUrlParser: true, 
    useCreateIndex: true 
})
    done()
  })
describe('Tasks', () => {
describe('Post User', () => {
        it('should create a new user', async () => {
        const res = await request(app)
          .post('/user/signup')
          .send({
            "name":"Mahima",
            "email":"ab111c@gmail1.com",
            "password":"111"
        })
        console.log("res 1",res)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
      })
})
describe('Login User', () => {

    it('should get an existing user', async () => {
      const res = await request(app)
        .post('/user/login')
        .send({
          "email":"abc@gmail.com",
          "password":"111"
      })
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('data')
    })

  })

describe('Logout User', () => {

    it('should get an existing user', async () => {
      const res = await request(app)
        .post('/user/logout')
        .send({
          "email":"abc@gmail.com"
      })
      expect(res.statusCode).toEqual(200)
    })

  })

  describe('Fetch News', () => {
    it('should get news', async () => {
      const res = await request(app)
        .get('/news/news?search=india').send()
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('data')
    })
})
describe('Fetch Last 5 Days Weather Report', () => {

    it('should get weather report', async () => {
      const res = await request(app)
        .get('/weather/weather?location=surat')
        .send()
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('data')
    })
})

})