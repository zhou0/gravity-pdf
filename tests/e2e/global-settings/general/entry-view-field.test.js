import { Selector } from 'testcafe'
import { fieldLabel, fieldDescription, link } from '../../page-model/helpers/field'
import General from '../../page-model/global-settings/general/general'
import Pdf from '../../page-model/helpers/pdf'

const run = new General()
const pdf = new Pdf()

fixture`General Tab - Entry View Field Test`

test('should display Entry View field', async t => {
  // Actions
  await run.navigateSettingsTab('gf_settings&subview=PDF&tab=general#')

  // Assertions
  await t
    .expect(fieldLabel('Entry View').exists).ok()
    .expect(run.viewOption.exists).ok()
    .expect(run.downlaodOption.exists).ok()
    .expect(fieldDescription('Select the default action used when accessing a PDF from the Gravity Forms entries list page.', 'label').exists).ok()
})

test('should display "Download PDF" as an option on the Entry List page instead of "View PDF" when "Download" is selected', async t => {
  // Actions
  await run.navigateSettingsTab('gf_settings&subview=PDF&tab=general#')
  await t
    .click(run.downlaodOption)
    .click(run.saveButton)
  await pdf.navigateAddPdf('gf_edit_forms&view=settings&subview=pdf&id=2')
  await pdf.navigatePdfSection('gf_entries&id=2')

  // Assertions
  await t
    .expect(link('#the-list', 'Download PDF').exists).ok()
})

test('reset/clean PDF templates from the list for the next test', async t => {
  // Actions
  await pdf.navigateDeletePdfEntries('gf_edit_forms', 'Sample 2')

  // Assertions
  await t.expect(pdf.template.count).eql(0)
})

test('should display "View PDF" as an option on the Entry List page instead of "Download PDF" when "View" is selected', async t => {
  // Get Selectors
  const viewPdfLink = Selector('a').withText('View PDF')

  // Actions
  await run.navigateSettingsTab('gf_settings&subview=PDF&tab=general#')
  await t
    .click(run.viewOption)
    .click(run.saveButton)
  await pdf.navigateAddPdf('gf_edit_forms&view=settings&subview=pdf&id=2')
  await pdf.navigatePdfSection('gf_entries&id=2')

  // Assertions
  await t
    .expect(viewPdfLink.exists).ok()
})

test('reset/clean PDF templates from the list for the next test', async t => {
  // Actions
  await pdf.navigateDeletePdfEntries('gf_edit_forms', 'Sample 2')

  // Assertions
  await t.expect(pdf.template.count).eql(0)
})
