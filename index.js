const express = require ('express');
const scrapper = require ('./searcher')
const app = express();

app.get('/search/:title', (req, res)=>{
    scrapper.searchMovies(req.params.title)
    .then(movies =>{
        res.json(movies);
    })
})

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listening on ${port}`);
})