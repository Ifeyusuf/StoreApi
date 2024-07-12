
const connectDB = require("./db/connect")
const Product = require("./model/product")
const productsJson = require("./product.json")
require("dotenv").config()


const start = async () => {
    
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(productsJson)
        console.log("Success!!!");
        process.exit()
    } 
    catch (error) {
        console.log(error);
        process.exit(1)
    }
}

start()