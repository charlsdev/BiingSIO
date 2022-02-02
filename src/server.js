const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

//Inicializaciones
const app = express();

//Configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
   extname: '.hbs',
   layoutsDir: path.join(app.get('views'), 'layouts'),
   partialsDir: path.join(app.get('views'), 'partials'),
   helpers: require('./helpers/handlebarsHelpers'),
   defaultLayout: 'main'
}));

app.set('view engine', '.hbs');

// app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Rutas
app.use(require('./routes/index.routes'));

//Archivos estáticos
app.use(express.static(path.join(__dirname + '/public')));

// Error 404 - Not Found
app.get('*', (req, res) => {
   res.status(404).render('404');
});

module.exports = app;