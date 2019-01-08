// Install express server
const { exec } = require('child_process');
const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000;

const command = `json-server --watch db.json --port ${port}`;

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.log('Error running exec', err);
    return;
  }
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
});

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/angular-users'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/angular-users/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4200);
