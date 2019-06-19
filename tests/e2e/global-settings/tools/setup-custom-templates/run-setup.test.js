import { Selector } from 'testcafe'
import { admin, baseURL } from '../../../auth'

fixture `Tools Tab - Setup Custom Templates Test`

// Get Global selectors
const runSetupButton = Selector('button').withAttribute('value', 'setup_templates')
const popUpBox = Selector('div').withAttribute('aria-describedby', 'setup-templates-confirm')
const continueButton = Selector('span').withText('Continue')
const cancelButton = Selector('button').withText('Cancel').find('.ui-button-text')

test("should open 'Setup Custom Templates' popup box", async t => {
  // Get selectors
  const showPopUpBox = popUpBox.filterVisible()

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=tools#/`)
  await t.click(runSetupButton)

  // Assertions
  await t.expect(showPopUpBox.count).eql(1)
  await t.expect(continueButton.exists).ok()
  await t.expect(cancelButton.exists).ok()
})

test("should open 'Setup Custom Templates' popup box that can be close / cancel", async t => {
  // Get selectors
  const hidePopUpBox = popUpBox.filterHidden()

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=tools#/`)
  await t.click(runSetupButton)
  await t.click(cancelButton)

  // Assertions
  await t.expect(hidePopUpBox.count).eql(1)
})

test('should run setup for custom templates and display installation success message', async t => {
  // Get selectors
  const updatedNoticeText = Selector('p').withText('Gravity PDF Custom Templates successfully installed to ')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=tools#/`)
  await t.click(runSetupButton)
  await t.click(continueButton)

  // Assertions
  await t.expect(popUpBox.exists).ok()
  await t.expect(continueButton.exists).ok()
  await t.expect(updatedNoticeText.exists).ok()
})
