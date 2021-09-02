const OpenGauss = require('../lib/index') // node-opengauss
const assert=require('assert')
const client = new OpenGauss() // 实例化 OpenGauss 客户端

/**
 * 测试用户: gaussdb (md5认证)
 *          lolimay (sha256)
 */

const config = { // 连接数据库
    host: 'localhost', // 数据库主机名
    port: 5432, // 数据库端口
    username: 'lolimay', // 数据库用户名
    database: 'postgres', // 数据库名
    password: 'Enmo@123'  // 数据库用户密码
}

client.connect(config)

const connection = client

const testSelectAllWithAllRecordsFn=()=>new Promise(resolve => {
    connection.query('select * from users', result => {
        const previousLength=result.rows.length
        const record={id:Math.floor(Math.random()*100),name:'xyz',age:Math.floor(Math.random()*100)}
        connection.query(`insert into users(id, name, age) values(${record.id}, '${record.name}', ${record.age})`,result=>{
            connection.query('select * from users',result=>{
                //console.log('002_query.js 成功获得表中所有记录，通过测试')
                assert((previousLength+1)===result.rows.length)
                console.log('002_query.js 成功获得表内所有记录，通过测试')
                resolve()
            })
        })
    })
})


const testSelectColumnsWithAllRecordsFn=()=>new Promise(resolve => {
    const columns=['id','name']
    connection.query('select * from users', result => {
        console.log(result.rows[0].keys)
        if(result.rows.length){
            connection.query(`select ${columns[0]},${columns[1]} from users`,result=>{
                const resultColumns=Object.keys(result.rows[0])
                assert(columns[0]===resultColumns[0])
                assert(columns[1]===resultColumns[1])
                console.log('002_query.js 成功获得选定列的数据，通过测试')
                resolve()
            })
        }
    })
})


async function testQuery(){
    //await testSelectAllWithAllRecordsFn()
    await testSelectColumnsWithAllRecordsFn()
}
module.exports={testQuery}
