import { Selector } from 'testcafe'
import { fieldLabel, fieldDescription } from '../../page-objects/helpers/field'
import General from '../../page-objects/global-settings/general/general'

const run = new General()

fixture `General Tab - Entry View Field Test`

test('should display Entry View field', async t => {
  // Get selectors
  const view = Selector('div').find('[class^="gfpdf_settings_default_action"][value="View"]')
  const downlaod = Selector('div').find('[class^="gfpdf_settings_default_action"][value="Download"]')

  // Actions
  await run.navigateSettingsTab('gf_settings&subview=PDF&tab=general#')

  // Assertions
  await t
    .expect(fieldLabel('Entry View').exists).ok()
    .expect(view.exists).ok()
    .expect(downlaod.exists).ok()
    .expect(fieldDescription('Select the default action used when accessing a PDF from the Gravity Forms entries list page.', 'label').exists).ok()
})
