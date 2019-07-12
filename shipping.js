const boxKnightApi = require('./ApiConfig/boxKnightApi')
const canadaPostApi = require('./ApiConfig/canadaPostApi')

async function getBoxKnightRates(destination) {
  const { ok, data } = await boxKnightApi.get(`/rates/${destination}`)

  return ok ? data : []
}

async function getCanadaPostRates(destination) {
  const { ok, data } = await canadaPostApi.get(`/rates/${destination}`)

  return ok ? data : []
}

async function getShippingRates(destination) {
  const boxKnightRates = await getBoxKnightRates(destination)
  const canadaPostRates = await getCanadaPostRates(destination)

  return [...boxKnightRates, ...canadaPostRates]
}

const createShipment = ({ rate, destination }) => {
  const body = {
    rate_id: rate.id,
    destination: {
      ...destination,
    },
  }

  if (rate.description.includes('BoxKnight')) {
    boxKnightApi.post('/shipments/', body)
  } else if (rate.description.includes('Canada Post')) {
    canadaPostApi.post('/shipments/', body)
  }
}

async function getBestRate(destination) {
  const rates = await getShippingRates(destination)
  let bestRate = null

  rates.forEach((rate) => {
    if (!bestRate || bestRate.price > rate.price) {
      bestRate = rate
    } if (bestRate.price === rate.price && bestRate.estimate_days > rate.estimate_days) {
      bestRate = rate
    }
  })

  return bestRate
}

module.exports = {
  getBoxKnightRates,
  getCanadaPostRates,
  createShipment,
  getBestRate,
}
