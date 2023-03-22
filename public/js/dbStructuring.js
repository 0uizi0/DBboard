// 배열 구조 분해 할당

const today = new Date();
console.log(today);

const formattedDate = today.toISOString().substring(0,10);
console.log(formattedDate);

const [year, month, day] = formattedDate.split('-');
console.log(year, month, day);

// 객체 구조 분해 할당
const obj = {firstName: '은정', lastName:'김'};
const {firstName, lastName} = obj;
console.log(firstName, lastName);

const person = {
  name: 'Kim',
  address: {
    zipCode: '03068',
    city: 'Seoul',
  }
};
const {address: {city, zipCode}} = person;

console.log(city);
console.log(zipCode);