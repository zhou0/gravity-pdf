import { Selector } from 'testcafe'
import { admin, baseURL } from '../../auth'

fixture `General Tab - Debug Mode Field Test`

test('should display Debug Mode field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Debug Mode')
  const yes = Selector('div').find('[class^="gfpdf_settings_debug_mode"][value="Yes"]')
  const no = Selector('div').find('[class^="gfpdf_settings_debug_mode"][value="No"]')
  const fieldDescription = Selector('label').withText('When enabled, debug information will be displayed on-screen for core features.')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=general#/`)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(yes.exists).ok()
  await t.expect(no.exists).ok()
  await t.expect(fieldDescription.exists).ok()
})
