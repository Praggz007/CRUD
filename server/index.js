require('dotenv').config()
const app = require('./app')
const connectDb = require('./db')
const PORT = process.env.PORT || 3000

connectDb()
    .then(() => {
        console.log('DB connection succeeded.')
        app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))
    })
    .catch(err => {
        console.error('DB connection failed!')
        console.error(err.message || err)
        console.info('Check that the Atlas cluster is running, your IP is allowed in Network Access, and the username and password are correct.')
        console.info('If the password contains special characters, URL-encode it in MONGODB_URI.')
        process.exitCode = 1
    })
