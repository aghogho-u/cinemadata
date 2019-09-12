const fetch = require ('node-fetch');
const cheerio = require ('cheerio');
const url = 'https://www.nowshowing.com.ng/';

function  searchMoviesNow (searchTerm) {
    const movies = [];
    return  fetch(`${url}${searchTerm}`)
    .then(response =>  response.text())
    .then(  html => { 
        const $ = cheerio.load(html);
        const myCardArray = $('.card');
        
        myCardArray.each(  (i, el)=>  {
           let card = $(el);          
            title = card.find('h2').text();        
            trailer =  card.find('iframe').attr('src');
            
            cinemasInCard = card.find('h3');
            const cinemaArray = [];
            cinemasInCard.each( (k,el) => {
                ell = $(el);
                cinemaArray.push(ell.text());
            })
           

            let timeArray= [];
            let timeInCard = {};
            for (let k=0; k<cinemaArray.length; k++){
                timeInCard[k]= card.find(`ul>li:nth-child(${k+4})>div>div.item-title`)
            }
            const ObjectToArrays = Object.values(timeInCard);
            for(const x of ObjectToArrays){
                ell = $(x);
                timeArray.push(ell.text());
            }
                        
            const showTime = timeArray.map((item, i) =>{
                return [item, cinemaArray[i]];
            })


          const movie = {
              id: i,
              title,
              trailer,
              showTime
          }
          movies.push(movie);
        })
     
    } ).then(()=>movies)
    .catch((err) =>{console.log(err)});

}

module.exports = {
    searchMoviesNow
};

