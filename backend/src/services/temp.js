const str = '(22/12/2022)'
const newStr = str.replace(/[\])}[{(]/g, '');


const data = new Date('22/12/2022').toISOString();

console.log(data)




var dataExclusao = '26/11/2015';
var arrDataExclusao = dataExclusao.split('/');

var stringFormatada = arrDataExclusao[1] + '-' + arrDataExclusao[0] + '-' +
    arrDataExclusao[2];
var dataFormatada1 = new Date(stringFormatada);
var dataFormatada2 = new Date(arrDataExclusao[2], arrDataExclusao[1] - 1, arrDataExclusao[0]);

console.log('Data formatada 1: ' + dataFormatada1);
console.log('Data formatada 2: ' + dataFormatada2);

dataFormatada1.setDate(dataFormatada1.getDate() + 60);
dataFormatada2.setDate(dataFormatada2.getDate() + 90);

console.log('Data formatada + 60 dias: ' + dataFormatada1);
console.log('Data formatada + 90 dias: ' + dataFormatada2);