import { Selector } from 'testcafe'
import License from '../../page-model/global-settings/license/license'

const run = new License()

fixture`License Tab - Core Booster Activate Invalid License Test`

test('should display error icon and error message for invalid license key', async t => {
  // Get selectors
  const errorIcon = Selector('.fa-exclamation-circle')
  const invalidLicenseKeyMessage = Selector('label').withText('An error occurred during activation, please try again')

  // Actions
  await run.navigateSettingsTab('gf_settings&subview=PDF&tab=license')
  await t
    .typeText(run.licenseInputField, run.invalidLicenseKey, {paste: true})
    .click(run.saveButton)

  // Assertions
  await t
    .expect(errorIcon.exists).ok()
    .expect(invalidLicenseKeyMessage.exists).ok()
})
