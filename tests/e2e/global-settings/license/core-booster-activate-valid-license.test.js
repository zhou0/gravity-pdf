import { Selector } from 'testcafe'
import License from '../../page-model/global-settings/license/license'

const run = new License()

fixture`License Tab - Core Booster Activate Valid License Test`

test('should display success icon and deactivation option for active license key', async t => {
  // Get selectors
  const successIcon = Selector('.fa-check')
  const deactivateLinkMessage = Selector('a').withText('Deactivate License')

  // Actions
  await run.navigateSettingsTab('gf_settings&subview=PDF&tab=license')
  await t
    .typeText(run.licenseInputField, run.validLicenseKey, {paste: true})
    .click(run.saveButton)

  // Assertions
  await t
    .expect(successIcon.exists).ok()
    .expect(deactivateLinkMessage.exists).ok()
})
