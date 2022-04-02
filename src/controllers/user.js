
const {user} = require("../../models")


exports.getUsers = async (req,res)=>{
    try{
        const data = await user.findAll({
            attributes:{
                exclude:["createdAt","updatedAt"]
            }
        })

        res.send({
            status:"success",
            data:data
        })

    }catch(error){
        console.log(error)
        res.send({
            status:"failed",
            message: "server error"
        })
    }
}

exports.getUser = async (req,res)=>{
    try{

        const data = await user.findOne({
            where:{
                id:req.user.id
            },
            attributes:{
                exclude:["password","createdAt","updatedAt"]
            }
        })

        res.send({
            status:"success",
            data:data
        })

    }catch(error){
        console.log(error)
        res.send({
            status:"failed",
            message: "server error"
        })
    }
}

exports.deleteUser= async (req,res)=>{

    try{
        const {id} = req.params 

        await user.destroy({
            where:{
                id:id
            }
        })

        res.send({
            status:"success",
            data: id
        })

    }catch(error){
        res.send({
            status:"failed",
            message:"server error"
        })
    }

}

// exports.updateUser = async (req,res) =>{
//     try {
//         const {id} = req.params
//         const dataBody = req.body

//         const dataEdit = await user.update(dataBody,{
//             where:{
//                 id:id
//             }
//         })

//         const edited = await user.findOne({
//             where:{
//                 id:id
//             },
//             attributes:{
//                 exclude:["createdAt","updatedAt"]
//             }
//         })
//     } catch (error) {
//         console.log(error);
//         res.send({
//             status:"failed",
//             message:"server error"
//         })
//     }
// }









