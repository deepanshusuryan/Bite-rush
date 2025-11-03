import mongoose from "mongoose";

const DB_PASSWORD=process.env.DB_PASSWORD;
const DB_USERNAME=process.env.DB_USERNAME;
const restaurant_db_uri=`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@bite-rush.ysbplq6.mongodb.net/restaurant?appName=bite-rush`
const user_db_uri=`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@bite-rush.ysbplq6.mongodb.net/users?appName=bite-rush`
const delivery_db_uri=`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@bite-rush.ysbplq6.mongodb.net/delivery?appName=bite-rush`

export const restaurantDbConnection=async()=>{
    try {
        await mongoose.connect(restaurant_db_uri,{useNewUrlParser:true});
        console.log("Database Connected successfully");
    } catch (error) {
        console.log("Error while connecting Database",error)
    }
}

export const userDbConnection=async()=>{
    try {
        await mongoose.connect(user_db_uri,{useNewUrlParser:true});
        console.log("Database Connected successfully");
    } catch (error) {
        console.log("Error while connecting Database",error)
    }
}
export const deliveryDbConnection=async()=>{
    try {
        await mongoose.connect(delivery_db_uri,{useNewUrlParser:true});
        console.log("Database Connected successfully");
    } catch (error) {
        console.log("Error while connecting Database",error)
    }
}
