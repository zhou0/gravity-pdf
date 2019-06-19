import { Selector } from 'testcafe'
import { admin, baseURL } from '../../auth'

fixture `General Tab - Default Font Color Field Test`

test('should display Default Font Color field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Default Font Color')
  const selectColorButton = Selector('div').find('[class^="button wp-color-result"]')
  const fieldDescription = Selector('label').withText('Set the default font color used in PDFs.')
  const popupPickerBox = Selector('.wp-picker-container')
  const showPopupPickerBox = Selector('.wp-picker-active')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=general#/`)
  await t.click(selectColorButton)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(selectColorButton.exists).ok()
  await t.expect(fieldDescription.exists).ok()
  await t.expect(popupPickerBox.exists).ok()
  await t.expect(showPopupPickerBox.exists).ok()
})
