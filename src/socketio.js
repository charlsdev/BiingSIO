
const UsuarioModel = require('./models/Users');

module.exports = (io) => {
   io.on('connection', (socket) => {
      console.log(`Usuario conectado con ID ==> ${socket.id}`);

      socket.on('client:newboleto', async (data) => {
         // console.log(data);

         try {
            const boletoS = await UsuarioModel
               .findOne({
                  numBoleto: data.numBoleto
               }, {
                  numBoleto: 1
               })
               .lean();
               
            if (boletoS) {
               socket.emit('server:resp', {
                  msg: 'uso'
               });
            } else {
               const newVenta = new UsuarioModel({
                  apellidos: data.apellidos,
                  nombres: data.nombres,
                  telefono: data.telefono,
                  numBoleto: data.numBoleto,
                  vendedor: data.vendedor
               });
               // console.log(newVenta);
   
               const resp = await newVenta.save();
   
               if (resp) {
                  // Emitir respuesta a todos los clientes [sockets]
                  io.sockets.emit('server:gen', resp);
   
                  // Emitir respuesta al mismo cliente
                  socket.emit('server:resp', {
                     msg: true
                  });
               } else {
                  socket.emit('server:resp', {
                     msg: false
                  });
               }
            }
         } catch (e) {
            console.log(e);

            socket.emit('server:resp', {
               msg: 'error'
            });
         }
      });

      socket.on('client:searchboleto', async (data) => {
         const boletoS = await UsuarioModel
            .findOne({
               numBoleto: data
            }, {
               apellidos: 1,
               nombres: 1,
               telefono: 1,
               numBoleto: 1,
               vendedor: 1,
            })
            .lean();

         console.log(boletoS);

         socket.emit('server:searchboleto', boletoS);
      });

      socket.on('disconnect', () => {
         console.log(socket.id, 'disconnected');
      });
   });
};