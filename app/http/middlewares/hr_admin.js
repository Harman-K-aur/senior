function hr_admin (req, res, next) {
    if(req.isAuthenticated() && req.user.role === 'hr_admin') {
        return next()
    }
    return res.redirect('/')
}

module.exports = hr_admin