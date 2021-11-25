import axios from 'axios';
import addEntry from './addEntry';

export default async function apiCall(title,body) {
    const options = {
        method: 'POST',
        url: 'https://language.googleapis.com/v1beta2/documents:analyzeSentiment',
        params: {key: "AIzaSyBNE2uNp8YqbYrlGXibusvUiuiZlVFgeR0"},
        data : {
            document:{
              type: "PLAIN_TEXT",
              content: `${body}`
            },
            encodingType :"UTF8"
          }
    };

    return await axios.request(options).then(response => {
        addEntry(response.documentSentiment.score,response.documentSentiment.magnitude,title,body);
    })
    .catch(function (error) {
                console.log(error);
    });

};