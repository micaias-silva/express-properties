import { IUserLogin,IUserRequest } from "../../interfaces/users";
import { IScheduleRequest } from "../../interfaces/schedules";
import { IPropertyRequest } from "../../interfaces/properties";
import { ICategoryRequest } from "../../interfaces/categories";

export const mockedUser : IUserRequest = {
    name: "Joana",
    email: "joana@mail.com",
    isAdm: false,
    password: "123456"
}

export const mockedAdmin : IUserRequest = {
    name: "Felipe",
    email: "felipe@mail.com",
    isAdm: true,
    password: "123456"
}

export const mockedUserLogin : IUserLogin = {
    email: "joana@mail.com",
    password: "123456"
}

export const mockedAdminLogin : IUserLogin = {
    email: "felipe@mail.com",
    password: "123456"
}

export const mockedCategory : ICategoryRequest = {
    name: "Apartamento"
}

export const mockedProperty : IPropertyRequest = {
    size: 350,
    value: 10000000,
    address: {
        district: "Rua Heleodo Pires de camargo",
        zipCode: "18150000",
        number: "67",
        city: "Piedade",
        state: "SP"
    },
    categoryId: ""
}

export const mockedPropertyInvalidZipCode : IPropertyRequest = {
    size: 350,
    value: 10000000,
    address: {
        district: "Rua Heleodo Pires de camargo",
        zipCode: "1815000033",
        number: "67",
        city: "Piedade",
        state: "SP"
    },
    categoryId: ""
}

export const mockedPropertyInvalidState : IPropertyRequest = {
    size: 350,
    value: 10000000,
    address: {
        district: "Rua Heleodo Pires de camargo",
        zipCode: "18150000",
        number: "67",
        city: "Piedade",
        state: "SPGO"
    },
    categoryId: ""
}

export const mockedPropertyInvalidCategoryId : IPropertyRequest = {
    size: 350,
    value: 10000000,
    address: {
        district: "Rua Heleodo Pires de camargo",
        zipCode: "18150000",
        number: "68",
        city: "Piedade",
        state: "SP"
    },
    categoryId: "8f9ae6ce-e36c-4d9d-9bd7-b4c98cb4e4f4"
}

export const mockedSchedule : IScheduleRequest = {
    date: "2022/08/12",
    hour: "10:30",
    propertyId: "",
    userId: ""
}

export const mockedScheduleInvalidPropertyId : IScheduleRequest = {
    date: "2022/08/12",
    hour: "10:30",
    propertyId: "b855d86b-d4c9-41cd-ab98-d7fa734c6ce4",
    userId: ""
}


export const mockedScheduleInvalidDate : IScheduleRequest = {
    date: "2022/08/20",
    hour: "10:30",
    propertyId: "",
    userId: ""
}

export const mockedScheduleInvalidHourLess8 : IScheduleRequest = {
    date: "2022/08/17",
    hour: "5:30",
    propertyId: "",
    userId: ""
}

export const mockedScheduleInvalidHourMore18 : IScheduleRequest = {
    date: "2022/08/17",
    hour: "18:30",
    propertyId: "",
    userId: ""
}