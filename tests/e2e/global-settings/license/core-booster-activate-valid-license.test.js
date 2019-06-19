import { Selector } from 'testcafe'
import { admin, baseURL } from '../../auth'

fixture `License Tab - Core Booster Activate Valid License Test`

/* License Keys */
let validLicenseKey = '987654321'

test('should display success icon and deactivation option for active license key', async t => {
  // Get selectors
  const licenseInputField = Selector('#gfpdf_settings\\[license_gravity-pdf-core-booster\\]')
  const saveButton = Selector('input').withAttribute('value', 'Save Changes')
  const successIcon = Selector('.fa-check')
  const deactivateLinkMessage = Selector('a').withText('Deactivate License')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=license`)
  await t.click(licenseInputField)
  await t.selectText(licenseInputField, 32, 0)
  await t.pressKey('backspace')
  await t.typeText(licenseInputField, validLicenseKey, { paste: true })
  await t.click(saveButton)

  // Assertions
  await t.expect(successIcon.exists).ok()
  await t.expect(deactivateLinkMessage.exists).ok()
})
