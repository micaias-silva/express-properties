import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import {mockedUser, mockedAdmin, mockedAdminLogin, mockedCategory, mockedProperty, mockedPropertyInvalidCategoryId, mockedPropertyInvalidState, mockedPropertyInvalidZipCode, mockedUserLogin} from "../../mocks"


describe("/properties", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

        await request(app).post('/users').send(mockedUser)
        await request(app).post('/users').send(mockedAdmin)
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        await request(app).post('/categories').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedCategory)
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /properties -  Must be able to create a property",async () => {
      
        const categories = await request(app).get('/categories')
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        mockedProperty.categoryId = categories.body[0].id
        const response = await request(app).post('/properties').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedProperty)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("value")
        expect(response.body).toHaveProperty("size")
        expect(response.body).toHaveProperty("category")
        expect(response.body).toHaveProperty("sold")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.body).toHaveProperty("address")
        expect(response.body.address).toHaveProperty("id")
        expect(response.body.address).toHaveProperty("district")
        expect(response.body.address).toHaveProperty("zipCode")
        expect(response.body.address).toHaveProperty("number")
        expect(response.body.address).toHaveProperty("city")
        expect(response.body.address).toHaveProperty("state")
        expect(response.status).toBe(201)
     
    })

    test("POST /properties -  should not be able to create property that already exists",async () => {
      
        const categories = await request(app).get('/categories')
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        mockedProperty.categoryId = categories.body[0].id
        const response = await request(app).post('/properties').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedProperty)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
     
    })

    test("POST /properties -  should not be able to create property not being admin",async () => {
        const categories = await request(app).get('/categories')
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        mockedProperty.categoryId = categories.body[0].id
        const response = await request(app).post('/properties').set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedProperty)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
     
    })

    test("POST /properties -  should not be able to create property without authentication",async () => {
        const categories = await request(app).get('/categories')
        mockedProperty.categoryId = categories.body[0].id
        const response = await request(app).post('/properties').send(mockedProperty)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
     
    })

    test("POST /properties -  should not be able to create property with invalid categoryId",async () => { 
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const response = await request(app).post('/properties').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedPropertyInvalidCategoryId)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
     
    })

    test("POST /properties -  must not be able to create a property with invalid zipCode",async () => {
        const categories = await request(app).get('/categories')
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        mockedPropertyInvalidZipCode.categoryId = categories.body[0].id
        const response = await request(app).post('/properties').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedPropertyInvalidZipCode)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
     
    })


    test("POST /properties -  must not be able to create a property with invalid state",async () => {
        const categories = await request(app).get('/categories')
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        mockedPropertyInvalidState.categoryId = categories.body[0].id
        const response = await request(app).post('/properties').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedPropertyInvalidState)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
     
    })

    test("GET /properties -  Must be able to list all properties",async () => {
        const response = await request(app).get('/properties')
        expect(response.body).toHaveLength(1)
        expect(response.status).toBe(200)
     
    })

})