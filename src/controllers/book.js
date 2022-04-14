const {book} = require("../../models")

exports.addBook = async (req,res) => {

    // const data = req.body
    // data.bookFile = req.file.bookFile[0].filename
    // data.imgCover = req.file.imgCover[0].filename

    try {

        const data = req.body
        const newBook = await book.create({
            ...data,
            bookFile: req.files.bookFile[0].filename,
            imgCover: req.files.imgCover[0].filename
        })

        const bookData = await book.findOne({
            where:{
                id: newBook.id 
            },
            attributes:{
                exclude:["createdAt","updatedAt"]
            }
        })

        // let createProducts = JSON.parse(JSON.stringify(bookData)); 


        // res.send({ 
        // status: "Success", 
        // data: bookData,
        // });

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