console.log('webpack run local');

require('./main.css');
// require('style-loader!css-loader?minimize./main.css'); // 可这样指定 文件loader
const show = require('./show.js');

show('Webpack');

console.log('test reload');