import mongoose from "mongoose";
import 'dotenv/config';

const uri = `mongodb+srv://shivamverma:Pa55word@cluster0.hihtb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`; // paste your uri here

export default mongoose.connect(uri);
  
