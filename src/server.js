const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
// const morgan = require('morgan');
// const { Server } = require('socket.io');
// const http = require('http');

//Inicializaciones
const app = express();

// const httpServer = http.createServer(app);
// const io = new Server(httpServer);

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

// Config SocketIO
// io.on('connection', (socket) => {
//    console.log('a user connected');
// });

//Archivos estáticos
app.use(express.static(path.join(__dirname + '/public')));

// Error 404 - Not Found
app.get('*', (req, res) => {
   res.status(404).render('404');
});

module.exports = app;