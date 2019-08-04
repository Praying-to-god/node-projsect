const express = require("express");
const server = express();

//静态资源托管
server.use(express.static("./public"));

server.listen(8080);
