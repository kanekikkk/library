const express = require("express");
const path = require("path");
const pool = require("./connectDatabase");
const PDFDocument = require('pdfkit');
const file = require('fs')
const app = express();

app.use(express.json());  
app.use(express.urlencoded({ extended: false }));
let email, id;
app.use("/", express.static(path.join(__dirname, '..',"dist")));

// server handler

let loginDbValue;
app.post('/signUp', async(req, res)=>{

  
  try{

    const a = await pool.query('insert into login(email, password, username) values($1, $2, $3)', [req.body.email, req.body.password, req.body.name]);

  }catch (err){

    console.log(err);

  }

  res.send(true);

})
app.post('/library', async(req, res)=>{

  try{

    const a = await pool.query(`select id from login where email = '${email}'`);
    const b = await pool.query(`select id from library where profile_id = ${a.rows[0].id}`);


  }catch (err){

    console.log(err);

  }

})
app.post('/addLibrary', async(req, res)=>{

  try{

    const b = await pool.query('insert into library(book_id, profile_id) values($1, $2)', [parseInt(req.body.id), parseInt(id)]);    

  }catch (err){

    console.log(err);

  }

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
    email = a.rows[0].email;
    id = a.rows[0].id;
    loginDbValue = {email : a.rows[0].email, username: a.rows[0].username}

  }catch (err){

    console.log(err);

  }

})
app.post('/pdf', async(req, res)=>{

  try{

    let id = req.body.index;
    value = await pool.query(`select * from pdf where id = ${id}`);
    const buffer = value.rows[0].pdf;
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Length': buffer.length
    });
    res.end(buffer);

  }catch(err){

    console.log(err);

  }

})

app.post('/search', async(req, res)=>{

  let value;
  if(req.body.searchTypeValue === 'All Types'){

    value = await pool.query(`select * from pdf where title like '%${req.body.searchValue}%'`);
    
    let buffers = value.rows.map(value=>{
    
      return ({id: value.id, title: value.title ,src: Buffer.from(value.image).toString('base64')});
    
    });

    res.json(buffers);

  }else{

    value = await pool.query(`select * from pdf where ${req.body.searchTypeValue} like '%${req.body.searchValue}%'`);

  }

})
app.post('/carousel', async(req, res)=>{

  console.log('hello');

  let value = await pool.query(`select * from pdf ORDER BY title limit 10 offset 10`); 
  let buffers = value.rows.map(value=>{
    
    return ({id: value.id, title: value.title ,src: Buffer.from(value.image).toString('base64')});
  
  });

  res.json(buffers);

})
app.post('/carousel2', async(req, res)=>{


  let value = await pool.query(`select * from pdf ORDER BY title limit 10`); 
  let buffers = value.rows.map(value=>{
    
    return ({id: value.id, title: value.title ,src: Buffer.from(value.image).toString('base64')});
  
  });
  
  res.json(buffers);

})
app.post('/carousel2', async(req, res)=>{


  let value = await pool.query(`select * from pdf ORDER BY title limit 10`); 
  let buffers = value.rows.map(value=>{
    
    return ({id: value.id, title: value.title ,src: Buffer.from(value.image).toString('base64')});
  
  });
  
  res.json(buffers);

})
app.post('/filter', async(req, res)=>{

  if(req.body.genre === ''){

    req.body.genre = '%';

  }
  if(req.body.bookType === ''){

    req.body.bookType = '%';

  }
  if(req.body.sortBy === 'Z-A'){

    console.log(req.body.sortBy);
    req.body.sortBy = 'desc';

  }
  if(req.body.sortBy === 'A-Z'){

    console.log('A-Z')
    req.body.sortBy = 'asc';

  }
  let value = await pool.query(`select * from pdf where genre[1] like '${req.body.genre}' order by id ${req.body.sortBy}`); 
  let buffers = value.rows.map(value=>{
    
    return ({id: value.id, title: value.title ,src: Buffer.from(value.image).toString('base64')});
  
  });
  res.json(buffers);

})
app.post('/filter/:id', async(req, res)=>{

  let value = await pool.query(`select * from pdf where genre[1] = '${req.body.type}'`); 
  let buffers = value.rows.map(value=>{
    
    return ({id: value.id, title: value.title ,src: Buffer.from(value.image).toString('base64')});
  
  });
  res.json(buffers);

})

// Site handler
app.post('/feedback', (req, res)=>{

  console.log(req.body);
  res.send(true);

})
app.get('*', (req, res)=>{

    res.sendFile(path.join(__dirname, "..","dist", "index.html"));

})

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Online at port 3000');
});