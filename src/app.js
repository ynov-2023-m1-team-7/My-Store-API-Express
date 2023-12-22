const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorsHandling');
const config = require('./config');
const routes = require('./routes');
const bodyParser = require('body-parser')
const moment = require('moment');
const duplicateAllDataToRedis = require('./Redis/launch');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// duplicate all data to Redis at launch
duplicateAllDataToRedis();



// Trust the headers set by your reverse proxy
app.set('trust proxy', true);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '50mb',
    parameterLimit: 1000000
}))

// parse application/json
app.use(bodyParser.json({ limit: '50mb' }))

app.use(express.json());


// cors
app.use(
    cors({
        origin: '*',
    }),
);


// initial route
app.get('/', (req, res) => {
    res.send({ message: 'Welcome to app-store-api application.' });
});

app.use((req, res, next) => {
    if (process.env.STACK === 'development') {
        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        const clientIp = (req.headers['x-forwarded-for'] || '').split(',').shift().replace('::ffff:', '') || req.socket.remoteAddress;
        console.log(`[${currentTime}] - Requête reçue : ${req.method}, ${req.url}, ${JSON.stringify(req.params)}, ${JSON.stringify(req.body)} | l'adresse IP source : [${clientIp}] `);
        if (req.method === 'POST' || req.method === 'PUT') {
            console.log(`[${currentTime}] - Corps de la requête :  ${JSON.stringify(req.body)} | de l'adresse IP:  [${clientIp}] `);
        }
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// api routes prefix
app.use('/api', routes);

// error handling
app.use(errorHandler);

// run server
app.listen(config.port, () => {
    console.log(`Server up on port ${config.port}`);
    console.log(`Open http://localhost:${config.port}/api/`);
});

module.exports = app;
