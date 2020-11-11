const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017';

const dbName = 'Articles';

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// articles routes
app.get('/articles', (req, res) => {
    MongoClient.connect(url, function(err, client) {
        const db = client.db(dbName);
        const collection = db.collection('article');
        collection.find({}).toArray(function(err, docs) {
            res.json(docs);
        });
        client.close();
    });
});

app.post('/articles', (req, res) => {
    const article = req.body;
    MongoClient.connect(url, function(err, client) {
        const db = client.db(dbName);
        const collection = db.collection('article');
        collection.insertOne(article, function(err, result) {
            res.send('Article was added to the database');
        });
        client.close();
    });
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