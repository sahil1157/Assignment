import express, { Router } from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import errorMiddlware from "./middleware/error-handler.js"
import  {jobRouting} from "./router/route.js"

// app config
const app = express()
app.use(bodyParser.json());
dotenv.config()
connectDB()
const port = process.env.PORT || 5000;


// middleware....
app.use(express.json())
app.use(cors({
    origin: "https://assignment-careerspage.netlify.app/",
    methods: ['PUT', "POST", "DELETE", "GET"],
    credentials: true
}))
app.use("/images", express.static("uploads"))

// routing....
app.use("/api", jobRouting)

// error handler/middleware....
app.use(errorMiddlware);

// listening port...
app.listen(port, () => {
    console.log("App running in port", port)
})