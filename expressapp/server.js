const expres  = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname +'/dist/LoginRegistration'));
app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname+'/dist/LoginRegistration/frontend/index.html'));

}
);

app.listen(process.env.PORT || 8080);