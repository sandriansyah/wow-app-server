const{transaction,user} = require("../../models")


exports.addTransaction =async(req,res)=>{
    try {
        const data = req.body 

        const findingdata = await transaction.findOne({
            where:{
                idUser: req.user.id,
            }
        })

        if(!findingdata){
            const addData = await transaction.create({
                ...data,
                transferProof: req.file.filename, 
                remainingActive:0,
                // userStatus:"noActive",
                paymentStatus:"pending",
                idUser: req.user.id,
            });

            const dataTransaction = await user.findOne({
                where:{
                    id: addData.idUser
                },
                attributes:{
                    exclude:["password","createdAt","updatedAt"]
                },
                include:{
                    model: transaction,
                    as:"transaction",
                    attributes:{
                        exclude:["createdAt","updatedAt"]
                    }
                }
            });

            res.send({
                status:"success",
                user:{
                    transaction:dataTransaction
                }
            })
        } else{
            res.send({
                status:"failed",
                message:"akun kamu masih dalam status berlangganan"
            })
        }


    } catch (error) {
        console.log(error);
        res.status(400).send({
            status:"failed",
            message:"server error"
        })
        
    }
}

exports.editTransaction = async (req,res)=>{
    try {
        
        const {id} = req.params
        const dataBody = req.body

        const dataEdit = await transaction.update(dataBody,{
            where:{
                id:id
            }
        })

        const edited = await transaction.findOne({
            where:{
                id:id
            },
            attributes:{
                exclude:["createdAt","updatedAt"]
            },
            include:{
                model:user,
                as:"user",
                attributes:{
                    exclude:["password","createdAt","updatedAt"]
                }
            }
        })

        if(edited.paymentStatus=="approve"){
            const dataSubs = {
                isSubs:"true"
            }
            await user.update(dataSubs,{
                where:{
                    id: edited.idUser
                }
            }
            )
        }else{
            const dataSubs = {
                isSubs:"false"
            }
            await user.update(dataSubs,{
                where:{
                    id: edited.idUser
                }
            }
            )
        }

        res.send({
            status:"success",
            data: edited
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status:"failed",
            message:"server error"
        })
    }
}

exports.getAllTransaction = async (req,res)=>{
    try {
        const data = await transaction.findAll({
            attributes:{
                exclude:["createdAt","updatedAt"]
            },
            include:{
                model:user,
                as:"user",
                attributes:{
                    exclude:["password","createdAt","updatedAt"]
                }
            }
        })

        res.send({
            status:"success",
            data:{
                transaction: data
            }
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status:"failed",
            message:"server error"
        })
    }
}

exports.getAllTransactionActive = async (req,res)=>{
    try {
        const data = await transaction.findAll(
            {where:{
                userStatus:"active"
            }
            },
            {
            attributes:{
                exclude:["createdAt","updatedAt"]
            },
            include:{
                model:user,
                as:"user",
                attributes:{
                    exclude:["password","createdAt","updatedAt"]
                }
            }
        })

        res.send({
            status:"success",
            data:{
                transaction: data
            }
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status:"failed",
            message:"server error"
        })
    }
}

exports.getTransaction = async (req,res)=>{
    try {
        const {id} = req.params
        const data = await transaction.findOne({
            where:{
                id:id
            },
            attributes:{
                exclude:["idUser","createdAt","updatedAt"]
            },
            include:{
                model:user,
                as:"user",
                attributes:{
                    exclude:["password","createdAt","updatedAt"]
                }
            }
        })

        res.send({
            status:"success",
            transaction:data
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status:"failed",
            message:"server error"
        })
    }
}

