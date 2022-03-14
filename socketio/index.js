const socketServer = require("./server");
const port = process.env.PORT || 4000;

socketServer.listen(port, () =>
  console.log(`Socket server is currently running on port: ${port}.`)
);
