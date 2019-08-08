import PdfTemplateEntries from '../page-model/form-settings/pdf-template-entries'
import FormSettings from '../page-model/form-settings/form-settings'

const pdf = new PdfTemplateEntries()
const form = new FormSettings()

fixture`PDF Template - Entries Test`

test('should successfully add new PDF template into form entries', async t => {
  // Actions
  await pdf.navigatePdfEntries('gf_edit_forms')
  await t
    .hover(form.settingsMenu)
    .click(form.pdfLink)
    .click(form.addNewPdf)
    .typeText(pdf.name, 'Test PDF Template', {paste: true})
    .typeText(pdf.fileName, 'testpdftemplate', {paste: true})
    .click(pdf.addPdfButton)
    .click(pdf.backToTemplateListLink)

  // Assertions
  await t.expect(pdf.template.count).eql(1)
})

test('should successfully switch from Active template to Inactive', async t => {
  // Actions
  await pdf.navigatePdfEntries('gf_edit_forms')
  await t
    .hover(form.settingsMenu)
    .click(form.pdfLink)
    .click(pdf.toggleSwitch)

  // Assertions
  await t.expect(pdf.inActiveTemplate.exists).ok()
})

test('should double check if the option View PDF link is disabled when template is Inactive', async t => {
  // Actions
  await pdf.navigatePdfEntries('gf_edit_forms')
  await t.hover(pdf.entryItem)

  // Assertions
  await t.expect(pdf.viewPdfLink.exists).notOk()
})

test('should successfully switch from Inactive template to Active', async t => {
  // Actions
  await pdf.navigatePdfEntries('gf_edit_forms')
  await t
    .hover(form.settingsMenu)
    .click(form.pdfLink)
    .click(pdf.toggleSwitch)

  // Assertions
  await t.expect(pdf.activeTemplate.exists).ok()
})

test('should double check if the option View PDF link is enabled when template is Active', async t => {
  // Actions
  await pdf.navigatePdfEntries('gf_edit_forms')
  await t.hover(pdf.entryItem)

  // Assertions
  await t.expect(pdf.viewPdfLink.exists).ok()
})

test('should successfully edit and update existing template using the Edit link option', async t => {
  // Actions
  await pdf.navigatePdfEntries('gf_edit_forms')
  await t
    .hover(form.settingsMenu)
    .click(form.pdfLink)
    .hover(pdf.templateList)
    .click(pdf.editLink)
    .typeText(pdf.name, 'Test PDF Template Updated', {replace: true})
    .typeText(pdf.fileName, 'testpdftemplateupdated', {replace: true})
    .click(pdf.updatePdfButton)
    .click(pdf.backToTemplateListLink)

  // Assertions
  await t.expect(pdf.templateDetail.innerText).contains('Test PDF Template Updated')
})

test('should successfully duplicate existing PDF template using the Duplicate link option', async t => {
  // Actions
  await pdf.navigatePdfEntries('gf_edit_forms')
  await t
    .hover(form.settingsMenu)
    .click(form.pdfLink)
    .hover(pdf.options)
    .click(pdf.duplicateLink)

  // Assertions
  await t.expect(pdf.templateList.find('tr').count).eql(2)
})

test('should delete Gravity PDF templates from the list', async t => {
  // Actions
  await pdf.navigatePdfEntries('gf_edit_forms')
  await t
    .hover(form.settingsMenu)
    .click(form.pdfLink)
  let tempalte = await pdf.template.count
  if (tempalte > 0) {
    for (let i = 0; i < tempalte; i++) {
      await t
        .hover(pdf.template)
        .click(pdf.deletePDF)
        .click(pdf.confirmDelete)
        .wait(2000)
    }
  }

  // Assertions
  await t.expect(pdf.template.count).eql(0)
})
