const fs = require('fs');
const c = fs.readFileSync('buying-guide.html', 'utf8');
const m = c.match(/class="[^"]*" data-path="buying-guide"/g);
console.log(m);
