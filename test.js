/**
 * @jest-environment node
 */

const request = require('supertest')
const app = require('./app')
const shipping = require('./shipping')

test('should return best shipping rate', async () => {
  const response = await request(app)
    .post('/rates')
    .send({
      address_line_one: '4455 Boul. Poirier',
      address_line_two: '201',
      city: 'Montréal',
      province: 'Québec',
      postalCode: 'H4X1Z5',
      country: 'Canada',
    })

  expect(response.statusCode).toBe(200)
  expect(response.body).toEqual({
    bestRate: {
      id: expect.any(String),
      description: expect.any(String),
      price: expect.any(Number),
      estimate_days: expect.any(Number),
    },
  })
})

test('should get BoxKnight rates', async () => {
  const response = await shipping.getBoxKnightRates('H4R2A4')

  expect(response).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        estimate_days: expect.any(Number),
      }),
    ]),
  )
})

test('should get Canada Post rates', async () => {
  const response = await shipping.getCanadaPostRates('H4R2A4')

  expect(response).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        estimate_days: expect.any(Number),
      }),
    ]),
  )
})
