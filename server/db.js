const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
let connectionPromise

module.exports = () => {
    const dbUri = process.env.MONGODB_URI

    if (!dbUri) {
        throw new Error('MONGODB_URI is not set. Add your MongoDB connection string to server/.env.')
    }

    if (mongoose.connection.readyState === 1) return Promise.resolve(mongoose.connection)
    if (!connectionPromise) {
        connectionPromise = mongoose.connect(dbUri)
            .then(connection => {
                connectionPromise = null
                return connection
            })
            .catch(error => {
                connectionPromise = null
                throw error
            })
    }

    return connectionPromise
}
