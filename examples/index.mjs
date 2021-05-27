import OpenGauss from '../lib' // node-opengauss

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

// 建立新表格 users
// connection.query(`create table users(
//   id varchar(255),
//   name varchar(255),
//   age integer
// )`)

// 增加一条新纪录并查询
connection.query(`insert into
  users(id, name, age)
  values(0, '梅世祺', 22)
`)

// 查询users表中的所有记录
connection.query('select * from users', result => {
  console.log(result)
  // 断开连接
  return connection.disconnect()
})

// 删除记录
// connection.query(`delete from users
//   where age < 30
// `)
// connection.query('select * from users')

// 修改记录
// connection.query(`update users
// set age = 18
// where name = '梅世祺'
// `)
// connection.query('select * from users')