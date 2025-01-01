import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URI!;

const connectDB = async (): Promise<void> => {
	try {
		await mongoose.connect(mongoURI);
		console.log('MongoDB connected');
	} catch (error) {
		console.log('Failed to connect MongoDB', error);
	}
};

export default connectDB;
