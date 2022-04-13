const {book} = require("../../models")

const cloudinary = require('../utils/cloudinary');

exports.addBook = async (req,res) => {

    try {

        const data = req.body

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'WOW-APP',
            use_filename: true,
            unique_filename: true,
          });


        const newBook = await book.create({
            ...data,
            bookFile: result.public_id,
            imgCover: result.public_id,
        })

        const bookData = await book.findOne({
            where:{
                id: newBook.id 
            },
            attributes:{
                exclude:["createdAt","updatedAt"]
            }
        })

        

        res.status(200).send({
            status:"success",
            data: bookData
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            status:"failed",
            message:"server error"
        })
    }
}

exports.getBooks = async (req,res)=>{
    try {
        let dataBooks = await book.findAll({ order:[["createdAt","DESC"]]
            // attributes:{
            //     exclude:["createdAt","updatedAt"]
            // }
        })

        dataBooks = JSON.parse(JSON.stringify(dataBooks))

        const path = "http://localhost:5000/uploads/imgCover/"

        dataBooks = dataBooks.map((book)=>{
            return{
                ...book,
                imgCover:path + book.imgCover 
            }
        })
 
        res.send({
            status:"success",
            data : dataBooks
        })
    } catch (error) {
        console.log(error)
        res.send({
            status:"failed",
            message:"server error"
        })
    }
}

exports.getBook = async(req,res)=>{
    try {
        const {id}=req.params 
        let dataBook = await book.findOne(
            {attributes:{
                exclude:["createdAt","updatedAt"]
            },
            where:{
                id:id
            }
        })

        dataBook= JSON.parse(JSON.stringify(dataBook))

        const path = "http://localhost:5000/uploads/imgCover/"

        dataBook = {
            ...dataBook, 
            imgCover: path + dataBook.imgCover,
        }


        res.send({
            status:"success",
                book: dataBook
        })

    } catch (error) {
        console.log(error)
        res.send({
            status:"failed",
            message:"server error"
        })
    }
}

exports.deleteBook = async(req,res)=>{
    try {
        const {id} = req.params
        await book.destroy({
            where:{
                id:id
            }
        })

        res.send({
            status:"success",
            data: id
        })
    } catch (error) {
        console.log(error)
        res.send({
            status:"failed",
            message:"server error"
        })
    }
}

exports.editBook = async(req,res)=>{
    try {
        const {id}=req.params
        const dataUpdate = req.body
        await book.update(dataUpdate,{
            where:{
                id:id
            }
        })
        res.send({
            status:"success",
            data: req.body
        })
    } catch (error) {
        console.log(error)
        res.send({
            status:"failed",
            message:"server error"
        })
    }
}