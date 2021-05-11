const server = require('express');
const cors = require('cors');
const superagent = require('superagent');
require('dotenv').config();

const correctText = require('./modules/textCorrector');

const app = server();
app.use(cors());

const port = process.env.PORT ;

app.get('/' , (req , res) => {
  res.send('server test passed');
})

app.get('/convert' , correctText);




app.listen(port , () => {
  console.log(`you are on port ${port}`);
  return port ;
}
  );