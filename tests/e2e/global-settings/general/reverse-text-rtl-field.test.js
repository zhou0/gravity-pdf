import { Selector } from 'testcafe'
import { fieldLabel, fieldDescription } from '../../page-objects/helpers/field'
import Form from '../../page-objects/global-settings/form'

const form = new Form()

fixture `General Tab - Reverse Text (RTL) Field Test`

test('should display Reverse Text (RTL) field', async t => {
  // Get selectors
  const yes = Selector('div').find('[class^="gfpdf_settings_default_rtl"][value="Yes"]')
  const no = Selector('div').find('[class^="gfpdf_settings_default_rtl"][value="No"]')

  // Actions
  await form.navigateSettingsTab('gf_settings&subview=PDF&tab=general#')

  // Assertions
  await t
    .expect(fieldLabel('Reverse Text (RTL)').exists).ok()
    .expect(yes.exists).ok()
    .expect(no.exists).ok()
    .expect(fieldDescription('Script like Arabic and Hebrew are written right to left.', 'label').exists).ok()
})
