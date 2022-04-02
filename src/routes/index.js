const express = require("express")

const router = express.Router()


const {register,login,checkAuth} = require("../controllers/auth")
const {getUsers,getUser,deleteUser} = require("../controllers/user")
const {editProfile,getProfile} = require("../controllers/profile")
const {addBook,getBooks,getBook,deleteBook,editBook} = require("../controllers/book")
const {addTransaction,editTransaction,getAllTransaction,getTransaction,getAllTransactionActive} = require("../controllers/transaction")
const {addMyListBook,getUserListBook,findListBook} = require("../controllers/myListBook")
const {auth}=require("../midlewere/auth")
const {uploadFile} = require("../midlewere/uploadFile")
const {uploadTransferProof} = require("../midlewere/uploadTransferProof")


router.post("/register",register)
router.post("/login",login)
router.get("/checkauth",auth,checkAuth)

router.post("/mylistbook",auth,addMyListBook)
router.get("/mylistbook",auth,getUserListBook)
router.get("/findbook/:id",auth,findListBook)

router.get("/users",getUsers)
router.get("/user",auth,getUser)
router.delete("/user/:id",deleteUser)

router.patch("/profile",auth,uploadFile("bookFile","fotoProfile"),editProfile)
router.get("/profile",auth,getProfile)

router.post("/book",uploadFile("bookFile","imgCover"),addBook)
router.get("/books",getBooks)
router.get("/book/:id",getBook)
router.delete("/book/:id",auth,deleteBook)
router.patch("/book/:id",auth,editBook)

router.post("/transaction",auth,uploadTransferProof("transferProof"),addTransaction)
router.patch("/transaction/:id",editTransaction)
router.get("/transaction",getAllTransaction)
router.get("/transactionActive",getAllTransactionActive)
router.get("/transaction/:id",getTransaction)

// router.get("/user/:id",getUser)
// router.patch("/user/:id",updateUser)


module.exports = router