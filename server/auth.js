const crypto = require('crypto')

const TOKEN_LIFETIME_SECONDS = 8 * 60 * 60

const authIsConfigured = () => Boolean(
    process.env.ADMIN_USERNAME &&
    process.env.ADMIN_PASSWORD &&
    process.env.AUTH_TOKEN_SECRET &&
    process.env.AUTH_TOKEN_SECRET.length >= 32
)

const equalSecret = (provided, expected) => {
    const providedBuffer = Buffer.from(String(provided || ''))
    const expectedBuffer = Buffer.from(String(expected || ''))
    return providedBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(providedBuffer, expectedBuffer)
}

const sign = payload => crypto.createHmac('sha256', process.env.AUTH_TOKEN_SECRET)
    .update(payload)
    .digest('base64url')

const createToken = username => {
    const payload = Buffer.from(JSON.stringify({
        username,
        exp: Math.floor(Date.now() / 1000) + TOKEN_LIFETIME_SECONDS
    })).toString('base64url')

    return `${payload}.${sign(payload)}`
}

const requireAuth = (req, res, next) => {
    if (!authIsConfigured()) return res.status(503).json({ error: 'API authentication is not configured.' })

    const [scheme, token] = (req.get('authorization') || '').split(' ')
    if (scheme !== 'Bearer' || !token) return res.status(401).json({ error: 'Authentication required.' })

    const [payload, signature, extra] = token.split('.')
    if (!payload || !signature || extra) return res.status(401).json({ error: 'Invalid or expired session.' })
    if (!equalSecret(signature, sign(payload))) return res.status(401).json({ error: 'Invalid or expired session.' })

    try {
        const session = JSON.parse(Buffer.from(payload, 'base64url').toString())
        if (session.username !== process.env.ADMIN_USERNAME || session.exp <= Date.now() / 1000) {
            return res.status(401).json({ error: 'Invalid or expired session.' })
        }
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired session.' })
    }

    next()
}

module.exports = {
    authIsConfigured,
    createToken,
    equalSecret,
    requireAuth,
    TOKEN_LIFETIME_SECONDS
}
