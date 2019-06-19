import { Selector } from 'testcafe'
import { admin, baseURL } from '../../auth'

fixture `License Tab - Core Booster Deactivate License Test`

/* License Keys */
let validLicenseKey = '5467bd941410cfd14e118bf19e992414'

test('should deactivate license and display deactivated message', async t => {
  // Get selectors
  const licenseInputField = Selector('#gfpdf_settings\\[license_gravity-pdf-core-booster\\]')
  const saveButton = Selector('input').withAttribute('value', 'Save Changes')
  const deactivateLink = Selector('.gfpdf-deactivate-license')
  const deactivatedMessage = Selector('label').withText('License deactivated.')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=license`)
  await t.click(licenseInputField)
  await t.selectText(licenseInputField, 32, 0)
  await t.pressKey('backspace')
  await t.typeText(licenseInputField, validLicenseKey, { paste: true })
  await t.click(saveButton)
  await t.wait(3000)
  await t.click(deactivateLink)
  await t.wait(3000)

  // Assertions
  await t.expect(deactivatedMessage.exists).ok()
})
