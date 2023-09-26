const { MongoClient, ServerApiVersion } = require("mongodb");

// mongo DB client
const client = new MongoClient(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// database and collections
let database = client.db('equiJurisAssociates')
let userCollection = database.collection('users')
let caseCollection = database.collection('cases')

module.exports = {
    client,
    userCollection,
    caseCollection
}