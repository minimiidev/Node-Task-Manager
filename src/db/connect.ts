import mongoose from "mongoose"


export const connectDB = async (url: string) => {

    try {
        await mongoose.connect(url, {
            family: 4,
        });

        console.log("Connected to DB!")
        return true;

    } catch (error) {
        console.log('Mongo connection error');
        throw error;
    }
}


