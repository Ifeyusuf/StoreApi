const express = require("express")
const app = express()

const connectDB = require("./db/connect")

require("dotenv").config()
require("express-async-errors")

const router = require("./routes/product")
const notFoundMiddleware = require("./middleware/notFound")
const errorHandlerMiddleware = require("./middleware/errorHandler")


// middleware
app.use(express.json())



app.get("/", (req, res) =>{
    res.send( ` <h1> StoreApi </h1> <a href="/api/v1/product">Products Route </a> ` )
} )

app.use("/api/v1/product", router)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


port = process.env.PORT || 3000

const start = async () => {
    
    try {
        connectDB(process.env.MONGO_URI)
        app.listen(port, ()=> console.log(` listening on port ${port}... `))
    } 
    catch (error) {
        console.log(error);
    }
}

start()