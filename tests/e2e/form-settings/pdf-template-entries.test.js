import Pdf from '../page-objects/pdf'
import Form from '../page-objects/form'

const pdf = new Pdf()
const form = new Form()

fixture`PDF Template - Entries Test`

test('should successfully add new PDF template into form entries', async t => {
  // Actions
  await pdf.navigatePdfEntries('gf_edit_forms')
  await t.hover(form.settingsMenu)
  await t.click(form.pdfLink)
  await t.click(form.addNewPdf)
  await t.typeText(pdf.name, 'Test PDF Template', { paste: true })
  await t.typeText(pdf.fileName, 'testpdftemplate', { paste: true })
  await t.click(pdf.addPdfButton)
  await t.click(pdf.backToTemplateListLink)

  // Assertions
  await t.expect(pdf.template.count).eql(1)
})

test('should successfully switch from Active template to Inactive', async t => {
  // Actions
  await pdf.navigatePdfEntries('gf_edit_forms')
  await t.hover(form.settingsMenu)
  await t.click(form.pdfLink)
  await t.click(pdf.toggleSwitch)

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
  await t.hover(form.settingsMenu)
  await t.click(form.pdfLink)
  await t.click(pdf.toggleSwitch)

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
  await t.hover(form.settingsMenu)
  await t.click(form.pdfLink)
  await t.hover(pdf.templateList)
  await t.click(pdf.editLink)
  await t.typeText(pdf.name, 'Test PDF Template Updated', { replace: true })
  await t.typeText(pdf.fileName, 'testpdftemplateupdated', { replace: true })
  await t.click(pdf.updatePdfButton)
  await t.click(pdf.backToTemplateListLink)

  // Assertions
  await t.expect(pdf.templateDetail.innerText).contains('Test PDF Template Updated')
})

test('should successfully duplicate existing PDF template using the Duplicate link option', async t => {
  // Actions
  await pdf.navigatePdfEntries('gf_edit_forms')
  await t.hover(form.settingsMenu)
  await t.click(form.pdfLink)
  await t.hover(pdf.options)
  await t.click(pdf.duplicateLink)

  // Assertions
  await t.expect(pdf.templateList.find('tr').count).eql(2)
})

test('should delete Gravity PDF templates from the list', async t => {
  // Actions
  await pdf.navigatePdfEntries('gf_edit_forms')
  await t.hover(form.settingsMenu)
  await t.click(form.pdfLink)
  let tempalte = await pdf.template.count
  if (tempalte > 0) {
    for (let i = 0; i < tempalte; i++) {
      await t.hover(pdf.template)
      await t.click(pdf.deletePDF)
      await t.click(pdf.confirmDelete)
      await t.wait(2000)
    }
  }

  // Assertions
  await t.expect(pdf.template.count).eql(0)
})
