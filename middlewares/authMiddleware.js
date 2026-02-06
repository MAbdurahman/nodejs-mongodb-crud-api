


const authenticateUser = (req, res, next) => (
   console.log('auth middleware')

)

const authorizeRoles = (...roles) => {
   console.log('auth middleware')
}


module.exports = {authenticateUser, authorizeRoles}