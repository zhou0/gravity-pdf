import { Selector } from 'testcafe'
import Form from '../../page-objects/global-settings/form'

const form = new Form()

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
  await form.navigateSettingsTab('gf_settings&subview=PDF&tab=license')
  await t
    .click(licenseInputField)
    .selectText(licenseInputField, 32, 0)
    .pressKey('backspace')
    .typeText(licenseInputField, validLicenseKey, { paste: true })
    .click(saveButton)

  // Assertions
  await t
    .expect(successIcon.exists).ok()
    .expect(deactivateLinkMessage.exists).ok()
})
