// import mongoose from 'mongoose';

// const dbConnect = async () =>{
//     try{
//         await mongoose.connect("mongodb+srv://test:test@cluster0.292vsuj.mongodb.net/test");
//         console.log("database is connected")
//     }
//     catch(error)
//     {
//         console.log(error)
//     }

// }
// export default dbConnect

import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb+srv://test:test@cluster0.292vsuj.mongodb.net/test");
    console.log("Database connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;   // 🔴 IMPORTANT: stop server startup
  }
};

export default dbConnect;
