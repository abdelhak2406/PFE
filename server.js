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
    connection.execute('select firstname, secondname,  from users where type = 1', (err, result) => {
        res.json({result:result[0]});
    });

});

app.get('/api/doctors/:id', (req, res)=>{
    connection.execute(
        `select users.firstname, users.lastname, users.photo,
        doctors.work_phone, doctors.session_duration,
        specialities.speciality_name, 
        addresses.wilaya, addresses.commune, addresses.longitude, addresses.latitude
        from users, doctors, specialities, addresses where users.id_user = ${req.params.id} and doctors.id_doctor = ${req.params.id} and specialities.id_speciality = doctors.id_speciality and addresses.id_address = doctors.id_address
    `
    , (err, result) => {
        connection.execute(`select * from work_days where id_doctor = ${req.params.id}`, (err, workDays) => {
            res.json({doctor:{...result[0], workDays}})
        })
    });
});

app.post('/api/rdvs', (req, res) => {
    connection.execute(``, (err, result) => {
        res.json(result)
    })
})

app.listen(5000, ()=> console.log('server running...'))