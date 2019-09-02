import { baseURL } from '../auth'
import ConfirmationShortcodes from '../page-model/advanced-checks/confirmation-shortcode'
import PdfRestriction from '../page-model/advanced-checks/pdf-restriction'

const cs = new ConfirmationShortcodes()
const run = new PdfRestriction()
let pdfId

fixture`PDF Logout User - Restriction Test`

test('should throw an error when a logout user try to access a PDF', async t => {
  // Actions
  await cs.copyDownloadShortcode('gf_edit_forms&view=settings&subview=pdf&id=4')
  pdfId = await cs.shortcodeField.value
  pdfId = pdfId.substring(30, 43)
  await t
    .hover(run.wpAdminBar)
    .click(run.logout)
    .navigateTo(`${baseURL}/pdf/${pdfId}/4`)

  // Assertions
  await t.expect(run.errorMessage.exists).ok()
})
