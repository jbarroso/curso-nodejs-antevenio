const SENIOR_USER_AGE = 65;
exports.isSeniorUser = (user) => user.age > SENIOR_USER_AGE;
exports.isAcmeEmployee = (user) => user.email.indexOf('acme.com') !== -1;
