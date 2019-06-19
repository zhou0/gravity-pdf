import { Selector } from 'testcafe'
import { admin, baseURL } from '../../auth'

fixture `General Tab - Reverse Text (RTL) Field Test`

test('should display Reverse Text (RTL) field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Reverse Text (RTL)')
  const yes = Selector('div').find('[class^="gfpdf_settings_default_rtl"][value="Yes"]')
  const no = Selector('div').find('[class^="gfpdf_settings_default_rtl"][value="No"]')
  const fieldDescription = Selector('label').withText('Script like Arabic and Hebrew are written right to left.')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=general#/`)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(yes.exists).ok()
  await t.expect(no.exists).ok()
  await t.expect(fieldDescription.exists).ok()
})
