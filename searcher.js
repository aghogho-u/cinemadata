const fetch = require ('node-fetch');
const cheerio = require ('cheerio');
const url = 'https://www.nowshowing.com.ng/';
//const todayMovies = [];

     function  searchMovies (searchTerm) {
   // const youtubeVideos = [];
    
   
    return    fetch(`${url}${searchTerm}`)
    .then(response =>  response.text())
    .then( async html => { 

    
        const $ = cheerio.load(html);
        const todayMovies = [];
        const showtimeArray = [];
        const times = [];
       $('.card').each(async (i, el)=> {
        
           let card = $(el);
           let title = card.find('h2');
           let titleLink = card.find('a');
           let showtime =  card.find('.showtimeBox');
           let timeArray =  card.find('ul>li:nth-child(2)');
           let titleSearch = titleLink.attr('href');
           
           //console.log(todayMovies);
           
            const youtubeLinkItem =  await fetch(`${url}${titleSearch}`)
           .then(response => response.text())
           .then( html => {
                const S = cheerio.load(html);
                let youtubeLink = S('div.card-content>div>div>ul>li>iframe');
                youtubeLink = youtubeLink.attr('src');                                
                 return youtubeLink;
           }).catch((e)=>{console.log(e)})
                //let showtime =  card.find('.showtimeBox');
          //  let showtimeArray = [];
            showtime.each(  (j, el)=> {
            let card = $(el);            
            let cinemaArray =  card.find('h3');
            let cinemas = [];
            cinemaArray.each((k, el)=>{
                let ell = $(el);
                cinema = ell.text();
                cinemas.push(cinema);
            })
//            let timeArray =  card.find('ul>li:nth-child(2)');
//            let times = [];
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
              // Movie_link: titleSearch,
              // Showing: showtimeArray,
               Movie_trailer: youtubeLinkItem
           } 
          // console.log(movie);
           todayMovies.push(movie);
        })
           
      console.log("for each.. ", todayMovies)
    })
  

            
console.log(todayMovies);
      return  todayMovies;
    })
//     .then((todayMovies)=>{
//         console.log(todayMovies)
//         return  todayMovies;
    
// })
    .catch((err) =>{console.log(err)});

    //return  todayMovies;

}


module.exports = {
    searchMovies
};

