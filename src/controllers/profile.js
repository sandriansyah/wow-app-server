const {profile,user} = require("../../models")

const cloudinary = require('../utils/cloudinary')

exports.editProfile = async(req,res)=>{
    try {
        const data = req.body
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'wowapp',
            use_filename: true,
            unique_filename: true,
          });
        const edit = await profile.update({
            ...data,
            fotoProfile: result.public_id,
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
            const path = "https://res.cloudinary.com/doufzuoet/image/upload/v1649982885/"

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