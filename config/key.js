if (process.env.NODE_ENV === 'production'){
    // we are in production environment
    module.exports = require('./prod')
}
else {
    // we are in develeopment envionment
    module.exports = require('./dev')
}