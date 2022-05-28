
const request = require('supertest')
const app = require("../app");
const mongoose = require("mongoose");

beforeAll((done) => {
  mongoose
  .connect("mongodb+srv://admin:admin@cluster0.gx5oq3x.mongodb.net/practical_test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log(`mongo connected`);
  }); 
  done();
},5000);

describe('Tasks', () => {

  describe('Post User', () => {
        it('should create a new user', async () => {
        const res = await request(app)
          .post('/device/v1/user/signup')
          .send({
            "name":"Mahima",
            "email":"mahima@gmail1.com",
            "password":"111"
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
      })
  });

  describe('Login User', () => {

    it('should get an existing user', async () => {
      const res = await request(app)
        .post('/device/v1/user/login')
        .send({
          "email":"mahima@gmail.com",
          "password":"111"
      })
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('data')
    })

  });

  describe('Logout User', () => {

    it('should get an existing user', async () => {
      const res = await request(app)
        .post('/device/v1/user/logout')
        .send({
          "email":"mahima@gmail.com"
      })
      expect(res.statusCode).toEqual(200)
    })

  });

  describe('Fetch News', () => {
    it('should get news', async () => {
      const res = await request(app)
        .get('/device/v1/news/news?search=india').send()
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('data')
    })
  });

  describe('Fetch Last 5 Days Weather Report', () => {
    it('should get weather report', async () => {
      const res = await request(app)
        .get('/device/v1/weather/weather?location=surat').send()
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('data')
    })
  });

});
