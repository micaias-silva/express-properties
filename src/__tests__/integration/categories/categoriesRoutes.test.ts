import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import {mockedUser, mockedAdmin, mockedAdminLogin, mockedUserLogin, mockedCategory} from "../../mocks"


describe("/categories", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

        await request(app).post('/users').send(mockedUser)
        await request(app).post('/users').send(mockedAdmin)
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /categories -  Must be able to create category",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const response = await request(app).post('/categories').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedCategory)

        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("id")
        expect(response.status).toBe(201)
     
    })

    test("POST /categories -  should not be able to create category that already exists",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const response = await request(app).post('/categories').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedCategory)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
     
    })

    test("POST /categories -  should not be able to create category without authentication",async () => {
        const response = await request(app).post('/categories').send(mockedCategory)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("POST /categories -  should not be able to list users not being admin",async () => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        const response = await request(app).post('/categories').set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedCategory)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
             
    })

    test("GET /categories -  Must be able to list all categories",async () => {
      
        const response = await request(app).get('/categories')
        expect(response.body).toHaveLength(1)
        expect(response.status).toBe(200)
     
    })

    test("GET /categories/:id/properties -  Must be able to list one category properties",async () => {
      
        const category = await request(app).get('/categories')
        const response = await request(app).get(`/categories/${category.body[0].id}/properties`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("properties")
        
    })

    test("GET /categories/:id/properties -  Should not be able to list properties of a category with invalid id",async () => {
      
        const response = await request(app).get(`/categories/13970660-5dbe-423a-9a9d-5c23b37943cf/properties`)
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
        
    })

})