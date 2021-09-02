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

const testInsertOneRowWithCorrectNumberFn=()=>new Promise(resolve => {
    connection.query('select * from users', result => {
        const originRows=result.rows.length
        connection.query(`insert into users(id, name, age) values(0, '梅世祺', 22)`,result=>{
            assert(result.affectedRows===1,'Should only affect one row.')
            connection.query('select * from users',result=>{
                assert(result.rows.length===originRows+1)
                console.log('001_insert.js 成功插入一行，通过测试')
                resolve()
            })
        })
    })
})

const testInsertOneRowWithCorrectResultFn=()=>new Promise(resolve => {
    connection.query('select * from users', result => {
        const age=Math.floor(Math.random()*100)
        const id=Math.floor(Math.random()*100)
        connection.query(`insert into users(id, name, age) values(${id}, 'xyz',${age} )`,result=>{
            assert(result.affectedRows===1,'Should only affect one row.')
            connection.query('select * from users',result=>{
                const insertedRow=result.rows[result.rows.length-1]
                assert(insertedRow.id===String(id))//id类型：varchar(255)
                assert(insertedRow.age===age)
                assert(insertedRow.name==='xyz')
                console.log('001_insert.js 预计插入一行的结果正确，通过测试')
                resolve()
            })
        })
    })
})


async function testInsertion(){
    await testInsertOneRowWithCorrectNumberFn()
    await testInsertOneRowWithCorrectResultFn()
}
module.exports={testInsertion}
