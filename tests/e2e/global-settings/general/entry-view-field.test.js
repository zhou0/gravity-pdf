import { Selector } from 'testcafe'
import { fieldLabel, fieldDescription } from '../../page-model/helpers/field'
import General from '../../page-model/global-settings/general/general'

const run = new General()

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

test('should display "Download PDF" as an option on the Entry List page instead of View PDF when "Download" is selected', async t => {
  // Get Selectors
  const saveButton = Selector('div').find('[class^="button button-primary"][value="Save Changes"]')
  const downloadPdfLink = Selector('a').withText('Download PDF')

  // Actions
  await run.navigateSettingsTab('gf_settings&subview=PDF&tab=general#')
  await t
    .click(run.downlaodOption)
    .click(saveButton)
  await run.navigateAddPdf('gf_edit_forms')

  // Assertions
  await t
    .expect(downloadPdfLink.exists).ok()
})

test('reset/clean PDF templates from the list for the next test', async t => {
  // Actions
  await run.navigateDeletePdfEntries('gf_edit_forms')

  // Assertions
  await t.expect(run.template.count).eql(0)
})
