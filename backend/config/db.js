import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()


const connectDB = async () => {
    try {
         await mongoose.connect(process.env.dbURL, {
            serverSelectionTimeoutMS: 5000,
            dbName: "aezakmi",
            writeConcern: { w: 'majority' }
        })
        console.log("Mongodb connected")
    } catch (error) {
        console.log(error)
    }
}

export default connectDB