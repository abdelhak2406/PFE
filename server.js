const express = require('express'),
      mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'aymen',
    password: 'aymen',
    database: 'db',
    port: '3306'
});

connection.connect(function(error){
    if(error){
      console.log(error);
    }else{
      console.log('Connected!:)');
    }
});


const app = express();
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.get('/api/doctors', (req, res)=>{
    connection.query('select * from users', (err, result) => {
        res.json({result});
    });

})

app.listen(5000, ()=> console.log('server running...'))