const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT

app.use(express.static(__dirname + '/src'));

app.listen(port, () => {
  console.log(`listening on ${port}`)
});

app.get('/*', function (req,res) {
  res.sendFile(path.join(__dirname + '/src/index.html'));
})

