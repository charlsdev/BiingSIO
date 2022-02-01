const { format, register } = require('timeago.js');
const moment = require('moment');
moment.locale('es');

const helpersHandlebars = {};

const localeFunc = (number, index) => {
   return [
      ['justo ahora', 'en un rato'],
      ['hace %s segundos', 'en %s segundos'],
      ['hace 1 minuto', 'en 1 minuto'],
      ['hace %s minutos', 'en %s minutos'],
      ['hace 1 hora', 'en 1 hora'],
      ['hace %s horas', 'en %s horas'],
      ['hace 1 día', 'en 1 día'],
      ['hace %s días', 'en %s días'],
      ['hace 1 semana', 'en 1 semana'],
      ['hace %s semanas', 'en %s semanas'],
      ['hace 1 mes', 'en 1 mes'],
      ['hace %s meses', 'en %s meses'],
      ['hace 1 año', 'en 1 año'],
      ['hace %s años', 'en %s años'],
   ][index];
};

register('es_ES', localeFunc);

var arrayBol = [];

helpersHandlebars.timeago = (timestamp) => {
   return format(timestamp, 'es_ES');
};

helpersHandlebars.contIndex = (index) => {
   var cont = ++index;
   return cont;
};

helpersHandlebars.forLoop = (n, block) => {
   var accum = '';

   for(var i = 0; i < n; ++i)
      accum += block.fn(i);
      
   return accum;
};

helpersHandlebars.chart = (number) => {
   const val = (number < 10) 
      ? `0${number}` 
      : number;
      
   return val;
};

helpersHandlebars.isEqual = (num, opts) => {
   return (arrayBol.includes(''+num)) ? opts.fn(this) : opts.inverse(this);
};

helpersHandlebars.lenghtArray = (num) => {
   arrayBol = [];

   num.forEach(data => {
      arrayBol.push(data.numBoleto);
   });

   // console.log(arrayBol);
};

module.exports = helpersHandlebars;