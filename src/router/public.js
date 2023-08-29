/**
 * 公共接口
 * @author: M
 */
const Router = require('koa-router')
const router = new Router({ prefix: '/apis' })

const { getOs, gitee } = require('../controller/public/index')

// 获取客户端基本信息
router.get('/getOs', getOs)
// 获取码云代码提交统计

router.get('/gitee', gitee)

module.exports = router
