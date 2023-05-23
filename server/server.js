const express = require("express");
const path = require("path");
const pool = require("./connectDatabase");
const PDFDocument = require('pdfkit');
const file = require('fs');

const app = express();

app.use(express.json());  
app.use(express.urlencoded({ extended: false }));

app.use("/", express.static(path.join(__dirname, '..',"dist")));

// server handler

let loginDbValue;
app.post('/signUp', async(req, res)=>{

  
  try{

    const a = await pool.query('insert into login(email, password, username) values($1, $2, $3)', [req.body.email, req.body.password, req.body.name]);
    let id = await pool.query(`select id from login where email = '${req.body.email}'`);
    let library = 'library' + id.rows[0].id;
    pool.query(`create table ${library}(id BIGSERIAL primary key, book_id bigint REFERENCES pdf(id), profile_id bigint REFERENCES login(id))`);

  }catch (err){

    console.log(err);

  }

  res.send(true);

})

app.post('/profile', (req, res)=>{

    try{

      res.json(loginDbValue);

    }catch(err){

      console.log(err);

    }

})
app.put('/login', async (req, res)=>{

  try{

    const a = await pool.query('select * from login where email = $1 and password = $2', [req.body.name, req.body.password]);

    if(a.rowCount != 0){

      res.json({msg: "Password match"});
  
    }else{
  
      res.json({msg: "Password didn't match"});
  
    }

    loginDbValue = {email : a.rows[0].email, username: a.rows[0].username}

  }catch (err){

    console.log(err);

  }

})

// Site handler
app.get('*', (req, res)=>{

    res.sendFile(path.join(__dirname, "..","dist", "index.html"));

})
app.post('/search', async(req, res)=>{

  // req.body;
  // let value;
  // if(req.body.searchTypeValue === 'All Types'){

  //   value = await pool.query(`select * from pdf where title like '%${req.body.searchValue}%'`);
  //   value.rows.map(value=> file.writeFileSync(`./pdf/${value.title}.pdf`, value.pdf, err=>console.log(err)));

  // }else{

  //   value = await pool.query(`select * from pdf where ${req.body.searchTypeValue} like '%${req.body.searchValue}%'`);

  // }
  // res.sendFile(path.join(__dirname, "..","pdf", 'pdfasas.pdf'));
  res.sendFile(path.join(__dirname, "..","pdf", 'pdfasas.pdf'));

})
app.post('/feedback', (req, res)=>{

  console.log(req.body);
  res.send(true);

})

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Online at port 3000');
});