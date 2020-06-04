const express = require('express');
const app = express();
const path = require('path');

app.use(app.static(__dirname + '/dist'));

app.listen(process.env.PORT || 8080);

app.get('/*', function (req,res) {
  app.sendFile(path.join(__dirname + '/dist/index.html'));
})

console.log('console listening')
