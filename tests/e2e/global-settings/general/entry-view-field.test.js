import { Selector } from 'testcafe'
import { admin, baseURL } from '../../auth'

fixture `General Tab - Entry View Field Test`

test('should display Entry View field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Entry View')
  const view = Selector('div').find('[class^="gfpdf_settings_default_action"][value="View"]')
  const downlaod = Selector('div').find('[class^="gfpdf_settings_default_action"][value="Download"]')
  const fieldDescription = Selector('label').withText('Select the default action used when accessing a PDF from the Gravity Forms entries list page.')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=general#/`)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(view.exists).ok()
  await t.expect(downlaod.exists).ok()
  await t.expect(fieldDescription.exists).ok()
})
