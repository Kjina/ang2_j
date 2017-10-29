const mysql = require('mysql');
const dbInfo = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    port: '3306',
    database: 'ang2'
}

let conn = mysql.createConnection(dbInfo);
let userNO = '1';
let pwd = '1';
//let sql = 'select * from user_info where userid=? and userpwd=?';
let sql = `SELECT UI.*, UH.USERDATA 
            FROM USER_INFO AS UI, USER_HIS AS UH 
            WHERE UI.USERNO = UH.USERNO`;
//let values = [id, pwd] // 배열 Index === Binding Index
let values = [userNO];

const printRows = function (rows) {
    if (rows.length === 0) {
        console.log('Empty');
        return;
    }
    for (var key in rows) {
        var row = rows[key];
        Object.keys(row).map(function (key) {
            let val = row[key];
            console.log(`key [${key}]  val [${val}]`);
        })
    }
}

conn.connect(function (err) {
    
    if (err) throw err;

    conn.query(sql, values, function (err, rows, fields) {
        if(err) throw err;
        printRows(rows)
    });  
});

//conn.end();
