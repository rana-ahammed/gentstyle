import mongoose from 'mongoose';

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with the database');
    }
};

export default connectDatabase;
