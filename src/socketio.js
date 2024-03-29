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
               if (data.numBoleto >= 0 && data.numBoleto <= 99) {
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
                     // Emitir respuesta a todos los clientes [sockets], incluyendo al que emitio
                     // io.sockets.emit('server:gen', resp);

                     // Emitir respuesta a todos los clientes [sockets], excepto al que emitio
                     socket.broadcast.emit('server:gen', resp);

                     // Emitir respuesta al mismo cliente
                     socket.emit('server:resp', {
                        msg: true
                     });
                  } else {
                     socket.emit('server:resp', {
                        msg: false
                     });
                  }
               } else {
                  socket.emit('server:resp', {
                     msg: 'not'
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

         socket.emit('server:searchboleto', boletoS);
      });

      socket.on('disconnect', () => {
         console.log(socket.id, 'disconnected');
      });
   });
};