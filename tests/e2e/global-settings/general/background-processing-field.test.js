import { Selector } from 'testcafe'
import { admin, baseURL } from '../../auth'

fixture `General Tab - Background Processing Field Test`

test('should display Background Processing field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Background Processing')
  const yes = Selector('div').find('[class^="gfpdf_settings_background_processing"][value="Enable"]')
  const no = Selector('div').find('[class^="gfpdf_settings_background_processing"][value="Disable"]')
  const fieldDescription = Selector('label').withText('When enable, form submission and resending notifications with PDFs are handled in a background task. Requires Background tasks to be enabled.')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=general#/`)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(yes.exists).ok()
  await t.expect(no.exists).ok()
  await t.expect(fieldDescription.exists).ok()
})
