const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));

app.listen(app.get('port'), () => {
  console.log('Practice oauth server for github');
});