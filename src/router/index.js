const fs = require('fs') // 文件模块
const Router = require('koa-router')
const { swaggerJson } = require('../utils/swagger')

const router = new Router()

fs.readdirSync(__dirname).forEach(file => {
    if (file !== 'index.js') {
        let r = require('./' + file)
        router.use(r.routes())
    }
})

// 随便写的一个欢迎
router.get('/', (ctx, next) => {
    ctx.body = '欢迎这是后台server首页'
})

// router.get('/apis', (ctx, next) => {
//     ctx.body = { success: true, msg: `删除数据成功` }
// })

router.get('/swagger.json', async function (ctx) {
    ctx.set('Content-Type', 'application/json')
    ctx.body = swaggerJson
})

module.exports = router
