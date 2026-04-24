import express from 'express'
import { deleteUser, findUserByBody, findUserByIdByParams, findUsers, login, signup, userUpdate } from '../controller/userController.js'

const userRouter = express.Router()

userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.get("/findUsers",findUsers)
userRouter.post("/findUserByBody",findUserByBody)
userRouter.get("/findUserByIdByParams/:id",findUserByIdByParams)
userRouter.delete("/deleteUser/:id",deleteUser)
userRouter.put("/userUpdate",userUpdate)
export default userRouter
