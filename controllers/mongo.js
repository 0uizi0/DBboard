const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://0l0jjo:admin1234@cluster0.nuiayv2.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect((err) => {
  const test = client.db('mongo').collection('test');
  console.log(test);
  client.close();
})