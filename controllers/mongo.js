const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://0l0jjo:admin1234@cluster0.nuiayv2.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect((err) => {
  const test = client.db('mongo').collection('test');
  
  test.deleteMany({}, (deleteErr) => {
    if (deleteErr) throw deleteErr;

    // insertOne
    test.insertOne({
      name: 'kej',
      nickname: '0l0jjo',
    }, (insertOneErr, insertOneResult) => {
      if(insertOneErr) throw insertOneErr;
      console.log(insertOneResult); // 데이터 성공 여부 확인

      if(insertOneResult.acknowledged) {
        const findData = test.find({});
        findData.toArray((err, data) => {
          console.log(data); // 데이터 확인
        });
      }
    })

    // insertMany
    test.insertMany([
      {name: 'pororo', age: 5},
      {name: 'loopy', age: 6},
      {name: 'crong', age: 4}
    ], (insertManyErr, insertManyResult) => {
      if (insertManyErr) throw insertManyErr;
      console.log(insertManyResult);
    })
  });
})