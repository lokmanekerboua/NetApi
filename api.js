const client = require('./database.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(3300, ()=>{
    console.log("server listening on 3300");
})

client.connect();

//---------------------------------get all-------------------------------------------
app.get('/users',(req,res)=>{
    client.query('SELECT company, name, birthyear, role, type, password, email, username FROM public.users;',(err, result)=>{
        if(!err){
            res.send(result.rows);
        }
        else{
            console.log(err.message);
        }
    });
});

//--------------------------------------------post user (add user)--------------------------------------

app.post('/users',(req, res)=>{
    const user = req.body;
    
    let insertQuery = `INSERT INTO public.users(company, name, birthyear, password, email, username) VALUES ('${user.company}','${user.name}', ${user.birthyear},'${user.password}', '${user.email}','${user.username}');`;

    client.query(insertQuery,(err, result)=>{
        if(!err){
            res.send('Success');
        }
        else if(err.message === 'duplicate key value violates unique constraint "users_username_key"'){
            res.send('usernameerror');
        }
        else{
            res.send('error');
        }
    })
})


//---------------------------------get by username nd password-------------------------------------------

app.post('/users/log',async (req, res)=>{
    const { username , password} = req.query;

    const user = await client.query('Select password , username from users where username=$1',[username]);
    if(user.rows.length ===0){
        res.send('errorcredentials');
    }
    else if(password !== user.rows[0].password){
        res.send('errorpassword');
    }
    else{
        res.send('success');
    }
});


//--------------------------------------put (update)--------------------------------------

app.put('/users/:id',(req, res)=>{
    let user = req.body;
    let updateQuery = 'update names set name = '+"'" + user.name +"'"+ ', age = ' + user.age +' where id = '+user.id+';';
    client.query(updateQuery,(err, result)=>{
        if(!err){
            res.send('Update successfully');
        }
        else{
            console.log(err.message);
        }
    })
});

//------------------------------------------delete------------------------------------------

app.delete('/users/:username',(req,res)=>{
    let user = req.body;
    let deleteQuery = 'delete from names where id = ' + user.id+';';
    client.query(deleteQuery,(err,result)=>{
        if(!err){
            res.send('delete successfully');
        }
        else{
            console.log('uknown error');
        }
    })
});


//--------------------------------------get all directions---------------------------------
app.get('/directions',(req,res)=>{
    client.query("SELECT name, description FROM public.direction;",(err, result)=>{
        if(!err){
            res.send(result.rows);
        }
        else{
            console.log(err.message);
        }
    });
});

//-------------------------------------------delet one departement------------------------------------------
app.delete('/directions/:department',(req,res)=>{
    let department = req.params.department;
    client.query(`DELETE FROM public.hotes WHERE direction = $1;`,[department],(err, result)=>{
        if(!err){
            client.query(`DELETE FROM public.direction WHERE name = $1`,[department])
            res.send('Success');
        }
        else{
            console.log(err.message);
        }
    });
    
});

//--------------------------------------get all direction DEVICES--------------------------------
app.get('/devices/:direction',(req,res)=>{
    let direction = req.params.direction;
    client.query('SELECT name, ip, bloc, floor, direction, type FROM public.hotes WHERE direction = $1 ;',[direction],(err, result)=>{
        if(!err){
            res.send(result.rows);
        }
        else{
            console.log(err.message);
        }
    });
});

//---------------------------------------------------delete one device from department---------------------------------------

app.delete('/devices',(req,res)=>{
    let device = req.body;
    client.query(`DELETE FROM public.hotes WHERE name = '${device.name}'AND ip = '${device.ip}' AND bloc ='${device.bloc}' AND floor=${device.floor} AND direction = '${device.direction}' AND type = '${device.type}';`,(err, result)=>{
        if(!err){
            res.send('Success');
        }
        else{
            console.log(err.message);
        }
    });
    
});



//--------------------------------------------post direction (add direction)--------------------------------------

app.post('/directions',(req, res)=>{
    const direction = req.body;
    
    let insertQuery = `INSERT INTO public.direction(name, description) VALUES ( '${direction.name}', '${direction.description}');`;
    client.query(insertQuery,(err, result)=>{
        if(!err){
            res.send('Success');
        }
        else{
            res.send('error');
        }
    })
})




//--------------------------------------get all net devices----------------------------------------------
app.get('/netdevices',(req,res)=>{
    
    client.query('SELECT name, type, bloc, floor	FROM public.netdevices;',(err, result)=>{
        if(!err){
            res.send(result.rows);
        }
        else{
            console.log(err.message);
        }
    });
});

//--------------------------------------add Net Device ----------------------------------------------------

app.post('/netdevices',(req, res)=>{
    const netDEv = req.body;
    
    let insertQuery = `INSERT INTO public.netdevices(name, type, bloc, floor) VALUES ('${netDEv.name}','${netDEv.type}','${netDEv.bloc}',${netDEv.floor});`;
    client.query(insertQuery,(err, result)=>{
        if(!err){
            res.send('Success');
        }
        else{
            res.send('error');
        }
    })
})

//------------------------------------------delet net device---------------------------------------------------------
app.delete('/netdevices',(req,res)=>{
    let device = req.body;
    client.query(`DELETE FROM public.netdevices WHERE name = '${device.name}' AND type = '${device.type}' AND bloc = '${device.bloc}' and floor = ${device.floor};`,(err, result)=>{
        if(!err){
            res.send('Success');
        }
        else{
            console.log(err.message);
        }
    });
    
});

//--------------------------------------get all Pane devices----------------------------------------------
app.get('/panedevices',(req,res)=>{
    
    client.query('SELECT id, name, type, bloc, floor, "desc", degree FROM public.panes;',(err, result)=>{
        if(!err){
            res.send(result.rows);
        }
        else{
            console.log(err.message);
        }
    });
});

//----------------------------------------ADD DEVICE TO PANE LIST-----------------------------------------

app.post('/panedevices',(req, res)=>{
    const paneDEv = req.body;
    
    let insertQuery = `INSERT INTO public.panes(name, type, bloc, floor, "desc", degree) VALUES ('${paneDEv.name}','${paneDEv.type}','${paneDEv.bloc}',${paneDEv.floor},'${paneDEv.description}','${paneDEv.degree}');`;
    client.query(insertQuery,(err, result)=>{
        if(!err){
            res.send('Success');
        }
        else{
            res.send('error');
        }
    })
})

//-------------------------------------------delete one device from panne list ----------------------------------------------------
app.delete('/panedevices',(req,res)=>{
    let device = req.body;
    client.query(`DELETE FROM public.panes WHERE name = '${device.name}'AND type = '${device.type}' AND bloc ='${device.bloc}' AND floor=${device.floor};`,(err, result)=>{
        if(!err){
            res.send('Success');
        }
        else{
            console.log(err.message);
        }
    });
    
});



//--------------------------------------------------------add NEW Hote-------------------------------------------------------
app.post('/addnewHote',(req, res)=>{
    const newDEv = req.body;
    
    let insertQuery = `INSERT INTO public.hotes(name, ip, bloc, floor, direction, type) VALUES ('${newDEv.name}','${newDEv.ip}','${newDEv.bloc}',${newDEv.floor},'${newDEv.direction}','${newDEv.type}');`;
    client.query(insertQuery,(err, result)=>{
        if(!err){
            res.send('Success');
        }
        else{
            res.send('error');
        }
    })
})