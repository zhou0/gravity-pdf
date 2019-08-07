import { Selector } from 'testcafe'
import { fieldLabel, fieldDescription, button } from '../../page-objects/helpers/field'
import Form from '../../page-objects/global-settings/form'

const form = new Form()

fixture `General Tab - Default Font Color Field Test`

test('should display Default Font Color field', async t => {
  // Get selectors
  const popupPickerBox = Selector('.wp-picker-container')
  const showPopupPickerBox = Selector('.wp-picker-active')

  // Actions
  await form.navigateSettingsTab('gf_settings&subview=PDF&tab=general#')
  await t.click(button('Select Color'))

  // Assertions
  await t
    .expect(fieldLabel('Default Font Color').exists).ok()
    .expect(button('Select Color').exists).ok()
    .expect(fieldDescription('Set the default font color used in PDFs.', 'label').exists).ok()
    .expect(popupPickerBox.exists).ok()
    .expect(showPopupPickerBox.exists).ok()
})
