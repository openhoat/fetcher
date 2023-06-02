import { Level, Logger } from '../deps/test/x/optic.ts'
import { WebServer } from '../deps/test/x/precise.ts'
import { decode } from '../deps/std/encoding.ts'

export class FakeWebServer extends WebServer {
  #timer: undefined | number

  constructor(port = 0) {
    super({
      notFoundHandler: (req) =>
        Response.json({
          code: 'NOT_FOUND',
          message: `Resource '${req.method} ${req.url}' not found.`,
        }, { status: 404 }),
      logger: new Logger().withMinLogLevel(Level.Critical),
      port,
    })
    this.get('/', () => ({ foo: 'bar' }))
      .get('/text', () => 'This is a text')
      .get(
        '/error/text',
        () => new Response('This is a text', { status: 500 }),
      )
      .get(
        '/timeout/:duration',
        (req) => {
          const timeout = Number(req.params?.duration)
          return new Promise((resolve) => {
            this.#timer = setTimeout(() => {
              resolve({ foo: 'bar' })
            }, timeout)
          })
        },
      )
      .get(
        '/query',
        (req) => Object.fromEntries(new URL(req.url).searchParams),
      )
      .get('/basicauth', (req) => {
        const [, basicAuthValue = ''] = (req.headers.get('Authorization') || '')
          .match(/^Basic (.*)$/) || []
        const [username, password] = new TextDecoder().decode(
          decode(basicAuthValue),
        ).split(':')
        if (username !== 'john' || password !== 'password') {
          return Response.json(
            {
              code: 'UNAUTHORIZED',
              message: 'Unauthorized',
            },
            { status: 401 },
          )
        }
        return { foo: 'bar' }
      })
      .get(
        '/custom-header',
        (req) => ({ value: req.headers.get('x-custom-header') }),
      )
      .get('/bearer', (req) => {
        const authorization = req.headers.get('authorization')
        if (authorization !== 'Bearer mybearertoken') {
          return Response.json(
            {
              code: 'UNAUTHORIZED',
              message: 'Unauthorized',
            },
            { status: 401 },
          )
        }
        return { foo: 'bar' }
      })
      .post('/json', (req) => req.json())
  }

  stop() {
    if (typeof this.#timer !== 'undefined') {
      clearTimeout(this.#timer)
    }
    return super.stop()
  }
}
