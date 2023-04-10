const express = require('express');

const config = require('./config');

const routes = require('./routes')
const app = express();
const setupViewEngine = require('./config/viewEngine');
//require('./config/viewEngine')(app);

setupViewEngine(app);
app.use(express.static('src/public'));
app.use(express.urlencoded({extended:false}));

app.use(routes);


app.listen(config.PORT, () => console.log(`Server is listening on port ${config.PORT}...`));