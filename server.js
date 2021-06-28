const   express = require('express'),
        mysql = require('mysql2');
        jwt = require('jsonwebtoken')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'user',
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
    // Get the user if exists
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


// inscription  du patient 
app.post('/api/patients/register', (req, res) => {
    console.log(req.body);
      connection.execute(`insert into users (firstname,lastname, email, password,  birth_date, phone , type , sex ) values
       ('${req.body.firstname}', '${req.body.lastname}' , '${req.body.email}' ,
       '${req.body.password}'  ,'${req.body.birthdate}','${req.body.phone}', 2 , 1)`
      , (err, users) => {
            if(err) {
                console.log(err);
                res.json({msg:'DATABASE error!'})
            }
            else    res.json({done: true}); 
      })
      
});


app.get('/api/doctors', (req, res) => {
    connection.execute(`select users.firstname, users.lastname, users.photo,
    specialities.speciality_name, addresses.wilaya
    from users, doctors, specialities, addresses where users.type = 1 and doctors.id_doctor = users.id_user 
    and specialities.id_speciality = doctors.id_speciality 
    and addresses.id_address = doctors.id_address 
    and (concat(firstname, ' ', lastname) like '${req.query.text}%' or concat(lastname, ' ', firstname) like '${req.query.text}%') `
    , (err, result) => {
        if(err) console.log(err);
        else res.json({doctors: result});
    });
});

app.get('/api/doctors/:id', (req, res)=>{
    connection.execute(
        `select users.firstname, users.lastname, users.photo,
        doctors.work_phone, doctors.session_duration,
        specialities.speciality_name, 
        addresses.wilaya, addresses.commune, addresses.longitude, addresses.latitude
        from users, doctors, specialities, addresses where users.id_user = ${req.params.id} and doctors.id_doctor = ${req.params.id} and specialities.id_speciality = doctors.id_speciality 
        and addresses.id_address = doctors.id_address`
    , (err, result) => {
        connection.execute(`select * from work_days where id_doctor = ${req.params.id}`, (err, workDays) => {
            res.json({doctor:{...result[0], workDays}})
        })
    });
});

app.get('/api/rdvs/:id_doctor', (req, res) => {
    connection.execute(`select session_duration from doctors where id_doctor = ${req.params.id_doctor}`, (err, session) => {
        if(err) console.log(err);
        else 
            connection.execute(`select rdvs.time_rdv, rdvs.state, 
            users.id_user, users.firstname, users.lastname, users.photo, users.phone
            from rdvs, users where rdvs.id_doctor = ${req.params.id_doctor} and users.id_user = rdvs.id_patient`, (err, result) => {
                if(err) console.log(err);
                else 
                    connection.execute(`select * from work_days where id_doctor = ${req.params.id_doctor}`, (err, workDays) => {
                        if(err) console.log(err);
                        res.json({rdvs: result, sessionDuration:session[0].session_duration, workDays: workDays});
                    })
            });
    })
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


// FORMAT OF THE TOKEN: Authorization: Bearer <access_token>

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