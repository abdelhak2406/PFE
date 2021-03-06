const   express = require('express'),
        mysql = require('mysql2'),
        jwt = require('jsonwebtoken'),
        path = require('path'),
        multer = require('multer')


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

// FORMAT OF THE TOKEN: Authorization: Bearer <access_token>
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


const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// io.on('connection', () => { /* … */ });
app.use(express.urlencoded({extended: true})); 
app.use(express.json());
// app.use(express.static(path.join(__dirname, './public')));
app.use('/api/uploads', express.static(path.join(__dirname, './uploads')));
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `img-${Date.now()}.${file.mimetype.split('/')[1]}`)
    }
})
var upload = multer({ storage: storage });

app.post('/api/login', (req, res) => {
    // Get the user if exists
    connection.execute(`select id_user, type, firstname, lastname from users where email = '${req.body.email}' and password = '${req.body.password}'`, (err, user)=>{
        if (err) res.json({msg: 'Database error!!'})
        else if(user[0] === undefined) res.json({msg: 'Wrong email or password !'})
        else 
            jwt.sign({user: user[0]}, 'Toufik rkhis', { expiresIn: '999999999999999s' }, (err, token) => {
                res.json({
                    token
                });
            });
    });
});

app.get('/api/user', verifyToken, (req, res) => {
    jwt.verify(req.token, 'Toufik rkhis', (err, authData) => {
        if(err) {
          res.json({status: false});
        } 
        else {
            res.json({user: authData.user});
        }
      });
})


// inscription  du patient 
app.post('/api/patients', (req, res) => {
    connection.execute(`select email from users where email = '${req.body.email}'`, (err, result) => {
        if(err) console.log(err);
        else if(result[0] != undefined) res.json({msg: 'Email deja existe !'})
        else {
            connection.execute(`insert into users (firstname, lastname, email, password, birth_date, phone , type , sex ) values
                ('${req.body.firstname}', '${req.body.lastname}' , '${req.body.email}' ,
                '${req.body.password}'  ,'${req.body.birthdate}','${req.body.phone}', 2 , ${req.body.sex})`
                ,(err, user) => {
                if(err) {
                    console.log(err);
                    res.json({msg:'DATABASE error!'})
                }
                else {
                    connection.execute(`insert into patients(id_patient) values(${user.insertId})`, (err, patient)=> {
                        if(err) {
                            console.log(err);
                            res.json({msg:'DATABASE error!'})
                        }
                        else res.json({done: true}); 
                    })
                }
           })
        }
    })
});

// inscription  du medecin 
app.post('/api/doctors', (req, res) => {
    connection.execute(`select email from users where email = '${req.body.email}'`, (err, result) => {
        if(err) console.log(err);
        else if(result[0] != undefined) res.json({msg: 'Email deja existe !'})
        else {
            connection.execute(`insert into users (firstname, lastname, email, password, birth_date, phone , type , sex ) values
                ('${req.body.firstname}', '${req.body.lastname}' , '${req.body.email}' ,
                '${req.body.password}'  ,'${req.body.birthdate}','${req.body.phone}', 1 , ${req.body.sex})`
                ,(err, user) => {
                if(err) {
                    console.log(err);
                    res.json({msg:'DATABASE error!'})
                }
                else {
                    connection.execute(`insert into addresses(longitude, latitude, wilaya, commune) values
                    (${req.body.longitude}, ${req.body.latitude}, '${req.body.wilaya}', '${req.body.commune}')`
                    ,(err, address)=>{
                        if(err) {
                            console.log(err);
                            res.json({msg:'DATABASE error!'})
                        }
                        else
                            connection.execute(`insert into forms(licence_photo, card_photo) values 
                            ('${req.body.licence}', '${req.body.card}')`, (err, form)=>{
                                if(err) {
                                    console.log(err);
                                    res.json({msg:'DATABASE error!'})
                                }
                                else
                                    connection.execute(`insert into doctors(id_doctor, id_speciality, id_address, id_form, work_phone, session_duration) values
                                    (${user.insertId}, ${req.body.id_speciality}, ${address.insertId}, ${form.insertId}, '${req.body.work_phone}', ${req.body.session_duration})`
                                    , (err, doctor) => {
                                        if(err) {
                                            console.log(err);
                                            res.json({msg:'DATABASE error!'})
                                        }
                                        else {
                                            let array = [];
                                            req.body.work_days.forEach(day => {
                                                array.push([day.day_number, user.insertId, day.start_time, day.nbr_sessions]);
                                            });
                                            connection.query("insert into work_days(day_number, id_doctor, start_time, nbr_sessions) values ?"
                                            , [array], (err, days)=> {
                                                if(err) {
                                                    console.log(err);
                                                    res.json({msg:'DATABASE error!'});
                                                }
                                                else  res.json({done: true}); 
                                            })
                                        }
                                    })
                            })
                    })
                }
           })
        }
    })
});

