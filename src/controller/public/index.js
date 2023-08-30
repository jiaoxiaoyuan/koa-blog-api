const os = require('os')
const Qs = require('qs')
const request = require('request')
const { WeatherUrl, WeatherKey, publicUrl, appId, appSecret } = require('../../utils/common')
const { result, ERRORCODE, throwError } = require('../../result/index')

const errorCodeUpload = ERRORCODE.UPLOAD
const errorCodeConfig = ERRORCODE.CONFIGs
const errorCode = ERRORCODE.ARTICLE

module.exports = {
    /**
     *  @description 获取客户端基本信息
     *  @type 公共接口
     */
    getOs: async (ctx, next) => {
        let data = {
            // 返回操作系统名
            type: os.type(),
            // 返回 CPU 的字节序，可能的是 "BE" 或 "LE"
            endianness: os.endianness(),
            // 返回操作系统的主机名
            hostname: os.hostname(),
            // 返回编译时的操作系统名
            platform: os.platform(),
            // 返回操作系统 CPU 架构，可能的值有 "x64"、"arm" 和 "ia32"。
            arch: os.arch(),
            // 返回操作系统的发行版本
            uptime: os.uptime(),
            // 返回一个包含 1、5、15 分钟平均负载的数组
            loadavg: os.loadavg(),
            // 返回系统内存总量，单位为字节
            freemem: os.freemem(),
            // 返回一个对象数组，包含所安装的每个 CPU/内核的信息：型号、速度（单位 MHz）、时间（一个包含 user、nice、sys、idle 和 irq 所使用 CPU/内核毫秒数的对象）
            cpus: os.cpus(),
            // 获得网络接口列表
            networkInterfaces: os.networkInterfaces(),
            // 返回操作系统的默认临时文件夹
            tmpdir: os.tmpdir()
        }
        ctx.body = result('获取客户端基本信息成功', data)
    },
    /**
     *  @description 获取天气
     *  @type 公共接口
     */
    getWeather: async (ctx, next) => {
        try {
            let data = {
                key: WeatherKey,
                city: '重庆市'
            }
            let url = `${WeatherUrl}?${Qs.stringify(data)}`
            const options = {
                url: url, // 请求的URL
                method: 'GET', // 请求方法
                headers: {
                    'User-Agent': 'Koa Request' // 设置请求头
                }
            }
            const response = await new Promise((resolve, reject) => {
                request(options, (error, response, body) => {
                    if (error) {
                        reject(error)
                    } else {
                        let resq = JSON.parse(body)
                        resolve(resq.lives)
                    }
                })
            })
            ctx.body = result('获取成功', response)
        } catch (err) {
            console.error(err)
            return ctx.app.emit('error', throwError(errorCode, '新增文章失败'), ctx)
        }
    },
    /**
     * @description 获取IP信息查询
     */
    getIpInfo: async (ctx, next) => {
        try {
            let data = {
                app_id: appId,
                app_secret: appSecret
            }
            let url = `${publicUrl}/api/ip/self?${Qs.stringify(data)}`
            const options = {
                url: url, // 请求的URL
                method: 'GET', // 请求方法
                headers: {
                    'User-Agent': 'Koa Request' // 设置请求头
                }
            }
            const response = await new Promise((resolve, reject) => {
                request(options, (error, response, body) => {
                    if (error) {
                        reject(error)
                    } else {
                        let resq = JSON.parse(body)
                        resolve(resq.data)
                    }
                })
            })
            ctx.body = result('获取成功', response)
        } catch (err) {
            console.error(err)
            return ctx.app.emit('error', throwError(errorCode, '新增文章失败'), ctx)
        }
    }
    /**
     * @description 获取指定日期、按年、按月的节假日和万年历信息
     *
     */
}
