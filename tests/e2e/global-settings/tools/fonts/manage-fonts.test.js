import { Selector } from 'testcafe'
import { admin, baseURL } from '../../../auth'

fixture `Tools Tab - Manage Fonts Test`

// Get Global selectors
const manageFontsButton = Selector('button').withAttribute('value', 'manage_fonts')
const manageFontsPopupBox = Selector('div').withAttribute('aria-describedby', 'manage-font-files')
const addFontIcon = Selector('.fa-plus')
const deleteIcon = Selector('.fa-trash-o')
const saveFontButton = Selector('button').withText('Save Font')
const confirmDeletePopupBox = Selector('div').withAttribute('aria-describedby', 'delete-confirm')
const deleteButton = Selector('button').withText('Delete').find('.ui-button-text')
const cancelButton = Selector('.ui-dialog-buttonset').nth(2).find('button').withText('Cancel')
const fontList = Selector('#font-list')

test("should open 'Manage Fonts Popup Box'", async t => {
  // Get selectors
  const visibleManageFontsPopupBox = manageFontsPopupBox.filterVisible()
  const dialogTitle = Selector('span').withText('Manage Fonts')
  const contentText = Selector('div').withText('Manage all your custom Gravity PDF fonts in one place. Only .ttf font files are supported and they MUST be uploaded through your media library (no external links).')
  const addFontText = Selector('span').withText('ADD FONT')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=tools#/`)
  await t.click(manageFontsButton)

  // Assertions
  await t.expect(visibleManageFontsPopupBox.count).eql(1)
  await t.expect(dialogTitle.exists).ok()
  await t.expect(contentText.exists).ok()
  await t.expect(addFontIcon.exists).ok()
  await t.expect(addFontText.exists).ok()
})

test("should open 'Manage Fonts Popup Box' that can be close", async t => {
  // Get selectors
  const closeButton = Selector('div').withText('Manage Fonts').nth(10).find('[class^="ui-button ui-widget ui-state-default ui-corner-all"][title="Close"]')
  const hidePopupBox = manageFontsPopupBox.filterHidden()

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=tools#/`)
  await t.click(manageFontsButton)
  await t.click(closeButton)

  // Assertions
  await t.expect(hidePopupBox.count).eql(1)
})

test("should open 'Add Font Dialog Box Settings'", async t => {
  // Get selectors
  const addFontDialogBox = Selector('.font-settings').filterVisible()
  const labeOne = Selector('label').withText('Font Name ')
  const labelTwo = Selector('label').withText('Regular ')
  const labelThree = Selector('label').withText('Italics')
  const labelFour = Selector('label').withText('Bold')
  const labelFive = Selector('label').withText('Bold Italics')
  const fontInfoText = Selector('span').withText('Only alphanumeric characters and spaces are accepted.')
  const inputFieldOne = Selector('[name="font_name"].regular-text.font-name-field')
  const inputFielTwo = Selector('[name="regular"].regular-text')
  const inputFieldThree = Selector('[name="italics"].regular-text')
  const inputFieldFour = Selector('[name="bold"].regular-text')
  const inputFieldFive = Selector('[name="bolditalics"].regular-text')
  const selectFontButton = Selector('div').withText('Regular').nth(4).find('[data-uploader-button-text="Select Font"][data-uploader-title="Select Font"].gfpdf_settings_upload_button.button-secondary')
  const wpMediaModal = Selector('.media-modal')
  const showWPmediaModal = wpMediaModal.filterVisible()

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=tools#/`)
  await t.click(manageFontsButton)
  await t.click(addFontIcon)
  await t.click(selectFontButton)

  // Assertions
  await t.expect(addFontDialogBox.count).eql(1)
  await t.expect(labeOne.exists).ok()
  await t.expect(labelTwo.exists).ok()
  await t.expect(labelThree.exists).ok()
  await t.expect(labelFour.exists).ok()
  await t.expect(labelFive.exists).ok()
  await t.expect(fontInfoText.exists).ok()
  await t.expect(inputFieldOne.exists).ok()
  await t.expect(inputFielTwo.exists).ok()
  await t.expect(inputFieldThree.exists).ok()
  await t.expect(inputFieldFour.exists).ok()
  await t.expect(inputFieldFive.exists).ok()
  await t.expect(saveFontButton.exists).ok()
  await t.expect(showWPmediaModal.count).eql(1)
})

