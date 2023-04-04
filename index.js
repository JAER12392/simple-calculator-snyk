
//Hapi framework
const Hapi = require('hapi');

//Address and port
const host = 'localhost';
const port = 5800;

//Create server
const server = Hapi.Server({
    host: host,
    port: port
});

//Routes
require('./routes/routes')(server);

//Start server
const init = async () => {
    await server.start();
    console.log("Server up! Port: " + port);
}

//Start App
init();
