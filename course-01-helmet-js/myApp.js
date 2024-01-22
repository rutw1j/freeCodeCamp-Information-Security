const express = require("express");
const app = express();
const helmet = require("helmet");

// /* 02 Hide Potentially Dangerous Information Using helmet.hidePoweredBy() */
// app.use(helmet.hidePoweredBy());
// /* 02 Hide Potentially Dangerous Information Using helmet.hidePoweredBy() */

// /* 03 Mitigate the Risk of Clickjacking with helmet.frameguard() */
// app.use(helmet.frameguard({ action: "deny" }));
// /* 03 Mitigate the Risk of Clickjacking with helmet.frameguard() */

// /* 04 Mitigate the Risk of Cross Site Scripting (XSS) Attacks with helmet.xssFilter() */
// app.use(helmet.xssFilter());
// /* 04 Mitigate the Risk of Cross Site Scripting (XSS) Attacks with helmet.xssFilter() */

// /* 05 Avoid Inferring the Response MIME Type with helmet.noSniff() */
// app.use(helmet.noSniff());
// /* 05 Avoid Inferring the Response MIME Type with helmet.noSniff() */

// /* 06 Prevent IE from Opening Untrusted HTML with helmet.ieNoOpen() */
// app.use(helmet.ieNoOpen());
// /* 06 Prevent IE from Opening Untrusted HTML with helmet.ieNoOpen() */

// /* 07 Ask Browsers to Access Your Site via HTTPS Only with helmet.hsts() */
// const ninetyDaysInSeconds = 90 * 24 * 60 * 60;
// app.use(helmet.hsts({ maxAge: ninetyDaysInSeconds, force: true }));
// /* 07 Ask Browsers to Access Your Site via HTTPS Only with helmet.hsts() */

// /* 08 Disable DNS Prefetching with helmet.dnsPrefetchControl() */
// app.use(helmet.dnsPrefetchControl());
// /* 08 Disable DNS Prefetching with helmet.dnsPrefetchControl() */

// /* 09 Disable Client-Side Caching with helmet.noCache() */
// app.use(helmet.noCache());
// /* 09 Disable Client-Side Caching with helmet.noCache() */

// /* 10 Set a Content Security Policy with helmet.contentSecurityPolicy() */
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", "trusted-cdn.com"],
//     },
//   }),
// );
// /* 10 Set a Content Security Policy with helmet.contentSecurityPolicy() */

/* 11 Configure Helmet Using the ‘parent’ helmet() Middleware */
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(
  helmet({
    hidePoweredBy: true,
    frameguard: {
      action: "deny",
    },
    xssFilter: true,
    noSniff: true,
    ieNoOpen: true,
    hsts: {
      maxAge: ninetyDaysInSeconds,
      force: true,
    },
    dnsPrefetchControl: false,
    noCache: true,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "trusted-cdn.com"],
      },
    },
  }),
);
/* 11 Configure Helmet Using the ‘parent’ helmet() Middleware */

module.exports = app;
const api = require("./server.js");
app.use(express.static("public"));
app.disable("strict-transport-security");
app.use("/_api", api);

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
