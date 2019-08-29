import { button, dropdownOption, link } from '../page-model/helpers/field'
import ConfirmationShortcodes from '../page-model/advanced-checks/confirmation-shortcode'
import Page from '../page-model/helpers/page'
import fs from 'fs'
import os from 'os'

const run = new ConfirmationShortcodes()
const page = new Page()
const filePath = `C:\\Users\\${os.userInfo().username}\\Downloads\\Sample.pdf`
let shorcodeHolder

fixture`PDF shortcode - Confirmation Type Text Test`

test('should check if the shortcode confirmation type TEXT is working correctly', async t => {
  // Actions
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
    .click(link('.gform_confirmation_wrapper ', 'Download PDF'))
    .wait(2000)

  // Assertions
  await t
    .expect(link('.gform_confirmation_wrapper ', 'Download PDF').exists).ok()
    .expect(fs.existsSync(filePath)).ok()

  // Delete downloaded pdf for the next test
  await fs.unlinkSync(filePath)
})

test('should check if the shortcode confirmation type PAGE is working correctly', async t => {
  // Actions
  await run.copyDownloadShortcode('gf_edit_forms&view=settings&subview=pdf&id=3')
  shorcodeHolder = await run.shortcodeField.value
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
  await t
    .click(run.queryStringBox)
    .typeText(run.textAreaBox, 'entry={entry_id}', { paste: true })
    .click(run.saveButton)
    .click(link('#gf_form_toolbar', 'Preview'))
    .typeText(run.formInputField, 'test', { paste: true })
    .click(run.submitButton)
    .click(link('.entry-content', 'Download PDF'))
    .wait(2000)

  // Actions
  await t
    .expect(page.pageHeader.exists).ok()
    .expect(link('.entry-content', 'Download PDF').exists).ok()
    .expect(fs.existsSync(filePath)).ok()

  // Delete downloaded pdf for the next test
  await fs.unlinkSync(filePath)
})

test('should check if the shortcode confirmation type REDIRECT download is working correctly', async t => {
  // Actions
  await run.copyDownloadShortcode('gf_edit_forms&view=settings&subview=pdf&id=3')
  shorcodeHolder = await run.shortcodeField.value
  await run.navigateConfirmationsSection('gf_edit_forms&view=settings&subview=confirmation&id=3')
  await t
    .click(run.confirmationRedirect)
    .typeText(run.redirectUrlInputField, shorcodeHolder, { paste: true })
    .click(run.saveButton)
    .click(link('#gf_form_toolbar', 'Preview'))
    .typeText(run.formInputField, 'test', { paste: true })
    .click(run.submitButton)
    .wait(2000)

  // Actions
  await t
    .expect(fs.existsSync(filePath)).ok()

  // Delete downloaded pdf for the next test
  await fs.unlinkSync(filePath)
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
