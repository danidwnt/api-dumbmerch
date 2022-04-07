const express = require('express')

const router = express.Router()

const {
    addUsers,
    getUsers,
    getUser,
    getUsersProducts,
} = require('../controllers/user')

const {
    getProducts,
    addProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getProductsUser,
    getProductsCategory,
    getProductsAll
} = require('../controllers/product')

const { addCategory,
    getCategorys,
    getCategory,
    updateCategory,
    deleteCategory,
    getCategoryProduct
} = require('../controllers/category')

const {
    addProfile
} = require('../controllers/profile')

const {
    addTransaction,
    getTransactions
} = require('../controllers/transaction')


const { register, login } = require('../controllers/auth')

//middleware
const { auth } = require('../middlewares/auth') 


router.post('/profile', addProfile)


router.post('/user', addUsers);
router.get('/users', getUsers);
router.get('/user/:id', getUser)
router.get('/user-products', getUsersProducts)


router.get('/products', auth, getProducts)
router.get('/product/:id', auth, getProduct)
router.get('/productUser', auth, getProductsUser)
router.get('/productCategory', auth, getProductsCategory)
router.get('/productAll', auth, getProductsAll)
router.post('/product', auth, addProduct)
router.delete('/product/:id', auth, deleteProduct)
router.patch('/product/:id', auth, updateProduct)


router.post('/category', auth, addCategory)
router.get('/categorys', auth, getCategorys)
router.get('/category/:id', auth, getCategory)
router.get('/categoryProduct', auth, getCategoryProduct)
router.patch('/category/:id', auth, updateCategory)
router.delete('/category/:id', auth, deleteCategory)


router.get('/transactions', auth, getTransactions)
router.post('/transaction', auth, addTransaction)

router.post('/register', register)
router.post('/login', login)

module.exports = router