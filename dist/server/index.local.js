"use strict";
var app = require('./index');
var port = 3000;
app.listen(process.env.PORT);
console.log("listening on http://localhost:" + port);
