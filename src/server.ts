import 'reflect-metadata'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import { bootstrapControllers } from 'amala'
import * as cors from '@koa/cors'
import * as Router from 'koa-router'

const app = new Koa()

export async function startServer() {
  try {
    const router = new Router()
    await bootstrapControllers({
      app,
      router,
      basePath: '/',
      controllers: [__dirname + '/controllers/*'],
      disableVersioning: true,
      bodyParser: false,
    })
    app.use(cors({ origin: '*' }))
    app.use(bodyParser())
    app.use(router.routes())
    app.use(router.allowedMethods())
    // Start rest
    app.listen(1347).on('listening', () => {
      console.log('HTTP is listening on 1347')
    })
  } catch (err) {
    console.log('Koa app starting error: ', err)
  }
}
