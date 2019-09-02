import { Role } from 'testcafe'

require('dotenv').config()

export const baseURL = process.env.E2E_TESTING_URL

export const admin = Role(`${baseURL}/wp-login.php`, async t => {
  await t
    .wait(100)
    .typeText('#user_login', 'admin')
    .typeText('#user_pass', 'password')
    .click('#wp-submit')
})

export const user = Role(`${baseURL}/wp-login.php`, async t => {
  await t
    .wait(100)
    .typeText('#user_login', 'user')
    .typeText('#user_pass', 'password')
    .click('#wp-submit')
})
