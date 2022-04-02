const multer = require('multer')

exports.uploadFile =(bookFile,imgCover)=>{
    const storage = multer.diskStorage({

        destination:function(req,file,cb){
        
        if(file.fieldname === bookFile){
            cb(null,"uploads/bookFile")
        }else{
            cb(null,"uploads/imgCover")
        }
        
        },
        filename:function(req,file,cb){
            cb(null,Date.now()+ '-' + file.originalname.replace(/\s/g,""))
        }
    })

    const fileFilter = function(req,file,cb){

        if(file.filename === bookFile){
            if(!file.originalname.match(/\.(epub|EPUB)$/)){
                req.fileValidationError={
                    message:"only epub files are allowed"
                }
                return cb(new Error("only epub files are allowed"),false)
            }
        }
        if(file.filename === imgCover){
            if(!file.originalname.match(/\.(jpg|JPG|JPEG|jpeg|png|PNG)$/)){
                req.fileValidationError={
                    message:"only image files are allowed"
                }
                return cb(new Error("only image files are allowed"),false)
            }
        }
        cb(null,true)
    }
    const sizeInMb = 100
    const maxSize = sizeInMb * 1000 * 1000

    const upload = multer({
        storage,
        fileFilter,
        limits:{
            fileSize:maxSize,
        }
    }).fields([
        {
            name:bookFile,
            maxCount:1,
        },
        {
            name:imgCover,
            maxCount:1,
        }
        ])

    return(req,res,next)=>{
        upload(req,res,function(err){
            if(req.fileValidationError){
                return res.status(400).send(req.fileValidationError)
            }

            // if(!req.file && !err){
            //     return res.status(400).send({
            //         message:"please select files to upload"
            //     })
            // }

            if(err){
                if(err.code == "LIMIT_FILE_SIZE"){
                    return res.status(400).send({
                        message:`Max fileSized ${sizeInMb}Mb`
                    })
                }

                return res.status(400).send(err)
            }

            return next()
        })
    }
}


// exports.uploadFile =(imageFile)=>{
//     const storage = multer.diskStorage({

//         destination:function(req,file,cb){
        
//         cb(null,"uploads")
        
//         },
//         filename:function(req,file,cb){
//             cb(null,Date.now()+ '-' + file.originalname.replace(/\s/g,""))
//         }
//     })

//     const fileFilter = function(req,file,cb){
//         if(file.fieldname == imageFile){
//             if(!file.originalname.match(/\.(jpg|JPG|JPEG|jpeg|png|PNG)$/)){
//                 req.fileValidationError={
//                     message:"only image files are allowed"
//                 }
//                 return cb(new Error("only image files are allowed"),false)
//             }
//         }
//         cb(null,true)
//     }
//     const sizeInMb = 100
//     const maxSize = sizeInMb * 1000 * 1000

//     const upload = multer({
//         storage,
//         fileFilter,
//         limits:{
//             fileSize:maxSize,
//         }
//     }).single(imageFile)

//     return(req,res,next)=>{
//         upload(req,res,function(err){
//             if(req.fileValidationError){
//                 return res.status(400).send(req.fileValidationError)
//             }

//             if(!req.file && !err){
//                 return res.status(400).send({
//                     message:"please select files to upload"
//                 })
//             }

//             if(err){
//                 if(err.code == "LIMIT_FILE_SIZE"){
//                     return res.status(400).send({
//                         message:`Max fileSized ${sizeInMb}Mb`
//                     })
//                 }

//                 return res.status(400).send(err)
//             }

//             return next()
//         })
//     }
// }







// const multer = require('multer')


// exports.uploadFile =(imageFile,fileBook)=>{
//     const storage = multer.diskStorage({
//         destination:function(req,file,cb){

//             if(file.fieldname === imageFile){
//                 cb(null,"uploads/covers")
//             }else{
//                 cb(null,"uploads/books")
//             }
//         },
//         filename:function(req,file,cb){
//             cb(null,Date.now()+ '-' + file.originalname.replace(/\s/g,""))
//         }
//     })
// console.log(imageFile);
//     const fileFilter = function(req,file,cb){
//         if(file.fieldname === imageFile){
//             if(!file.originalname.match(/\.(jpg|JPG|JPEG|jpeg|png|PNG)$/)){
//                 req.fileValidationError={
//                     message:"only image files are allowed"
//                 }
//                 return cb(new Error("only image files are allowed"),false)
//             }
//         }
//         if(file.fieldname === fileBook){
//             if(!file.originalname.match(/\.(epub|EPUB)$/)){
//                 req.fileValidationError={
//                     message:"only epub files are allowed"
//                 }
//                 return cb(new Error("only epub files are allowed"),false)
//             }
//         }
//         cb(null,true)
//     }
//     const sizeInMb = 100
//     const maxSize = sizeInMb * 1000 * 1000

//     const upload = multer({
//         storage,
//         fileFilter,
//         limits:{
//             fileSize:maxSize,
//         }
//     }).fields([
//         {
//             name:imageFile,
//             maxCount:1,
//         },
//         {
//             name:fileBook,
//             maxCount:1,
//         }
//     ])

//     return(req,res,next)=>{
//         upload(req,res,function(err){
//             if(req.fileValidationError){
//                 return res.status(400).send(req.fileValidationError)
//             }

//             if(!req.files && !err){
//                 return res.status(400).send({
//                     message:"please select files to upload"
//                 })
//             }

//             if(err){
//                 if(err.code == "LIMIT_FILE_SIZE"){
//                     return res.status(400).send({
//                         message:`Max fileSized ${sizeInMb}Mb`
//                     })
//                 }

//                 return res.status(400).send(err)
//             }

//             return next()
//         })
//     }
// }