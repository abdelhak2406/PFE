const   express = require('express'),
        mysql = require('mysql2');
        jwt = require('jsonwebtoken')

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


app.post('/api/login', (req, res) => {
    // Check user
    connection.execute(`select id_user from users where email = '${req.body.email}' and password = '${req.body.password}'`, (err, user)=>{
        if (err) res.json({msg: 'Database error!!'})
        else if(user[0] === undefined) res.json({msg: 'Wrong email or password !'})
        else 
            jwt.sign({user}, 'Toufik rkhis', { expiresIn: '3000000s' }, (err, token) => {
                res.json({
                    token
                });
            });
    });
  });

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

app.get('/api/rdvs', (req, res) => {
    connection.execute(`select * from rdvs`, (err, result) => {
        if(err) console.log(err);
        else res.json({rdvs: result});
    });
});


app.get('/api/rdvs/:id_doctor/:day', (req, res) => {
    console.log(`select time_rdv from rdvs where id_doctor = ${req.params.id_doctor} and date(time_rdv) = ${req.params.day}`);
    connection.execute(`select time_rdv from rdvs where id_doctor = ${req.params.id_doctor} and date(time_rdv) = '${req.params.day}'`, (err, result) => {
        if(err) console.log(err);
        else res.json({rdvs: result});
    });
});

app.post('/api/rdvs', (req, res) => {
    connection.execute(
        `insert into rdvs(id_doctor, id_patient, time_rdv) values 
        (${req.body.id_doctor}, ${req.body.id_patient}, '${req.body.time_rdv}')`
    , (err, result) => {
        if(err) res.json({msg: 'Database error...'})
        else res.json({done: true})
    });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
const verifyToken = (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }

app.listen(5000, ()=> console.log('server running...'))