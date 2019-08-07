import { Selector } from 'testcafe'
import Form from '../../page-objects/global-settings/form'

const form = new Form()

fixture `License Tab - Core Booster Activate Invalid License Test`

/* License Keys */
let invalidLicenseKey = '123456789'

test('should display error icon and error message for invalid license key', async t => {
  // Get selectors
  const licenseInputField = Selector('#gfpdf_settings\\[license_gravity-pdf-core-booster\\]')
  const saveButton = Selector('input').withAttribute('value', 'Save Changes')
  const errorIcon = Selector('.fa-exclamation-circle')
  const invalidLicenseKeyMessage = Selector('label').withText('An error occurred during activation, please try again')

  // Actions
  await form.navigateSettingsTab('gf_settings&subview=PDF&tab=license')
  await t
    .click(licenseInputField)
    .selectText(licenseInputField, 32, 0)
    .pressKey('backspace')
    .typeText(licenseInputField, invalidLicenseKey, { paste: true })
    .click(saveButton)

  // Assertions
  await t
    .expect(errorIcon.exists).ok()
    .expect(invalidLicenseKeyMessage.exists).ok()
})
