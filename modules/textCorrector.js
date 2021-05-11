const superagent = require('superagent');
require('dotenv').config();

const correctText = (req , res ) => {
  const userText = req.query.text ;
  const url = `https://api.promptapi.com/spell/spellchecker` ;
  const queryParams = {
    apikey:process.env.TEXT_CORRECTION_API_KEY , 
    q:userText,
  }
  superagent.get(url).query(queryParams).then(data => {
    const text = getCorrectedText(data.body.corrections , userText);
    res.send(text);
  }).catch(error => res.send(error.status));
}


const getCorrectedText = (data , userText) => {
  let correctedText = userText.split(' ') ;
  data.forEach(data => {
    const index = correctedText.indexOf(data.text);
    correctedText[index] = data.best_candidate ; 
  });

  correctedText = correctedText.join(' ');
  return correctedText ;
}


module.exports = correctText ;
