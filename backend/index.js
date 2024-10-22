import express from "express"
import cors from "cors"
import bodyParser from "body-parser"

// app config
const app = express()
const port = 5000

// middleware....
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    methods: ['PUT', "POST", "DELETE", "GET"],
    credentials: true
}))
app.use("/images", express.static("uploads"))

// routing....



// error handler....


// listening port...
app.listen(port, () => {
    console.log("App running in port", port)
})