const {userListBook,book,user} = require("../../models")

exports.addMyListBook = async (req,res)=>{
    try {
        const dataBook = req.body;
        const data = await userListBook.create({
            idUser: req.user.id,
            idBook: dataBook.idBook,
        })

        const getMyListBook = await userListBook.findAll({
            where:{
                idUser:data.idUser
            },
            attributes:{
                exclude:["createdAt","updatedAt"]
            },
            include:{
                model:book,
                as:"book",
                attributes:{
                    exclude:["createdAt","updatedAt"]
                }
            }
        })

        res.send({
            status:"success",
            data: getMyListBook,
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            status:"failed",
            message:"server error"
        })
    }
}

exports.getUserListBook = async(req,res)=>{

    try {
        const data = await userListBook.findAll({
            where:{
                idUser: req.user.id,
            }, 
            attributes:{
                exclude:["createdAt","updatedAt"]
            },
            include:{
                model:book,
                as:"book",
                attributes:{
                    exclude:["createdAt","updatedAt"]
                }
            }
        })

        res.send({
            status:"success",
            data: data
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            status:"failed",
            message:"server error"
        })
    }
}

exports.findListBook = async(req,res)=>{

    const {id} = req.params
    try {
        
        console.log(id);
        const data = await userListBook.findOne({
            where:{
                idUser: req.user.id,
                idBook: id,
            }, 
            attributes:{
                exclude:["createdAt","updatedAt"]
            },
            include:{
                model:book,
                as:"book",
                attributes:{
                    exclude:["createdAt","updatedAt"]
                }
            }
        })       
            res.send({
                data: data
            })
        

    } catch (error) {
        console.log(error);
        res.status(400).send({
            status:"failed",
            message:"server error"
        })
    }
}