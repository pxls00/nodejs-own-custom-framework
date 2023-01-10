const http = require("http");

const combineFunction = require("./combine-functions");

module.exports = class Framework {
  constructor() {
    this.middleware = [];
  }

  use(fn) {
    this.middleware.push(fn);
  }

  listen(...args) {
    return http.createServer(this.handle()).listen(...args);
  }

  handle() {
    const fns = combineFunction(this.middleware);
    return (req, res) => {
      const ctx = { req, res };
      fns(ctx)
        .then(() => this.finishResponse(ctx))
        .catch((e) => {
          console.log(e);
          res.writeHead(500, { "Content-type": "text/plain" });
          res.end("Error");
        });
    };
  }

  finishResponse(ctx) {
    const {
      res,
      status = 200,
      contentType = "application/json",
      body = "",
    } = ctx;
    res.writeHead(status, { "Content-type": contentType });
    res.end(contentType === "application/json" ? JSON.stringify(body) : body);
  }
};
