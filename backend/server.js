const http = require("http");
const app = require("./app");

// renvoie un port valide sous forme de chaîne ou de numéro.
const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// recherche et gestion des différentes erreurs
const errorHandler = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === "string" ? "pipe " + address : "port: " + port;
    switch (error.code) {
        case "EACCES": // accès refusé
            console.error(bind + " requires elevated privileges.");
            process.exit(1);
            break;
        case "EADDRINUSE": // port déjà utilisé
            console.error(bind + " is already in use.");
            process.exit(1);
            break;
        default:
            throw error;
    }
};
// crée un serveur avec express qui utilise app, et crée une constante pour les appels au serveur (req + res).
const server = http.createServer(app);
// lance le serveur et écoute s'il y a des erreurs.
server.on("error", errorHandler);
// écouteur d'événements avec port d'écoute sur lequel le serveur s'exécute.
server.on("listening", () => {
    const address = server.address();
    const bind = typeof address === "string" ? "pipe " + address : "port " + port;
    console.log("Listening on " + bind);
});
// le serveur écoute sur le port défini au dessus.
server.listen(port);
