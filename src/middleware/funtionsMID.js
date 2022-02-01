const middleware = {};

const { 
   matchPassword
} = require('../security/encryptions');

middleware.verifyPass = (req, res, next) => {
   if (matchPassword(req.pass)) {
      return next();
   }
   
   return res.json({
      tittle: 'Acceso denegado',
      description: 'Acceso denegado para realizar esta operación!',
      icon: 'error',
      res: 'error'
   });
};

module.exports = middleware;