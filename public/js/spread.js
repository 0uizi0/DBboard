// 객체 합치기
const userData = {
  name: '김은정',
  gender: 'F',
};
const userInfo = {
  nickname: '0l0jjo',
  email: 'test@test.com',
}

const user = {
  ...userData,
  ...userInfo,
}
console.log(user);

// 배열 합치기
const arr1 = [1,2,3,4,5];
const arr2 = ['6','7','8'];
const arr = [...arr1, ...arr2];
console.log(arr);

// 나머지 연산자, 객체
const userDatabase = {
  name: '김은정',
  gender: 'F',
  nickname: '0l0jjo',
  email: 'test@test.com',
};
const {name, ...userInformation} = userDatabase;
console.log(name, userInformation);

// 나머지 연산자, 배열
const [first, ...rest] = [1,2,3,4,5];
console.log(first, rest);

// 매개변수
function spread(firstNum, secondNum, ...restNum) {
  console.log(firstNum);
  console.log(secondNum);
  console.log(restNum);
}
spread(1,2,3,4,5,6,7);