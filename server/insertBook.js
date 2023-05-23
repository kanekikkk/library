const Pool = require('pg').Pool;
const file = require('fs');

const pool = new Pool({

    user: 'postgres',
    password: 'Narbu36t',
    host: 'localhost',
    port: 5432,
    database: 'library'

});

const pdf = "./E books/Spirituality/The untethered soul - the journey beyond yourself/The-Untethered-Soul-PDF.pdf";
const file_ = file.readFileSync(`${pdf}`);

const image = "./E books/Spirituality/The untethered soul - the journey beyond yourself/59552636.jpg";
const imgFile = file.readFileSync(`${image}`);

new Promise ( (res, rej)=>res(pool.query(`insert into pdf(pdf, image, name, genre) values($1, $2, 'The untethered soul - the journey beyond yourself', Array['Spirituality'])`,[file_, imgFile])));