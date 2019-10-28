import { Selector, RequestLogger } from 'testcafe'
import { baseURL } from '../auth'
import { button, dropdownOption, link } from '../page-model/helpers/field'
import ConfirmationShortcodes from '../page-model/advanced-checks/confirmation-shortcode'
import Page from '../page-model/helpers/page'

const run = new ConfirmationShortcodes()
const page = new Page()
let shorcodeHolder
let downloadUrl

const downloadLogger = RequestLogger(downloadUrl, {
  logResponseBody: true,
  logResponseHeaders: true
})

fixture`PDF shortcode - Confirmation Type TEXT, PAGE, and REDIRECT Test`

test('should check if the shortcode confirmation type TEXT is working correctly', async t => {
  // Actions
  await t.setTestSpeed(0.01)
  await run.copyDownloadShortcode('gf_edit_forms&view=settings&subview=pdf&id=3')
  shorcodeHolder = await run.shortcodeField.value
  await run.navigateConfirmationsSection('gf_edit_forms&view=settings&subview=confirmation&id=3')
  await t
    .click(run.confirmationText)
    .click(button('Text'))
    .click(run.wsiwigEditor)
    .pressKey('ctrl+a')
    .pressKey('backspace')
    .typeText(run.wsiwigEditor, shorcodeHolder, { paste: true })
    .click(run.saveButton)
    .click(link('#gf_form_toolbar', 'Preview'))
    .typeText(run.formInputField, 'test', { paste: true })
    .click(run.submitButton)
    .wait(5000)
  downloadUrl = await Selector('.gravitypdf-download-link').getAttribute('href')
  await t
    .click(link('.gform_confirmation_wrapper ', 'Download PDF'))
    .wait(2000)
    .addRequestHooks(downloadLogger)
    .wait(2000)
  console.log('downloadLogger - ', downloadLogger)
  await run.responseStatus(downloadLogger._internalRequests, 0)

  // Assertions
  await t.expect(Selector('a').withText('Download PDF').exists).ok()
})