test("should display multiple 'Add Font Dialog Box Settings'", async t => {
  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=tools#/`)
  await t.click(manageFontsButton)
  await t.click(addFontIcon)
  await t.click(addFontIcon)

  // Assertions
  await t.expect(fontList.child('li').nth(0).exists).ok()
  await t.expect(fontList.child('li').nth(1).exists).ok()
})

test("should display 'Add Font Dialog Box Settings' Font Name field RED box error 'Only alphanumeric characters and spaces are accepted'", async t => {
  // Get selectors
  const fontInputField = Selector('[name="font_name"].regular-text.font-name-field')
  const redInputBox = Selector('div').find('[class^="regular-text font-name-field"][style="border-color: red;"]')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=tools#/`)
  await t.click(manageFontsButton)
  await t.click(addFontIcon)
  await t.typeText(fontInputField, 's$$$', { paste: true })

  // Assertions
  await t.expect(redInputBox.exists).ok()
})

test("should display 'Add Font Dialog Box Settings' error message when font file inputed is not TFF", async t => {
  // Get selectors
  const regularFontField = Selector('[name="regular"].regular-text')
  const errorMessage = Selector('label').withText('Only TTF font files are supported.')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=tools#/`)
  await t.click(manageFontsButton)
  await t.click(addFontIcon)
  await t.typeText(regularFontField, 'https://gravitypdf.com/Gotham-Black-Regular.otf', { paste: true })
  await t.click(saveFontButton)

  // Assertions
  await t.expect(errorMessage.exists).ok()
})

test("should open 'Add Font Dialog Box Settings' that can be minimize", async t => {
  // Get selectors
  const minimizeIcon = Selector('.fa-angle-right')
  const addFontDialogBox = Selector('.font-settings').filterHidden()

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=tools#/`)
  await t.click(manageFontsButton)
  await t.click(addFontIcon)
  await t.click(minimizeIcon)

  // Assertions
  await t.expect(addFontDialogBox.count).eql(1)
})

test("should open 'Add Font Dialog Box Settings' with a confirmation Popup to delete", async t => {
  // Get selectors
  const visibleConfirmDeletePopupBox = confirmDeletePopupBox.filterVisible()
  const dialogTitle = Selector('span').withText('Delete Font?')
  const contentText = Selector('div').withText("Warning! You are about to delete this Font. Select 'Delete' to delete, 'Cancel' to stop.")

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=tools#/`)
  await t.click(manageFontsButton)
  await t.click(addFontIcon)
  await t.click(deleteIcon)

  // Assertions
  await t.expect(visibleConfirmDeletePopupBox.count).eql(1)
  await t.expect(dialogTitle.exists).ok()
  await t.expect(contentText.exists).ok()
  await t.expect(deleteButton.exists).ok()
})

test("should open 'Add Font Dialog Box Settings' that can be close", async t => {
  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=tools#/`)
  await t.click(manageFontsButton)
  await t.click(addFontIcon)
  await t.click(deleteIcon)
  await t.click(cancelButton)

  // Assertions
  await t.expect(confirmDeletePopupBox.exists).notOk()
})

test("should open 'Add Font Dialog Box Settings' that can be deleted", async t => {
  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=tools#/`)
  await t.click(manageFontsButton)
  await t.click(addFontIcon)
  await t.click(deleteIcon)
  await t.click(deleteButton)

  // Assertions
  await t.expect(fontList.child('li').nth(0).exists).notOk()
})
