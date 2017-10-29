// 해당 폴더에 설치 되어 있는 express 모듈을 가져옴
const express = require('express');
const port = 80;
const mysql = require('mysql');
const dbInfo = require('./db_config.js');
const bdParse = require('body-parser');
//const http = require('http');

var con = mysql.createConnection(dbInfo);

var expApp = express();
expApp.set("port",port);
expApp.use(bdParse.urlencoded({extended : false}));
expApp.use(bdParse.json());

//http.createServer().listen(expApp.get("port"));

expApp.get("/",function(req, res){ // 주소 , 주소에대한 응답값 -> 두개를 파라미터로 받음
    var id = req.query.id;
    console.log(id + '를 요청하셧네요');
    res.send("안녕하세요 " + id + "님");
    // http://localhost/?id=박종혁얼큰이
    //res.end('hello express');
})

var func = function(req, res){
    res.send("test 랍니다");
}
expApp.get("/test",func);

/*expApp.get('/user', function(req,res){
    con.query('select * from user_info',function(err,rows){
        if(err) throw err;
        console.log(rows);
        // res.end(rows);
        var resText = "<table border ='1'>";
        for(var key in rows){
            resText+="<tr>";
            var row = rows[key];
            for (var col in row){
                resText += "<td>" + col + ":" + "<b>" +row[col]+ "</b>" + "," +"</td>";
            }
            resText += "</tr>";
        }
        resText += "</table>";
        res.send(resText);
        
    })
})*/

var urlForUserSearch = "/user";
var funcForUserList = function(req, res){
    var userId = req.query.id;
    var userPwd = req.query.pwd;
    var resText = "";
    if(!userId){
        //res.send("검색할 유저아이디를 입력(ex. http://localhost/user?id=tt2 )");
        res.send("유저아이디를 입력하세요.");
    }else if(!userPwd){
        res.send("비밀번호 입력하세요.")
    }else{
        var sql = 'select * from user_info where userId=?';
        var values = [userId];
        con.query(sql, values, function(err,rows){
            if(err) throw err;
            if(rows.length == 0){
                resText = "입력하신 id : " + userId;
                resText += " 와 일치하는 id 가 없습니다. ";
            }else{
                if(userPwd != rows[0].userPwd){
                    resText = "틀린 비밀번호 입니다.";
                }else{
                    resText += userId + "님 환영합니다.";
                }
            }
            res.send(resText);
            //res.send(rows);
        });
       
    }
}
expApp.get(urlForUserSearch, funcForUserList);
expApp.post(urlForUserSearch, funcForUserList);
expApp.listen(expApp.get("port"));