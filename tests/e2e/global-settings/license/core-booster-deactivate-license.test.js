import { Selector } from 'testcafe'
import License from '../../page-model/global-settings/license/license'

const run = new License()

fixture`License Tab - Core Booster Deactivate License Test`

test('should deactivate license and display deactivated message', async t => {
  // Get selectors
  const deactivateLink = Selector('.gfpdf-deactivate-license')
  const deactivatedMessage = Selector('label').withText('License deactivated.')

  // Actions
  await run.navigateSettingsTab('gf_settings&subview=PDF&tab=license')
  await t
    .typeText(run.licenseInputField, run.validLicenseKey, {paste: true})
    .click(run.saveButton)
    .wait(3000)
    .click(deactivateLink)
    .wait(3000)

  // Assertions
  await t.expect(deactivatedMessage.exists).ok()
})
