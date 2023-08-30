/**
 * 公共接口
 * @author: M
 */
const Router = require('koa-router')
const router = new Router({ prefix: '/apis' })

const { getOs, getWeather, getIpInfo, getCalendar } = require('../controller/public/index')

// 获取客户端基本信息
router.get('/getOs', getOs)

// 获取天气
router.get('/getWeather', getWeather)

// 获取IP信息
router.get('/getIpInfo', getIpInfo)

// 万年历
router.get('/getCalendar', getCalendar)

module.exports = router
