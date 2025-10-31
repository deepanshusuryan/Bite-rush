import mongoose from "mongoose";

const db_password=process.env.DB_PASSWORD
const db_uri=`mongodb+srv://Deepanshu:${db_password}@bite-rush.ysbplq6.mongodb.net/?appName=bite-rush`

const databaseConnection=async()=>{
    try {
        await mongoose.connect(db_uri);
        console.log("Database Connected successfully");
    } catch (error) {
        console.log("Error while connecting Database",error)
    }
}
export default databaseConnection;