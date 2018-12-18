const {isSeniorUser, isAcmeEmployee} = require('./filters');
const users = require('./users.json');

console.log('Senior user names:');
console.log(users.filter(isSeniorUser).map((user) => user.name).join(','));
console.log('\nNumber of ACME\'s employees:');
console.log(users.filter(isAcmeEmployee).length);
