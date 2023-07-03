const Pool = require('pg').Pool;
const file = require('fs');

const pool = new Pool({

    user: 'postgres',
    password: 'Narbu36t',
    host: 'localhost',
    port: 5432,
    database: 'library'

});

const a = new Promise ( (res, rej)=>res(pool.query('select * from pdf where id = 1')));
a.then(val=>{

    const bufferToBase64 = Buffer.from(val.rows[0].image).toString('base64')
    console.log(bufferToBase64);
    // file.writeFileSync('./pdf/pdfasas.pdf', val.rows[0].pdf, err=>console.log(err));
    // const doc = new PDFDocument();
    // doc.pipe(file.createWriteStream('output.pdf'));

    // val.rows.forEach((row) => {
    //     doc.text(row.column_name);
    // });

    // doc.end();

    // const f = file.readFileSync('output.pdf');
    // console.log(f);

});