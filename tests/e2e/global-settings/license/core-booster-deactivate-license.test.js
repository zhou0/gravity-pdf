import { Selector } from 'testcafe'
import Form from '../../page-objects/global-settings/form'

const form = new Form()

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
  await form.navigateSettingsTab('gf_settings&subview=PDF&tab=license')
  await t
    .click(licenseInputField)
    .selectText(licenseInputField, 32, 0)
    .pressKey('backspace')
    .typeText(licenseInputField, validLicenseKey, { paste: true })
    .click(saveButton)
    .wait(3000)
    .click(deactivateLink)
    .wait(3000)

  // Assertions
  await t.expect(deactivatedMessage.exists).ok()
})
