import { Selector } from 'testcafe'
import { admin, baseURL } from '../../auth'

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
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=license`)
  await t.click(licenseInputField)
  await t.selectText(licenseInputField, 32, 0)
  await t.pressKey('backspace')
  await t.typeText(licenseInputField, invalidLicenseKey, { paste: true })
  await t.click(saveButton)

  // Assertions
  await t.expect(errorIcon.exists).ok()
  await t.expect(invalidLicenseKeyMessage.exists).ok()
})
