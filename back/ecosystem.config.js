module.exports = {
  apps: [
    {
      name: "gstock",
      script: "dist/server.js",
      env: {
        PORT: "3333",
      },
    },
  ],
};
