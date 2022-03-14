const socketServer = require("./server");
const port = process.env.PORT || 7000;

socketServer.listen(port, () =>
  console.log(`Socket server is currently running on port: ${port}.`)
);
