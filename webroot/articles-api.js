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

    MongoClient.connect(url, function(err, client) {
        const db = client.db(dbName);
        const collection = db.collection('article');
        const query = { "articleID": articleID };
        collection.findOne(query, function(err, doc) {
            if (err) {
                return res.status(404).send('error');
            } else if (!doc) {
                return res.status(404).send('article not found');
            } else
            //console.log(doc);
                res.status(200).json(doc);
        });
        client.close();
    });
});

app.delete('/article/:articleID', (req, res) => {
    const articleID = req.params.articleID;

    MongoClient.connect(url, function(err, client) {
        const db = client.db(dbName);
        const collection = db.collection('article');
        const query = { "articleID": articleID };
        collection.deleteOne(query, function(err, doc) {
            if (err) {
                return res.status(404).send('error');
            } else if (!doc) {
                return res.status(404).send('article not found');
            } else
            //console.log(doc);
                res.status(200).json(doc);
        });
        client.close();
    });
});

app.put('/article/:articleID', (req, res) => {
    const articleID = req.params.articleID;
    const article = { $set: req.body };

    MongoClient.connect(url, function(err, client) {
        const db = client.db(dbName);
        const collection = db.collection('article');
        const query = { "articleID": articleID };
        collection.updateOne(query, article, { upsert: false }, function(err, result) {
            if (err) throw err
            res.status(200).json(result);
        });
        client.close();
    });
});

app.listen(port, () => console.log(`articles API listening on port ${port}!`))