const express = require ('express');
const scrapper = require ('./searchNow')
const app = express();

app.get('/:title', (req, res)=>{
    scrapper.searchMoviesNow(req.params.title)
    .then(movies =>{
        res.json(movies);
    })
})

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listening on ${port}`);
})