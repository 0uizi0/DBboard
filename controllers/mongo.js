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
  
  const deleteOneResult = await test.deleteOne({user: 'crong'});
  if (!deleteOneResult.acknowledged) return '삭제 에러 발생';

  console.log(deleteOneResult);

  client.close();
}

main();

// client.connect((err) => {
//   const test = client.db('mongo').collection('test');
  
//   test.deleteMany({}, (deleteErr) => {
//     if (deleteErr) throw deleteErr;

//     // insertOne
//     test.insertOne({
//       name: 'kej',
//       nickname: '0l0jjo',
//     }, (insertOneErr, insertOneResult) => {
//       if(insertOneErr) throw insertOneErr;
//       console.log(insertOneResult); // 데이터 성공 여부 확인

//       if(insertOneResult.acknowledged) {
//         const findData = test.find({});
//         findData.toArray((err, data) => {
//           console.log(data); // 데이터 확인
//         });
//       }
//     })

//     // insertMany
//     test.insertMany([
//       {name: 'pororo', age: 5},
//       {name: 'loopy', age: 6},
//       {name: 'crong', age: 4}
//     ], (insertManyErr, insertManyResult) => {
//       if (insertManyErr) throw insertManyErr;
//       console.log(insertManyResult);

//       // deleteOne
//       test.deleteOne({name: 'crong'}, (deleteOneErr, deleteOneResult) => {
//         if (deleteOneErr) throw deleteOneErr;
//         console.log(deleteOneResult);
//       })

//       // deleteMany
//       test.deleteMany(
//         { age : { $gte: 5 } },
//         (deleteManyErr, deleteManyResult) => {
//           if (deleteManyErr) throw deleteManyErr;
//           console.log(deleteManyResult);
//         }
//         )
//     })
//   });
// })

// 데이터 수정
// client.connect((err) => {
//   const test = client.db('mongo').collection('test');
  
//   test.deleteMany({}, (deleteErr) => {
//     if (deleteErr) throw deleteErr;

//     test.insertMany([
//       {name: 'pororo', age: 5},
//       {name: 'loopy', age: 6},
//       {name: 'crong', age: 4}
//     ], (insertManyErr, insertManyResult) => {
//       if (insertManyErr) throw insertManyErr;
      
//       // updateOne
//       test.updateOne(
//         {name: 'loopy'},
//         {$set: {name: '루피'}},
//         (updateOneErr, updateOneResult) => {
//           if (updateOneErr) throw updateOneErr;
//           console.log(updateOneResult);
//         }
//       )

//       // updateMany
//       test.updateMany(
//         {age: {$gte: 5}},
//         {$set: {name: '5살 이상인 친구들'}},
//         (updateManyErr, updateManyResult) => {
//           if (updateManyErr) throw updateManyErr;
//           console.log(updateManyResult);
//         }
//       )
//     })
//   });
// })

// 데이터 검색
// client.connect((err) => {
//   const test = client.db('mongo').collection('test');
  
//   test.deleteMany({}, (deleteErr) => {
//     if (deleteErr) throw deleteErr;

//     test.insertMany([
//       {name: 'pororo', age: 5},
//       {name: 'loopy', age: 6},
//       {name: 'crong', age: 4}
//     ], (insertManyErr, insertManyResult) => {
//       if (insertManyErr) throw insertManyErr;
      
//       // findOne
//       test.findOne({name: 'loopy'}, (findOneErr, findOneData) => {
//         console.log(findOneData);
//       })

//       // find
//       const findCursor = test.find({
//         $and: [{age: {$gte:5}}, {name: 'loopy'} ]
//       });
//       console.log(findCursor);
//       findCursor.toArray((toArrErr, toArrData) => {
//         console.log(toArrData);
//       })
//     })
//   });
// })