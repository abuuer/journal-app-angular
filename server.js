const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080

app.use(express.static(__dirname + '/dist/review-app'));
app.listen(port, () => {
  console.log(`listening on ${port}`)
});

app.get('/*', function (req,res) {
  res.sendFile(path.join(__dirname + '/dist/review-app/index.html'));
})

