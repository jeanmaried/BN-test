const { create } = require('apisauce')

const boxKnightApi = create({
  baseURL: 'https://private-amnesiac-ca19b0-boxknightapidevchallenge.apiary-proxy.com/prod',
  headers: { Accept: 'application/json' },
})

module.exports = boxKnightApi
