const {profile,user} = require("../../models")

exports.editProfile = async(req,res)=>{
    try {
        const data = req.body
        const edit = await profile.update({
            ...data,
            fotoProfile: req.files.fotoProfile[0].filename,
        },{
            where:{
                idUser:req.user.id
            },
            attributes:{
                exclude:["createdAt","updatedAt"]
            }
        });

        const findingProfile = await profile.findOne({
            where:{
                idUser: req.user.id
            },
            attributes:{
                exclude:["createdAt","updatedAt"]
            }

        })

        res.send({
            status:"edit success",
            data: findingProfile,
        })


    } catch (error) {
        console.log(error);
        res.send({
            status:"failed",
            message:"error"
        })
    }
}

exports.getProfile= async(req,res)=>{
    try {
        let data = await profile.findOne({
            where:{
                idUser: req.user.id
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

            data = JSON.parse(JSON.stringify(data))
            const path = "http://localhost:5000/uploads/imgCover/"

            data={
                ...data,
                fotoProfile: path + data.fotoProfile
            }

            res.send({
                status:"success",
                data,
            })

    } catch (error) {
        console.log(error);
        res.send({
            status:"failed",
            message:"server error"
        })
    }
}