import userDataSchema from "../model/userSchema.js"
import bcrypt from 'bcrypt'
import { sendAccountCreatedEmail } from "../utils/mailer.js";
import tokenGeneration from "../tokens/tokenGeneration.js";

// export const signup = async (req,res) => {
//     try {
//         const findEmail = await userDataSchema.findOne({email: req.body.email})
//         if(findEmail !== null)
//         {
//             return res.json({
//                 status: 400,
//                 success: false,
//                 message: "user already exist",
//                 body: {}
//             })
//         }
//         else{
//             const saltround =10;
//         const encpass = await bcrypt.hash(req.body.password, saltround)
//         const data = await userDataSchema.create({...req.body, password:encpass})
//         console.log(data, "all Data")
//         return res.json({
//             status:200,
//             success:true,
//             message:"user created successfully",
//             body:{data}
//         })

//         }
//     } catch (error) {
//         console.log(error)
//         return res.json({
//             status: 400,
//             success:false,
//             message: error.message,
//             body:{}
//         })
//     }

// }
// export const signup = async (req, res) => {
//   try {
//     const findEmail = await userDataSchema.findOne({ email: req.body.email });

//     if (findEmail !== null) {
//       return res.json({
//         status: 400,
//         success: false,
//         message: "user already exist",
//         body: {}
//       });
//     } else {
//       let encpass = await bcrypt.hash(req.body.password, 10);
//         let data = await userDataSchema.create({
//           ...req.body,
//           password: encpass
//         });
//         console.log(data, "all Data");
//         console.log(data.id,"klkl")
//         console.log(data.id,"rtrt")
//         const tok= await tokenGeneration( {id: data.id})
//         console.log(tok,"token")
//         data.token = tok.token
//         data.loginTimde = Date.now()
//         data.save()


//       const saltround = 10;
//        encpass = await bcrypt.hash(req.body.password, saltround);

//        data = await userDataSchema.create({
//         ...req.body,
//         password: encpass
//       });

//       // ✅ Send signup email
//       try {
//         await sendAccountCreatedEmail(req.body.email, req.body.name || "User");
//       } catch (emailError) {
//         console.log("Email sending failed:", emailError.message);
//         // do not block signup if email fails
//       }

//       return res.json({
//         status: 200,
//         success: true,
//         message: "user created successfully",
//         body: { data }
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       status: 400,
//       success: false,
//       message: error.message,
//       body: {}
//     });
//   }
// };

export const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required"
      });
    }

    const existingUser = await userDataSchema.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userDataSchema.create({
      ...req.body,
      password: hashedPassword
    });

    const tokenData = await tokenGeneration({ id: newUser._id });

    newUser.token = tokenData.token;
    newUser.loginTime = new Date();
    await newUser.save();

    // Send Email (optional)
    try {
      await sendAccountCreatedEmail(email, name || "User");
    } catch (err) {
      console.log("Email failed:", err.message);
    }

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      body: {
        _id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        token: newUser.token
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// export const login = async (req, res) =>{
//     try {
//         const data = await userDataSchema.findOne({email: req.body.email})
//         if(!req.body.email){
//             return res.json({
//                 status: 400,
//                 success:false,
//                 message:"Email Required",
//                 body:{}
//             })
//         }
//         else if(!req.body.password){
//             return res.json({
//                 status:400,
//                 success: false,
//                 message:"password required",
//                 body:{}
//             })
//         }
//         else{
//             if(data == null){
//                 return res.json({
//                     status: 400,
//                     success:false,
//                     message:"Email not valid",
//                     body:{}
//                 })
//             }else{
//                 const decpass = await bcrypt.compare(req.body.password,data.password)
//                 if(decpass == false){
//                     return res.json({
//                         status:400,
//                         success:false,
//                         message:"password not matched",
//                         body:{}
//                     })
//                 }
//                 else{
//                     const tok= await tokenGeneration( {id: data._id})
//                     console.log(tok,"token")
//                     data.token = tok.token
//                     data.loginTimde = tok.decode.iat
//                     data.save()

//                     return res.json({
//                         status:200,
//                         success:true,
//                         message:"user login successfully",
//                         body:{data}
//                     })
//                 }
//             }
//         }
//     } catch (error) {
//         console.log(error)
//         return res.json({
//             status:400,
//             success:false,
//             message:error.message,
//             body:{}
//         })
//     }
// }
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required"
      });
    }

    const user = await userDataSchema.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Password not matched"
      });
    }

    const tokenData = await tokenGeneration({ id: user._id });

    user.token = tokenData.token;
    user.loginTime = new Date();
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User login successfully",
      body: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        token: user.token
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const findUsers = async (req,res) => {
    try {
        const data = await userDataSchema.find()
        return res.json({
            status:200,
            success:true,
            message:"All user Data",
            body:{data}
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status:400,
            success:false,
            message: error.message,
            body:{}
        })
    }
}
export const findUserByBody = async (req,res) =>{
    try {
        const data = await userDataSchema.findById(req.body.id)
        return res.json({
            status:200,
            success:true,
            message:"All user Data",
            body:{data}
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status:400,
            success:false,
            message: error.message,
            body:{}
        })
    }
}
export const findUserByIdByParams =async (req,res) =>{
    try {
        const data = await userDataSchema.findById({_id:req.params.id})
        return res.json({
            status:200,
            success:true,
            message:"All user Data",
            body:{data}
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status:400,
            success:false,
            message: error.message,
            body:{}
        })
    }
}
export const deleteUser = async (req,res)=>{
    try {
        const data = await userDataSchema.findByIdAndDelete({_id: req.params.id})
        const count = await userDataSchema.countDocuments()
        return res.json({
            status:200,
            success:true,
            message:"All user Data",
            body:{data,count}
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status:400,
            success:false,
            message: error.message,
            body:{}
        })
    }
}
export const userUpdate = async (req,res)=>{
    try {
        const encPass = await bcrypt.hash(req.body.password,10)
        const data = await userDataSchema.findByIdAndUpdate({_id: req.body.id}, {...req.body,password: encPass},{new: true})
        console.log(data,"updated user")
        return res.json({
            status:200,
            success:true,
            message:"user Updated Successfully",
            body:{data}
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status:400,
            success:false,
            message: error.message,
            body:{}
        })
    }
}
