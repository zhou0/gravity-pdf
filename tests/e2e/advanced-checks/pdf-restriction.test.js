import { baseURL } from '../auth'
import ConfirmationShortcodes from '../page-model/advanced-checks/confirmation-shortcode'
import PdfRestriction from '../page-model/advanced-checks/pdf-restriction'

const cs = new ConfirmationShortcodes()
const run = new PdfRestriction()
let pdfId

const loginAsAdmin = async t => {
  await t
    .typeText('#user_login', 'admin', { paste: true })
    .typeText('#user_pass', 'password', { paste: true })
    .click('#wp-submit')
}

const loginAsUser = async t => {
  await t
    .typeText('#user_login', 'user', { paste: true })
    .typeText('#user_pass', 'password', { paste: true })
    .click('#wp-submit')
}

fixture`PDF Administrator & Non-Administrator - Restriction Test`
  .page(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms&view=settings&subview=pdf&id=4`)

test('should throw an error when a non-administrator user try to access a PDF', async t => {
  // Actions
  await loginAsAdmin(t)
  await t
    .navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms&view=settings&subview=pdf&id=4`)
  pdfId = await cs.shortcodeField.value
  pdfId = pdfId.substring(30, 43)
  await t
    .hover(run.wpAdminBar)
    .click(run.logout)
  await loginAsUser(t)
  await t.navigateTo(`${baseURL}/pdf/${pdfId}/4`)

  // Assertions
  await t.expect(run.errorMessage.exists).ok()
})

test('should throw an error when a logout user try to access a PDF', async t => {
  // Actions
  await t.navigateTo(`${baseURL}/pdf/${pdfId}/4`)

  // Assertions
  await t.expect(run.errorMessage.exists).ok()
})
