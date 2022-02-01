require('dotenv').config();

const indexControllers = {};

const UsersModel = require('../models/Users');

indexControllers.renderIndex = async (req, res) => {
   let boletos;

   try {
      boletos = await UsersModel
         .find()
         .exec();

      // console.log(boletos);
   } catch (e) {
      console.log(e);
   }

   res.render('index', {
      boletos
   });
};

indexControllers.searchBoleto = async (req, res) => {
   try {
      const boletoS = await UsersModel
         .find()
         .lean();

      res.json({
         data: boletoS
      });
   } catch (e) {
      console.log(e);

      res.json({
         data: 'Sin datos que mostrar'
      });
   }
};

module.exports = indexControllers;