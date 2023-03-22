const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://0l0jjo:admin1234@cluster0.nuiayv2.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function main() {
  await client.connect();
  const test = client.db('mongo').collection('test');

  const deleteResult = await test.deleteMany({});
  if (!deleteResult.acknowledged) return '삭제 에러 발생';

  const insertResult = await test.insertMany([
    {name:'pororo',age: 5},
    {name:'loopy',age: 6},
    {name:'crong',age: 4},
  ]);
  if (!insertResult.acknowledged) return '삽입 에러 발생';
  
  const deleteOneResult = await test.deleteOne({name: 'crong'});
  if (!deleteOneResult.acknowledged) return '삭제 에러 발생';

  const updateOneResult = await test.updateOne(
    {name: 'loopy'},
    {$set: {name: '루피'}}
  );

  if (!updateOneResult.acknowledged) return '수정 에러 발생';
  console.log(updateOneResult);

  client.close();
}

main();
