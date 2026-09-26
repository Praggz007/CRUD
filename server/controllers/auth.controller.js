const express = require('express')
const { authIsConfigured, createToken, equalSecret, TOKEN_LIFETIME_SECONDS } = require('../auth')

const router = express.Router()

router.post('/login', (req, res) => {
    if (!authIsConfigured()) {
        return res.status(503).json({ error: 'Set ADMIN_USERNAME, ADMIN_PASSWORD, and a 32-character AUTH_TOKEN_SECRET.' })
    }

    if (!equalSecret(req.body.username, process.env.ADMIN_USERNAME) ||
        !equalSecret(req.body.password, process.env.ADMIN_PASSWORD)) {
        return res.status(401).json({ error: 'Invalid username or password.' })
    }

    res.json({ token: createToken(process.env.ADMIN_USERNAME), expiresIn: TOKEN_LIFETIME_SECONDS })
})

module.exports = router
