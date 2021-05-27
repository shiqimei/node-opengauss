# node-opengauss

A simple [openGauss](https://opengauss.org) client for Node.js based on [node-postgres](https://github.com/brianc/node-postgres).

## Install

```
npm install node-opengauss --save
```

## Usage

```javascript
import OpenGauss from 'node-opengauss'

const client = new OpenGauss()
const config = {
  host: 'localhost',
  port: 5432,
  username: 'lolimay',
  database: 'postgres',
  password: 'Enmo@123'
}

client.connect(config)
client.query('select current_date', result => {
    console.log(result) // { rows: [ { date: 2021-05-26T16:00:00.000Z } ], affectedRows: 1 }
    return client.disconnect()
})
```

## Development

Development on MacOS/Linux is preferred :)

1. Clone the repo `git clone git@github.com:lolimay/node-opengauss.git`
2. Ensure you have a openGauss instance running, follow this [tutorial](https://www.lolimay.cn/2021/02/19/opengauss/%E4%BD%BF%E7%94%A8docker%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BAOpen%20Gauss%E7%8E%AF%E5%A2%83/) (Chinese Only/仅中文) to set up a local instance with docker

### Run the project

Navigate to `examples` and run following to test driver:

```bash
cd examples
node index.js
```

### For Debugging

For more verbose logs by setting the environment variable `DEBUG` to true:

```bash
DEBUG=true node index.mjs
```

If you need to modify files inside `lib/protocol`, please run following commands to take effects:

```bash
cd lib/protocol
npm run build:watch
```

## Posts

- [借助docker搭建openGauss测试环境 - Shiqi's Blog](https://www.lolimay.cn/2021/02/19/opengauss/%E4%BD%BF%E7%94%A8docker%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BAOpen%20Gauss%E7%8E%AF%E5%A2%83/)
- [openGauss鉴权配置文件pg_hba.conf - Shiqi's Blog](https://www.lolimay.cn/2021/02/23/opengauss/openGauss%E9%89%B4%E6%9D%83%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6pg_hba.conf/)
- [OpenGauss解锁Locked的账号](https://www.lolimay.cn/2021/05/28/opengauss/OpenGauss%E8%A7%A3%E9%94%81Locked%E7%9A%84%E8%B4%A6%E5%8F%B7/)
- [openGauss用户管理](https://www.lolimay.cn/2021/02/25/opengauss/openGauss%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86/)
- [openGauss GUC参数配置](https://www.lolimay.cn/2021/02/25/opengauss/openGauss%20GUC%E5%8F%82%E6%95%B0%E9%85%8D%E7%BD%AE/)
- [gsql命令行客户端工具](https://www.lolimay.cn/2021/02/25/opengauss/gsql%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%B7%A5%E5%85%B7/)

Check [here](https://www.lolimay.cn/categories/opengauss/) for more posts.

## Notes

- [OpenGauss配置客户端接入认证方式](https://opengauss.org/zh/docs/1.0.1/docs/Developerguide/%E9%85%8D%E7%BD%AE%E5%AE%A2%E6%88%B7%E7%AB%AF%E6%8E%A5%E5%85%A5%E8%AE%A4%E8%AF%81.html)
- [OpenGauss的SHA256加密认证的协议细节和PostgresSQL不一致，具体实现请参考此GO语言实现。](https://github.com/opengauss-mirror/openGauss-connector-go-pq/blob/5febca52b422690e85543fcbd56b88d695b8fc30/conn.go#L1298)
- [OpenGauss 的用于SHA256认证鉴权的GO语言实现 - 官方开源代码](https://github.com/opengauss-mirror/openGauss-connector-go-pq/blob/5febca52b422690e85543fcbd56b88d695b8fc30/rfcdigest.go#L76)

## License

Copyright (c) 2021-2021 Shiqi Mei (shiqi.mei@lolimay.cn)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
