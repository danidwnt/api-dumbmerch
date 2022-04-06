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

const {register, login} = require('../controllers/auth')


router.post('/profile', addProfile)


router.post('/user', addUsers);
router.get('/users', getUsers);
router.get('/user/:id', getUser)
router.get('/user-products', getUsersProducts)


router.get('/products', getProducts)
router.get('/product/:id', getProduct)
router.get('/productUser', getProductsUser)
router.get('/productCategory', getProductsCategory)
router.get('/productAll', getProductsAll)
router.post('/product', addProduct)
router.delete('/product/:id', deleteProduct)
router.patch('/product/:id', updateProduct)


router.post('/category', addCategory)
router.get('/categorys', getCategorys)
router.get('/category/:id', getCategory)
router.get('/categoryProduct', getCategoryProduct)
router.patch('/category/:id', updateCategory)
router.delete('/category/:id', deleteCategory)


router.get('/transactions', getTransactions)
router.post('/transaction', addTransaction)

router.post('/register', register)
router.post('/login', login)

module.exports = router