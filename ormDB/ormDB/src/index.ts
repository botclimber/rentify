const date = require("date-and-time")
import { AppDataSource } from "./data-source"
import { Reviews } from "./entities/Reviews"
import { Addresses } from "./entities/Addresses"
import { ResidenceAddresses } from "./entities/ResidenceAddresses"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new Review into the database...")
    const addr = new Addresses()
    addr.city = "Braga"
    addr.country  = "Portugal"
    addr.street = "Rua do Louseiro"
    addr.lat = 1
    addr.lng = 1
    addr.nr = 162
    addr.postalCode = "4760-485"

    const resAddr = new ResidenceAddresses()
    resAddr.addresses = addr
    resAddr.direction = "Right"
    resAddr.floor = "3"

    const review = new Reviews()
    review.adminId = 1
    review.anonymous = 0
    review.approved = 0
    review.rating = 1
    review.userId = 1
    review.residenceAddresses = resAddr
    review.review = "Teste de teste"

    await AppDataSource.manager.save(addr)
    await AppDataSource.manager.save(resAddr)
    await AppDataSource.manager.save(review)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(Reviews)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
