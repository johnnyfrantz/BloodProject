const express = require("express")
const server = express()

//configurar o servidor para receber arquivo extra

server.use(express.static('public'))

//Abilitar body do formulario
server.use(express.urlencoded({extended: true}))

//configurar a conexao com o banco

const Pool = require('pg').Pool
const db = new Pool({
  user: 'postgres',
  password:'0000',
  host: 'localhost',
  port: 5432,
  database: 'doe'
})

//configurando a template engine

const nunjucks = require("nunjucks")
nunjucks.configure("./", {
  express: server,
  noCache:true,
})

//Lista de doadores 




server.get("/", function(req, res){

  db.query("SELECT *FROM donors", function(err, result){
      if(err) return res.send("gon erè nan baz done a.")

      const donors =result.rows

      return res.render("index.html", {donors})

  })
  
})

server.post("/", function(req, res){
   //Pegar datos de formulario
   const name = req.body.name
   const email = req.body.email
   const blood = req.body.blood

   if (name == "" || email =="" || blood ==""){
     return res.send("fòk ou ranpli tout espas yo net.")
   }
  //Colocar valor dentro do banco do datos
  const query = `
  INSERT INTO donors ("name", "email", "blood")
  VALUES ($1, $2, $3)`
  const values =[name,email,blood]

  db.query(query, values, function(err){
    if (err) return res.send("Gen yon  erè nan baz done a")

    return res.redirect("/")
  })
  
    
})

server.listen(3000)