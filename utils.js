module.exports.realtime = function(server, sessionMiddleware){
  var io = require("socket.io")(server);

  // Share session with socket.io
  io.use(function(socket, next){
      sessionMiddleware(socket.request, socket.request.res, next);
  });

  io.sockets.on("connection", function(socket){
    console.log("new socket connection: " + socket.id);

    socket.on("disconnect", function(){
        console.log("Websockets: [disconnect] "+socket.id);
    });

    socket.on("newMessage", function(data){
      console.log("NUEVO MENSAJE");
      console.log(data);
      io.sockets.emit("newMessage", data);
    });
  });
};


module.exports.session = function(){

};
