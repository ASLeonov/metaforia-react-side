md5 = require('js-md5')

const pass = '123'
const salt = 'A_93fSo1'

console.log('salted pass', pass, '===', md5(md5(pass) + salt))

