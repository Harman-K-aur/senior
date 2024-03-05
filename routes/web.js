const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const adminOrderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/statusController')
const emailController=require('../app/http/controllers/emailController')
const passport = require('passport');
const User=require('../app/models/user')
// Middlewares 
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const admin = require('../app/http/middlewares/admin')
const hr_admin = require('../app/http/middlewares/hr_admin')
const jobController = require('../app/http/controllers/jobController')
const schemeController = require('../app/http/controllers/schemeController')

function initRoutes(app) {
    app.get('/', homeController().index)
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)
    app.get('/register', guest, authController().register)
    app.post('/register', emailController().postregister)
    app.post('/logout', authController().logout)

    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update)

    // Customer routes
    app.post('/orders', auth, orderController().store)
    app.get('/customer/orders', auth, orderController().index)
    app.get('/customer/orders/:id', auth, orderController().show)
    app.get('/customers/orders', auth, orderController().index)

    // Admin routes
    app.get('/admin/orders', admin, adminOrderController().index)
    app.post('/admin/order/status', admin, statusController().update)

    //Jobs Routes
    app.get('/jobs', jobController().jobindex)
    app.get('/addJobs', hr_admin,jobController().addjobindex)
    app.post('/addJobs', hr_admin, jobController().postaddjob)

    //scheme Routes
    app.get('/schemes', schemeController().schemeindex)
    
    app.get('/verify', emailController().verifyEmail);
    


}


module.exports = initRoutes

