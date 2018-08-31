/**
 * Module Dependencies
 */
const config = require('./config');
const restify = require('restify');
const mongoose = require('mongoose');
const restifyPlugins = require('restify-plugins');
const render = require('restify-render-middleware');
const cons = require('consolidate')

/**
 * Initialize Server
 */
const server = restify.createServer({
    name: config.name,
    version: config.version,
});

/**
 * Middleware
 */
function corsHandler(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://polleze.com');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
    res.setHeader('Access-Control-Max-Age', '1000');

    return next();
}

function optionsRoute(req, res, next) {

    res.send(200);
    return next();
}


server.use(restifyPlugins.bodyParser({ mapParams: false }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());
server.use(render({engine: cons.pug, dir: __dirname+'/view',}));

server.opts('/\.*/', corsHandler, optionsRoute);


/**
 * Start Server, Connect to DB & Require Routes
 */

server.listen(config.port, () => {
    initDB().then(() => {
        console.log('Connected to MongoDB')
        require('./routes')(server);
        console.log(`Server is listening on port ${config.port}`);
    }).catch(error => {
        console.error(error)
        process.exit(1)
    })
});

function initDB() {
    return new Promise((resolve, reject) => {
        // establish connection to mongodb
        mongoose.Promise = global.Promise;
        mongoose.connect(config.db.uri);

        const db = mongoose.connection;

        db.on('error', reject)

        db.once('open', resolve)
    })
}

module.exports = server;