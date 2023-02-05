const express = require('express');
const router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');

router.use(
    auth({
        authRequired: false,
        auth0Logout: true,
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        baseURL: process.env.BASE_URL,
        clientID: process.env.CLIENT_ID,
        secret: process.env.SECRET,
    })
);

router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged In' : 'Logged Out');
})

// requiresAuth function is used when the specific route needs authentication
// For example, add a review needs auth but viewing a review not
router.get('/profile/:id', requiresAuth(), (req, res) => {
    req.params.id
    res.send(JSON.stringify(req.oidc.user));
});

module.exports = router;