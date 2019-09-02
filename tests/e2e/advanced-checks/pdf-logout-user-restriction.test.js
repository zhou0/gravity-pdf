import { Selector } from 'testcafe'
import { baseURL } from '../auth'
import ConfirmationShortcodes from '../page-model/advanced-checks/confirmation-shortcode'

const cs = new ConfirmationShortcodes()
let pdfId

fixture`PDF Logout User - Restriction Test`

test('should throw an error when a logout user try to access a PDF', async t => {
  // Get Selectors
  const wpAdminBar = Selector('ul').withAttribute('id', 'wp-admin-bar-top-secondary').withAttribute('class', 'ab-top-secondary ab-top-menu')
  const logout = Selector('a').withText('Log Out')
  const errorMessage = Selector('p').withText('You do not have access to view this PDF.')

  // Actions
  await cs.copyDownloadShortcode('gf_edit_forms&view=settings&subview=pdf&id=4')
  pdfId = await cs.shortcodeField.value
  pdfId = pdfId.substring(30, 43)
  await t
    .hover(wpAdminBar)
    .click(logout)
    .navigateTo(`${baseURL}/pdf/${pdfId}/4`)

  // Assertions
  await t.expect(errorMessage.exists).ok()
})