app.get('/api/doctors/search', (req, res) => {
    connection.execute(`select users.id_user, users.firstname, users.lastname, users.photo,
    specialities.speciality_name, addresses.wilaya
    from users, doctors, specialities, addresses where users.type = 1 and doctors.id_doctor = users.id_user 
    and specialities.id_speciality = doctors.id_speciality 
    and addresses.id_address = doctors.id_address 
    and (concat(firstname, ' ', lastname) like '${req.query.text}%' or concat(lastname, ' ', firstname) like '${req.query.text}%') 
    ${req.query.speciality == 0? '': `and specialities.id_speciality = ${req.query.speciality}`} 
    ${req.query.wilaya == ''? '': `and addresses.wilaya = '${req.query.wilaya}' `}
    `
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

app.get('/api/rdvs/patient/:id_patient', (req, res) => {
    connection.execute(`select rdvs.time_rdv, rdvs.state, rdvs.id_doctor,
    users.firstname, users.lastname, users.photo, users.phone
    from rdvs, users where rdvs.id_patient = ${req.params.id_patient} and users.id_user = rdvs.id_doctor`, (err, result) => {
        if(err) console.log(err);
        else 
            res.json({rdvs: result});
    });
});

app.get('/api/rdvs/:id_doctor/:day', (req, res) => {
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

app.post('/api/rdvs/remove', (req, res) => {
    connection.execute(
        `delete from rdvs where id_doctor = ${req.body.id_doctor} and time_rdv = '${req.body.time_rdv}'`
    , (err, result) => {
        if(err) res.json({msg: 'Database error...'})
        else res.json({done: true})
    });
});

app.get('/api/physical-rdvs/:id_doctor/:day', (req, res) => {
    connection.execute(`select time_rdv from physical_rdvs where id_doctor = ${req.params.id_doctor} and date(time_rdv) = '${req.params.day}'`, (err, result) => {
        if(err) console.log(err);
        else res.json({rdvs: result});
    });
});

app.post('/api/physical-rdvs', (req, res) => {
    connection.execute(
        `insert into physical_rdvs(id_doctor, time_rdv) values 
        (${req.body.id_doctor}, '${req.body.time_rdv}')`
    , (err, result) => {
        if(err) res.json({msg: 'Database error...'})
        else res.json({done: true})
    });
});

app.get('/api/specialities', (req, res) => {
    connection.execute(`select * from specialities`, (err, specialities) => {
        if(err) console.log(err);
        else res.json({specialities});
    })
})

app.get('/api/wilayas', (req, res)=>{
    connection.execute('select distinct wilaya from addresses', (err, wilayas)=>{
        if(err) console.log(err);
        else res.json({wilayas})
    })
});

app.post('/api/images', upload.single('image'),(req, res) => {
    // req.file is the `image` file
    // req.body will hold the text fields, if there were any   
    res.json({url: `http://localhost:5000/api/uploads/${req.file.filename}`});  
});

app.get('/api/favorites/:id_patient', (req, res)=>{
    connection.execute(`select users.id_user, users.firstname, users.lastname, users.photo,
    specialities.speciality_name, addresses.wilaya
    from users, doctors, specialities, addresses where users.type = 1 and doctors.id_doctor = users.id_user 
    and specialities.id_speciality = doctors.id_speciality 
    and addresses.id_address = doctors.id_address 
    and users.id_user in (select id_doctor from favorites where id_patient = ${req.params.id_patient})
    `
    , (err, result) => {
        if(err) console.log(err);
        else res.json({doctors: result});
    });
})

app.post('/api/favorites/add', (req, res)=>{
    connection.execute(`insert into favorites(id_doctor, id_patient) values (${req.body.id_doctor}, ${req.body.id_patient})`, (err, result)=>{
        if(err) console.log(err);
        else res.json({status: true});
    })
})

app.post('/api/favorites/remove', (req, res)=>{
    connection.execute(`delete from favorites where id_doctor = ${req.body.id_doctor} and id_patient = ${req.body.id_patient}`, (err, result)=>{
        if(err) console.log(err);
        else res.json({status: true});
    })
})

app.get('/api/favorites/:id_doctor/:id_patient', (req, res)=>{
    connection.execute(`select * from favorites where id_doctor = ${req.params.id_doctor} and id_patient =  ${req.params.id_patient}`
    , (err, result)=>{
        if(err) console.log(err);
        else if(result[0]) res.json({status: true})
        else res.json({status: false});
    })
})

app.get('/api/messages/:id_doctor/:id_patient', (req, res) =>{
    // console.log(req.query);
    connection.execute(
        `select * from messages where id_message > ${req.query.id} and 
        ((id_sender = ${req.params.id_doctor} and id_receiver =${req.params.id_patient})
        or(id_sender = ${req.params.id_patient} and id_receiver =${req.params.id_doctor}))`
        ,(err, messages)=>{
            if(err) console.log(err);
            else res.json({messages})
    })
})

app.post('/api/messages/', (req, res) =>{
    connection.execute(`insert into messages (id_sender, id_receiver, text, date_message) values 
        (${req.body.id_sender}, ${req.body.id_receiver}, '${req.body.text}', now() )`
        ,(err, messages)=>{
            if(err) console.log(err);
            else res.json({done: true})
    })
})
    

// io.on('connection', (socket)=>{
//     // socket.emit('message', 'welcome to chat..');
//     socket.on('join', roomId => {
//         socket.join(roomId);
//     });

//     socket.on('chatMessage', (message)=>{
//         io.in(roomId).emit('message', message)    
//         console.log(message);    
//         // connection.execute(
//         //     `insert into messages ( text, id_sender, id_receiver) values 
//         //     ('${message.text}',${message.id_sender}, ${message.id_receiver} ) `
//         // , (err, result)=>{
//         //     if(err) console.log(err)    
//         //     else console.log(result);            
//         // } )
//     })
// })




server.listen(5000, ()=> console.log('server running...'))