const http = require('http');

const eventBus = require('./eventBus');
//Making it simple and using Event Bus with better performance for pub/sub.
/*const logger = require('./logger');
const reporter = require('./reportingServices');*/

const server = http.createServer((req, res) => {
    //logger.log('Request - ' + req.url);
    //reporter.collect(`${req.method} - ${req.url}`)
    eventBus.publish('request', { method: req.method, url: req.url })
    res.end();
});


server.listen(5000);
console.log('Server is listening on port 5000...');