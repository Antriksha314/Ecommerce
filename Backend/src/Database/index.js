import { connect } from 'mongoose';

export const ConnectToDatabase = async () => {
    try {
        const db = await connect(process.env.MONGO_URI)

        console.log(`MongoDB connected: ${db.connection.host}`)

    } catch (error) {

        console.log("Error while connecting database", error)
    }

}