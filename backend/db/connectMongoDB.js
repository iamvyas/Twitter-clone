import mongoose from 'mongoose';

const connectMongoDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('mongo db connected');
    } catch(error)
    {
        console.error('error connection to mongo db: ${error.message} ');
        process.exit(1);
    }
}

export default connectMongoDB;