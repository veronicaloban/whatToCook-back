const https = require('https');
const fs = require('fs');

require('dotenv').config();

const app  = require('./app');
const { mongoConnect } = require('./services/mongo');

const PORT = process.env.PORT || 8080;

const server = https.createServer(
    {
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem'),
    },
    app
)

async function startServer() {
    await mongoConnect();

    server.listen(PORT, () => {
        console.log(`Listening on ${PORT}...`)
    })
};

startServer(); 
