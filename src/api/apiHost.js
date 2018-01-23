export const ENV = {
  DEV: 'dev',
  TEST: 'test',
  PROD: 'prod',
}

const localServer = 'http://localhost:3000/api'

export const HOST = {
  DEV: localServer,
  TEST: localServer,
  PROD: 'http://xxx/api',
}

const ApiHost = () => {
  switch (process.env.NODE_ENV) {
    case ENV.DEV:
      return HOST.DEV
    case ENV.TEST:
      return HOST.TEST
    case ENV.PROD:
      return HOST.PROD
    default:
      return HOST.PROD
  }
}

export default ApiHost
