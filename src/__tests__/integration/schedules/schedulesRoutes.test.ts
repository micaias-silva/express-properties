import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import {mockedUser, mockedAdmin, mockedAdminLogin, mockedCategory, mockedProperty, mockedUserLogin, mockedSchedule, mockedScheduleInvalidPropertyId, mockedScheduleInvalidDate, mockedScheduleInvalidHourLess8, mockedScheduleInvalidHourMore18} from "../../mocks"


describe("/schedules", () => {
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
        const categories = await request(app).post('/categories').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedCategory)
        mockedProperty.categoryId = categories.body.id
        await request(app).post('/properties').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedProperty)
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /schedules -  should be able to create a schedule",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const users = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        const properties = await request(app).get('/properties')
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        mockedSchedule.propertyId = properties.body[0].id
        mockedSchedule.userId = users.body[1].id
        const response = await request(app).post('/schedules').set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedSchedule)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(201)
    })

    test("POST /schedules -  should not be able to create a schedule that already exists",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const users = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        const properties = await request(app).get('/properties')
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        mockedSchedule.propertyId = properties.body[0].id
        mockedSchedule.userId = users.body[1].id
        const response = await request(app).post('/schedules').set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedSchedule)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    test("POST /schedules -  should not be able to create a schedule with an invalid date",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const users = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        const properties = await request(app).get('/properties')
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        mockedScheduleInvalidDate.propertyId = properties.body[0].id
        mockedScheduleInvalidDate.userId = users.body[1].id
        const response = await request(app).post('/schedules').set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedScheduleInvalidDate)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    test("POST /schedules -  should not be able to create a schedule with an invalid hour < 8",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const users = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        const properties = await request(app).get('/properties')
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        mockedScheduleInvalidHourLess8.propertyId = properties.body[0].id
        mockedScheduleInvalidHourLess8.userId = users.body[1].id
        const response = await request(app).post('/schedules').set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedScheduleInvalidHourLess8)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    test("POST /schedules -  should not be able to create a schedule with an invalid hour > 18",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const users = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        const properties = await request(app).get('/properties')
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        mockedScheduleInvalidHourMore18.propertyId = properties.body[0].id
        mockedScheduleInvalidHourMore18.userId = users.body[1].id
        const response = await request(app).post('/schedules').set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedScheduleInvalidHourMore18)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    test("POST /schedules -  should not be able to create a schedule with an invalid property id",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const users = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        mockedScheduleInvalidPropertyId.userId = users.body[1].id
        const response = await request(app).post('/schedules').set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedScheduleInvalidPropertyId)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
    })


    test("POST /schedules -  should not be able to create a schedule without authentication",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const users = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        const properties = await request(app).get('/properties')
        mockedSchedule.propertyId = properties.body[0].id
        mockedSchedule.userId = users.body[1].id
        const response = await request(app).post('/schedules').send(mockedSchedule)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("GET /schedules/properties/:id -  must be able to list the schedules of a property",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const properties = await request(app).get('/properties')
        const response = await request(app).get(`/schedules/properties/${properties.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("schedules")
        expect(response.body.schedules[0]).toHaveProperty("id")
        expect(response.body.schedules[0]).toHaveProperty("date")
        expect(response.body.schedules[0]).toHaveProperty("hour")
        expect(response.body.schedules[0]).toHaveProperty("user")
        expect(response.body.schedules).toHaveLength(1)
        expect(response.status).toBe(200)
    })

    test("GET /schedules/properties/:id -  should not be able to list the schedules of a property with invalid id",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const response = await request(app).get(`/schedules/properties/b855d86b-d4c9-41cd-ab98-d7fa734c6ce4`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
    })

    test("GET /schedules/properties/:id -  should not be able to list the schedules of a property without authentication",async () => {
        const properties = await request(app).get('/properties')
        const response = await request(app).get(`/schedules/properties/${properties.body[0].id}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("GET /schedules/properties/:id -  should not be able to list the schedules of a property that the user is not admin",async () => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        const properties = await request(app).get('/properties')
        const response = await request(app).get(`/schedules/properties/${properties.body[0].id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
    })

})