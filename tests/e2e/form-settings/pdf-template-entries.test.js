import PdfTemplateEntries from '../page-model/form-settings/pdf-template-entries'
import FormSettings from '../page-model/form-settings/form-settings'

const run = new PdfTemplateEntries()
const form = new FormSettings()

fixture`PDF Template - Entries Test`

test('should successfully add new PDF template into form entries', async t => {
  // Actions
  await run.navigatePdfEntries('gf_edit_forms')
  await t
    .hover(form.settingsMenu)
    .click(form.pdfLink)
    .click(form.addNewPdf)
    .typeText(run.name, 'Test PDF Template', { paste: true })
    .typeText(run.fileName, 'testpdftemplate', { paste: true })
    .click(run.addPdfButton)
    .click(run.backToTemplateListLink)

  // Assertions
  await t.expect(run.template.count).eql(1)
})

test('should successfully switch from Active template to Inactive', async t => {
  // Actions
  await run.navigatePdfEntries('gf_edit_forms')
  await t
    .hover(form.settingsMenu)
    .click(form.pdfLink)
    .click(run.toggleSwitch)

  // Assertions
  await t.expect(run.inActiveTemplate.exists).ok()
})

test('should double check if the option View PDF link is disabled when template is Inactive', async t => {
  // Actions
  await run.navigatePdfEntries('gf_edit_forms')
  await t.hover(run.entryItem)

  // Assertions
  await t.expect(run.viewPdfLink.exists).notOk()
})

test('should successfully switch from Inactive template to Active', async t => {
  // Actions
  await run.navigatePdfEntries('gf_edit_forms')
  await t
    .hover(form.settingsMenu)
    .click(form.pdfLink)
    .click(run.toggleSwitch)

  // Assertions
  await t.expect(run.activeTemplate.exists).ok()
})

test('should double check if the option View PDF link is enabled when template is Active', async t => {
  // Actions
  await run.navigatePdfEntries('gf_edit_forms')
  await t.hover(run.entryItem)

  // Assertions
  await t.expect(run.viewPdfLink.exists).ok()
})

test('should double check if the option View PDF link isn\'t shown when the PDF is Active but the PDF Conditional Logic fails.', async t => {
  // Actions
  await run.navigatePdfEntries('gf_edit_forms')
  await t
    .hover(form.settingsMenu)
    .click(form.pdfLink)
    .hover(run.templateList)
    .click(run.editLink)
    .click(run.enableConditionalLogic)
    .click(run.updatePdfButton)
  await run.navigatePdfEntries('gf_edit_forms')
  await t.hover(run.entryItem)

  // Assertions
  await t.expect(run.viewPdfLink.exists).notOk()
})

test('should successfully edit and update existing template using the Edit link option', async t => {
  // Actions
  await run.navigatePdfEntries('gf_edit_forms')
  await t
    .hover(form.settingsMenu)
    .click(form.pdfLink)
    .hover(run.templateList)
    .click(run.editLink)
    .typeText(run.name, 'Test PDF Template Updated', { replace: true })
    .typeText(run.fileName, 'testpdftemplateupdated', { replace: true })
    .click(run.updatePdfButton)
    .click(run.backToTemplateListLink)

  // Assertions
  await t.expect(run.templateDetail.innerText).contains('Test PDF Template Updated')
})

test('should successfully duplicate existing PDF template using the Duplicate link option', async t => {
  // Actions
  await run.navigatePdfEntries('gf_edit_forms')
  await t
    .hover(form.settingsMenu)
    .click(form.pdfLink)
    .hover(run.options)
    .click(run.duplicateLink)

  // Assertions
  await t.expect(run.templateList.find('tr').count).eql(2)
})

test('reset/clean PDF templates from the list for the next test', async t => {
  // Actions
  await run.navigateDeletePdfEntries('gf_edit_forms')

  // Assertions
  await t.expect(run.template.count).eql(0)
})
