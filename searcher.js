const fetch = require ('node-fetch');
const cheerio = require ('cheerio');
const url = 'https://www.nowshowing.com.ng/';
const todayMovies = [];
let titleSearch;
let itemsProcessed = 0;

     function  searchMovies (searchTerm) {
   
      return  fetch(`${url}${searchTerm}`)
    .then(response =>  response.text())
    .then(  html => { 

    
        const $ = cheerio.load(html);
        const myCardArray = $('.card');
       // const todayMovies = [];
        const showtimeArray = [];
        const times = [];
        
        myCardArray.each(  (i, el)=>  {
           
           let card = $(el);
           let title = card.find('h2');
           let titleLink = card.find('a');
           let showtime =  card.find('.showtimeBox');
           let timeArray =  card.find('ul>li:nth-child(2)');
          // let 
           titleSearch = titleLink.attr('href');
          
            const youtubeVideo =  youtubeLinkItem(searchTerm);

           showtime.each(  (j, el)=> {
            let card = $(el);            
            let cinemaArray =  card.find('h3');
            let cinemas = [];
            cinemaArray.each((k, el)=>{
                let ell = $(el);
                cinema = ell.text();
                cinemas.push(cinema);
            })
        
            timeArray.each((k, el)=>{
                let ell = $(el);
                time = ell.text();
                times.push(time);
            })
            for(let x=0; x<cinemas.length; x++)
                {
                    showtimeArray.push([cinemas[x], times[x]]);
                } 
           const movie =  { 
               id: i,
               Movie_title: title.text(),
               Movie_link: titleSearch,
               Movie_trailer: youtubeVideo,
               Showing: showtimeArray
           } 
          // console.log(movie);
           todayMovies.push(movie);

     
        })
           
     //   console.log("for each.. ", itemsProcessed , myCardArray.length);
       

    })
    console.log("for each.. ", itemsProcessed , myCardArray.length);  

            
// console.log(todayMovies);
 //while( itemsProcessed == myCardArray.length){
    // console.log(todayMovies);
     return todayMovies;
 //}
    })
    .catch((err) =>{console.log(err)});

//    return  todayMovies;

}


    const youtubeLinkItem = () => {return fetch(`${url}${titleSearch}`)
           .then(response => response.text())
           .then( html => {
                const S = cheerio.load(html);
                let youtubeLink = S('div.card-content>div>div>ul>li>iframe');
                youtubeLink = youtubeLink.attr('src');                                
                itemsProcessed ++;
                console.log(youtubeLink, itemsProcessed);
                 return youtubeLink;
           }).catch((e)=>{console.log(e)})
        }



module.exports = {
    searchMovies
};

