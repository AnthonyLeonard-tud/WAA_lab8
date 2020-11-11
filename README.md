# WAA_lab8

google
mongodb compass filtering

https://docs.mongodb.com/manual/tutorial/query-documents/

From Mongo DB Compass screen
    find - all results

    {author: "Lucia Mormocea"} -- one

    {Tags: {$in : ["Web development"]}} -- both

    {Tags: {$in : ["BBC Online"]}} -- one

    {likes : {$gt:  25}} -- both

    {likes : {$gt:  35}} -- one

From Mongo DB Compass command like [BETA]
    use Blog

    db.Posts.find( {} )

    db.Posts.find( {author: "Lucia Mormocea"} ) -- one

    db.Posts.find({Tags: {$in : ["Web development"]}}) -- both

    db.Posts.find({Tags: {$in : ["BBC Online"]}}) -- one

    db.Posts.find({likes : {$gt:  25}}) -- both

    db.Posts.find({likes : {$gt:  35}}) -- one