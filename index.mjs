import Fastify from "fastify"

const app = Fastify({
  logger: process.env.LOG ?? true,
})

app.addHook("onRequest", async (request, reply) => {
  if (hasReferralParams(request.query)) {
    const code = getReferralCode(request.query)
    const fingerprint = getFingerPrint(request)

    app.log.info(`\`${code}\` was applied (${fingerprint})`)

    if (process.env.REPORT_URL) {
      fetch(process.env.REPORT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "code": code,
          "fingerprint": fingerprint,
        }),
      })
    } else {
      app.log.warn("Referral params was passed, but REPORT_URL is not set")
    }

    const redirectUrl = new URL(
      request.url,
      `${request.protocol}://${request.hostname}`,
    )

    for (const key of getReferralParamsKeys()) {
      redirectUrl.searchParams.delete(key)
    }

    //for (const [key, value] of Object.entries(
    //  withoutReferralParams(request.query)
    //)) {
    //  console.log(key, value)
    //  redirectUrl.searchParams.append(key, value)
    //}

    reply
      .header("x-referral-code", code)
      .redirect(redirectUrl.toString())
  }
})

app.listen({
  host: process.env.HOST ?? "0.0.0.0",
  port: process.env.PORT ?? 3000,
}, (err, _) => {
  if (err) throw err
})

const getReferralParamsKeys = () => (
  (process.env.PARSE_PARAMS ?? "ref").split(",")
)

const hasReferralParams = (params) => (
  getReferralParamsKeys()
    .some((param) => param in params)
)

const withoutReferralParams = (params) => (
  getReferralParamsKeys()
    .reduce((acc, param) => {
      if (!(param in acc)) {
        acc[param] = params[param]
      }
      return acc
    }, {})
)

const getReferralCode = (params) => (
  params[
    getReferralParamsKeys()
      .find((param) => param in params)
  ]
)

const getFingerPrint = (request) => (
  request.headers["x-forwarded-for"] ?? request.ip
)
