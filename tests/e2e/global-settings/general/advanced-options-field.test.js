import { Selector } from 'testcafe'
import { admin, baseURL } from '../../auth'

fixture `General Tab - Advanced Options Field Test`

// Get Global selectors
const showLabelText = Selector('a').withText('Show Advanced Options...')
const advancedOptionsField = Selector('#gfpdf-advanced-options')

test('should display Show Advanced Options field link', async t => {
  // Get selectors
  const showAdvancedOptionsField = advancedOptionsField.filterVisible()

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=general#/`)
  await t.click(showLabelText)

  // Assertions
  await t.expect(showAdvancedOptionsField.count).eql(1)
})

test('should display Show Advanced Options field', async t => {
  // Get selectors
  const headingText = Selector('span').withText('Security Settings')

  const firstLabel = Selector('th').withText('User Restriction')
  const selectBox = Selector('#gfpdf_settings_admin_capabilities__chosen')
  const dropDownList = Selector('.chosen-results')
  const gravityFormsCapabilitiesGroup = Selector('optgroup').withAttribute('label', 'Gravity Forms Capabilities')
  const gravityFormsCapabilitiesFirstOption = Selector('option').withText('gravityforms_create_form')
  const gravityFormsCapabilitiesSecondOption = Selector('option').withText('gravityforms_delete_forms')
  const activeWordpressCapabilitiesGroup = Selector('optgroup').withAttribute('label', 'Active WordPress Capabilities')
  const activeWordpressCapabilitiesFirstOption = Selector('option').withText('activate_plugins')
  const activeWordpressCapabilitiesSecondOption = Selector('option').withText('create_users')
  const firstLabelInfoText = Selector('label').withText('Restrict PDF access to users with any of these capabilities. The Administrator Role always has full access.')

  const secondLabel = Selector('th').withText('Default Owner Restrictions')
  const enable = Selector('div').find('[class^="gfpdf_settings_default_restrict_owner"][value="Yes"]')
  const disable = Selector('div').find('[class^="gfpdf_settings_default_restrict_owner"][value="No"]')
  const secondLabelInfoText = Selector('label').withText('Set the default PDF owner permissions. When enabled, the original entry owner will NOT be able to view the PDFs (unless they have one of the above capabilities).')

  const thirdLabel = Selector('th').withText('Logged Out Timeout')
  const inputBox = Selector('#gfpdf_settings\\[logged_out_timeout\\]')
  const thirdLabelInfoText = Selector('label').withText('Limit how long a logged out users has direct access to the PDF after completing the form. Set to 0 to disable time limit (not recommended).')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=general#/`)
  await t.click(showLabelText)

  // Assertions
  await t.expect(headingText.exists).ok()
  await t.expect(firstLabel.exists).ok()
  await t.expect(selectBox.exists).ok()
  await t.expect(dropDownList.exists).ok()
  await t.expect(gravityFormsCapabilitiesGroup.exists).ok()
  await t.expect(gravityFormsCapabilitiesFirstOption.exists).ok()
  await t.expect(gravityFormsCapabilitiesSecondOption.exists).ok()
  await t.expect(activeWordpressCapabilitiesGroup.exists).ok()
  await t.expect(activeWordpressCapabilitiesFirstOption.exists).ok()
  await t.expect(activeWordpressCapabilitiesSecondOption.exists).ok()
  await t.expect(firstLabelInfoText.exists).ok()
  await t.expect(secondLabel.exists).ok()
  await t.expect(enable.exists).ok()
  await t.expect(disable.exists).ok()
  await t.expect(secondLabelInfoText.exists).ok()
  await t.expect(thirdLabel.exists).ok()
  await t.expect(inputBox.exists).ok()
  await t.expect(thirdLabelInfoText.exists).ok()
})

test('should hide Show Advanced Options field', async t => {
  // Get selectors
  const hideLabelText = Selector('a').withText('Hide Advanced Options...')
  const hideAdvancedOptionsField = advancedOptionsField.filterHidden()

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=general#/`)
  await t.click(showLabelText)
  await t.click(hideLabelText)

  // Assertions
  await t.expect(hideLabelText.exists).ok()
  await t.wait(1000)
  await t.expect(hideAdvancedOptionsField.count).eql(1)
})
