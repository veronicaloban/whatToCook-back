const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { addNewUser, getUser, checkEmail, checkUsername } = require('../../models/users/users.model');

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' }) //30 min
}

async function httpAddNewUser(req, res) {
    const { username, email, password } = req.body;

    const existedEmail = await checkEmail(email);

    if (existedEmail) {
        return res.status(403).json({ message: 'Account with this email already exist' })
    }

    const existedLogin = await checkUsername(username);

    if (existedLogin) {
        return res.status(403).json({ message: 'This login is already taken' })
    }

    const salt = crypto.randomBytes(16);
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256');
    
    const newUser = {
        email,
        username,
        hashedPassword, 
        salt,
        recipes: []
    };

    const token = generateAccessToken({ username: req.body.username })

    await addNewUser(newUser);

    return res.status(201).json(token); //we should return a token
}

async function httpLoginUser(req, res) {
    const { username, password } = req.body;

    const user = await getUser(username);

    console.log(user, 'User')

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 310000, 32, 'sha256');

    if (!crypto.timingSafeEqual(user.hashedPassword, hashedPassword)) {
        return res.status(401).json({ message: 'Invalid username or password' }); 
    }

    const token = generateAccessToken({ username: username });

    res.json(token);
}


async function httpCheckExistingEmail(req, res) {
    const { email } = req.body;

    const existedEmail = await checkEmail(email);

    if (existedEmail) {
        return res.status(403).json(true)
    }

    return res.status(204).json(false);
}

async function httpCheckExistingLogin(req, res) {
    const { login } = req.body;

    const existedLogin = await checkUsername(login);

    if (existedLogin) {
        return res.status(200).json(true);
    }

    return res.status(200).json(false);
}

module.exports = {
    httpAddNewUser,
    httpLoginUser,
    httpCheckExistingEmail,
    httpCheckExistingLogin,
}