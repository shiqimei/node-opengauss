# pg-protocol

基于 [pg-protocol](https://github.com/brianc/node-postgres/tree/master/packages/pg-protocol) 做一定修改，以符合 OpenGauss 和 PostgreSQL 中不一致的地方。

###### IMPORTANT

If you need to modify files inside `lib/protocol`, please run following commands to take effects:

```bash
npm run build:watch
```

Since, `core` is developed by JavaScript but `protocol` in TypeScript, remember to rebuild `protocol` once you modified files in this folder.