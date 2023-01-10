module.exports = (ctx, next) =>
  new Promise((resolve) => {
    console.log(ctx.reqBody);
    let buffer = "";
    ctx.req.on("data", (chunk) => (buffer += chunk));
    ctx.req.on("end", () => {
      try {
        ctx.reqBody = JSON.parse(buffer);
      } catch (e) {
        ctx.reqBody = {};
      }
      resolve();
    });
  }).then(() => next());
