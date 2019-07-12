const { create } = require('apisauce')

const canadaPostApi = create({
  baseURL: 'https://private-amnesiac-35622c-canadapostapidevchallenge.apiary-proxy.com/prod',
  headers: { Accept: 'application/json' },
})

module.exports = canadaPostApi
