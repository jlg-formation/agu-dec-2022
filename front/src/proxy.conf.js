const winston = require("winston");

function logProvider() {
  return winston.createLogger({
    level: "debug",
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.simple()
    ),
    transports: [new winston.transports.Console()],
  });
}

const proxyConfig = {
  "/api": {
    target: "http://localhost:3000",
    secure: false,
    logLevel: "debug",
    logProvider: logProvider,
  },
  "/truc": {
    target: "http://localhost:3000",
    secure: false,
    ws: true,
  },
};

module.exports = proxyConfig;
