import { Selector } from 'testcafe'
import { admin, baseURL } from '../../auth'

fixture `General Tab - Default Font Size Field Test`

test('should display Default Font Size field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Default Font Size')
  const fontSizeInputBox = Selector('#gfpdf_settings\\[default_font_size\\]')
  const fieldDescription = Selector('label').withText('Set the default font size used in PDFs.')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=general#/`)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(fontSizeInputBox.exists).ok()
  await t.expect(fieldDescription.exists).ok()
})
