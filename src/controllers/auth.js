const {user,profile} = require("../../models")
const joi = require("joi")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register= async (req,res)=>{

    const schema = joi.object({
        fullName:joi.string().min(8).required(),
        email:joi.string().email().min(8).required(),
        password:joi.string().min(6).required(),
        status:joi.string()
    })

    const {error}= schema.validate(req.body)

    if(error){
        return res.status(400).send({
            message:error.details[0].message
        })
    } 

    try{

        const checkEmail = await user.findOne({
            where:{
                email:req.body.email
            }
        })

        if(checkEmail){
            return res.send({
                status:"failed",
                message:"email already used"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)

        const createUser = await user.create({
            fullName: req.body.fullName,
            email: req.body.email,
            status: "user",
            password:hashedPassword
        })

        const createProfile = await profile.create({
            gender:"",
            phoneNumber:"",
            address:"",
            fotoProfile:"defaultProfile.png",
            idUser: createUser.id,
        })

        const dataToken = {
            id:createUser.id,
            fullName:createUser.fullName,
            email:createUser.email,
            status:createUser.status,
            isSubs:createUser.isSubs
        }

        const SEKRET_KEY = process.env.TOKEN_KEY
        const token = jwt.sign(dataToken,SEKRET_KEY)

        res.status(200).send({
            status:"success",
            data:{
                id: createUser.id,
                fullName:createUser.fullName,
                email: createUser.email,
                status: createUser.status,
                isSubs: createUser.isSubs,
                token
            }
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            status:"failed",
            message:"server error"
        })
    }
}

exports.login= async (req,res)=>{

    const schema = joi.object({
        email:joi.string().email().min(8).required(),
        password:joi.string().min(6).required()
    })

    const {error}= schema.validate(req.body)

    if(error){
        return res.status(400).send({
            message:error.details[0].message
        })
    }

    try{    
        const findingUser = await user.findOne({
            where:{
                email:req.body.email
            },
            attributes:{
                exclude:["createdAt","updatedAt"]
            }
        })

        const comparePassword = await bcrypt.compare(req.body.password,findingUser.password)

        if(!comparePassword){
            res.status(400).send({
                status:"failed",
                message:"your email and password is invalid"
            })
        }

        const dataToken = {
            id:findingUser.id,
            fullName:findingUser.fullName,
            email:findingUser.email,
            status:findingUser.status,
            isSubs:findingUser.isSubs
        }

        const SEKRET_KEY = process.env.TOKEN_KEY
        const token = jwt.sign(dataToken,SEKRET_KEY)

        res.status(200).send({
            data:{
                id:findingUser.id,
                fullName: findingUser.fullName,
                email: findingUser.email,
                status:findingUser.status,
                isSubs: findingUser.isSubs,
                token
            }
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            status:"failed",
            message:"server error"
        })
    }
}

exports.checkAuth = async(req,res)=>{
    try {
        const id = req.user.id

        const dataUser = await user.findOne({
            where:{
                id:id
            },
            attributes:{
                exclude:["createdAt","updatedAt","password"]
            }
        })

        if(!dataUser){
            return res.status(404).send({
                status:"failed"
            })
        } 

        res.send({
            status:"success",
            data:{
                user:{
                    id: dataUser.id,
                    name: dataUser.fullName,
                    email: dataUser.email,
                    status: dataUser.status,
                    isSubs: dataUser.isSubs,
                }
            }
        })
        
    } catch (error) {
        console.log(error);
        res.send({
            status:"failed",
            message:"server error"
        })
    }
}