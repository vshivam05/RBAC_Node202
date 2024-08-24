import mongoose from 'mongoose';
const uri = `mongodb+srv://varunrana13:${process.env.PASSWORD}@cluster0.o29lg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export default mongoose.connect(uri);