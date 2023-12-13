const request = require("supertest")
const app = require("../app.js");
const db = require("../db/connection")
const seed = require("../db/seed.js")

describe("GET /api/venders", () => { 
    it("responds with an array containing data for all vending machines", () => { 
        return request(app)
        .get('/api/venders')
        .expect(200)
            .then(({ body }) => {
                expect(body.vendingMachines.length).toBe(4)
                body.vendingMachines.forEach((vendingMachine) => { 
                    expect(typeof vendingMachine.id).toBe("number") 
                    expect(typeof vendingMachine.location).toBe("string") 
                    expect(typeof vendingMachine.rating).toBe("number")  
                })
         })
    })
});

describe("GET /api/venders/:venderId", () => { 
    it("responds with an object containing the correct vending machine data", () => {
        return request(app)
        .get('/api/venders/3')
        .expect(200)
        .then(({ body }) => {
            expect(body.vendingMachine.id).toBe(3)
            expect(body.vendingMachine.location).toBe('Vending Machine C')
            expect(body.vendingMachine.rating).toBe(4)
        })
    })
})