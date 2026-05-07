// import express from 'express'
// import dbConnect from './connect/dbconnect.js';
// import fileUpload from 'express-fileupload';
// import userRouter from './route/userRouter.js';
// import cors from 'cors';
// const app = express()
// app.use(fileUpload()) 
// app.use(cors())
// app.use(express.json())

// const port =4545;
// app.use("/user", userRouter)
// dbConnect();
// app.listen(port, () =>{
//     console.log(`server is running on this ${port}`)
// })
import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import dbConnect from './connect/dbConnect.js'
import fileUpload from 'express-fileupload'
import userRouter from './route/userRouter.js'
import cors from 'cors'

const app = express()

app.use(fileUpload())
app.use(cors())
app.use(express.json())

app.use("/user", userRouter)

const port = 4545

const startServer = async () => {
  try {
    await dbConnect()     // WAIT for MongoDB
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  } catch (error) {
    console.error("Failed to connect to DB:", error)
  }
}

startServer()
