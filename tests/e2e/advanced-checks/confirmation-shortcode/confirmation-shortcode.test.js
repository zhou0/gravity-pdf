import { button, dropdownOption, link } from '../../page-model/helpers/field'
import Pdf from '../../page-model/helpers/pdf'
import ConfirmationShortcodes from '../../page-model/advanced-checks/confirmation-shortcode/confirmation-shortcode'
import Page from '../../page-model/helpers/page'

const pdf = new Pdf()
const run = new ConfirmationShortcodes()
const page = new Page()
let shorcodeHolder

fixture`PDF shortcode - Confirmation Type Text Test`

test('should check if the shortcode confirmation type TEXT is working correctly', async t => {
  // Actions
  await pdf.navigateAddPdf('gf_edit_forms&view=settings&subview=pdf&id=3')
  await t
    .click(link('#gform_tabs', 'PDF'))
    .click(run.shortcodeField)
  shorcodeHolder = await run.shortcodeField.value
  await t
    .click(link('#gform_tabs', 'Confirmations'))
    .click(link('#the-list', 'Default Confirmation'))
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

  // Assertions
  await t
    .expect(link('.gform_confirmation_wrapper ', 'Download PDF').exists).ok()
})

test('should check if the shortcode confirmation type PAGE is working correctly', async t => {
  // Actions
  await page.addNewPage()
  await page.navigatePage()
  await t
    .click(link('#the-list', 'Test page'))
  await page.closePopupButton.exists && await t.click(page.closePopupButton)
  await t
    .click(page.addBlockIcon)
    .typeText(page.searchBlock, 'shortcode', { paste: true })
    .click(page.shortcodeLink)
    .typeText(page.shortcodeTextarea, shorcodeHolder, { paste: true })
    .click(button('Update'))
  await run.navigateConfirmationsSection('gf_edit_forms&view=settings&subview=confirmation&id=3')
  await t
    .click(run.confirmationPage)
    .click(run.pageSelect)
    .click(dropdownOption('Test page'))
    .click(run.queryStringBox)
    .typeText(run.textAreaBox, 'entry={entry_id}', { paste: true })
    .click(run.saveButton)
    .click(link('#gf_form_toolbar', 'Preview'))
    .typeText(run.formInputField, 'test', { paste: true })
    .click(run.submitButton)

  // Actions
  await t
    .expect(page.pageHeader.exists).ok()
    .expect(link('.entry-content', 'Download PDF').exists).ok()
})

test('reset/clean PDF templates from the list for the next test', async t => {
  // Actions
  await pdf.navigateDeletePdfEntries('gf_edit_forms', 'Sample 3')

  // Assertions
  await t.expect(pdf.template.count).eql(0)
})

test('reset/clean Page entry for the next test', async t => {
  // Actions
  await page.navigatePage()
  await t
    .hover(link('#the-list', 'Test page'))
    .click(page.trashLink)

  // Assertions
  await t
    .expect(link('#the-list', 'Test page').exists).notOk()
})
