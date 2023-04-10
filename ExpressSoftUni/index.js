const express = require('express');
const handlebars = require('express-handlebars');
const loggerMiddleware = require('./loggerMiddleware');

const app = express();

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars')

app.use(express.static('public'));
app.use(loggerMiddleware);

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/old', (req, res) => {
    res.send(`
        <html
            <head>
              <link rel="stylesheet" href="/css/style.css"/>
            </head>
            <body>
                <h1>Hello World!</h1>
                <a href="/cats">Cats</a>
            </body>
        </html>
     `)
});

app.get('/cats', (req, res) => {
    const cats = [
        { name: 'Navcho', breed: 'Persian', age: 7 },
        { name: 'Sisa', breed: 'Angora', age: 12 },
        { name: 'Zuza', breed: 'British', age: 4 },
    ]
    res.render('cats', {cats:cats})
});

app.get('/cats/1', (req, res) => {
    res.sendFile('./cat.jpg', { root: __dirname });
    //res.download('./cat.jpg');
    res.attachment('./cat.jpg'); //without end();
});

const validateCatIdMiddleWare = (req, res, next) => {
    let catId = Number(req.params.catId);
    if (!catId) {
        res.redirect('/errorPage')
    } else {
        next();
        req.catId = catId
    }

    
}

app.get('/cats/:catId', validateCatIdMiddleWare, (req, res, next) => {
    res.render(`cat`, { catId: req.params.catId, isOdd: req.params.catId % 2 != 0});
});

app.get('/dogs', (req, res) => {
    res.send('<h1>Dogs page</h1>')
});

app.post('/cats', (req, res) => {
    res.send('Cat recieved')
});


app.put('/cats', (req, res) => {
    res.send('cat is updated')
});

app.delete('/cats', (req, res) => {
    res.send('cat is deleted')
});

app.get('/json', (req, res) => {
    res.json({ ok: true, message: 'Hello from JSON' })
})

app.get('/redirect', (req, res) => {
    res.redirect('/redirected')
})

app.get('/redirected', (req, res) => {
    res.send('This is redirected page')
})

app.get('*', (req, res) => {
    res.send('404')
})




app.listen(5000, () => console.log('Server is listening on port 5000...'));
