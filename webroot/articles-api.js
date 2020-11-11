const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// articles routes
app.get('/articles', (req, res) => {
    res.json(Articles);
});

app.post('/articles', (req, res) => {
    const article = req.body; // newly defuined from buffer above!

    // Output the book to the console for debugging
    // console.log(article);
    Articles.push(article);

    res.send('Article was added to the database');
});


// article routes
app.get('/article/:articleID', (req, res) => {
    const articleID = req.params.articleID;
    for (let article of Articles) {
        if (article.articleID === articleID) {
            res.json(article);
            return;
        }
    }
    res.status(404).send('article not found');
});

app.delete('/article/:articleID', (req, res) => {
    const articleID = req.params.articleID;

    //console.log(articleID);

    Articles = Articles.filter(i => {
        if (i.articleID !== articleID) {
            return true;
        }
        return false;
    });

    res.send('Article was deleted');
});

app.listen(port, () => console.log(`articles API listening on port ${port}!`))