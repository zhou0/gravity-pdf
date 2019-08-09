import { Selector } from 'testcafe'
import { fieldLabel, fieldDescription, button } from '../../../page-model/helpers/field'
import Fonts from '../../../page-model/global-settings/tools/fonts/fonts'

const font = new Fonts()

fixture`Tools Tab - Manage Fonts Test`

test('should open \'Manage Fonts Popup Box\'', async t => {
  // Get selectors
  const visibleManageFontsPopupBox = font.manageFontsPopupBox.filterVisible()
  const dialogTitle = Selector('span').withText('Manage Fonts')
  const addFontText = Selector('span').withText('ADD FONT')

  // Actions
  await font.navigateSettingsTab('gf_settings&subview=PDF&tab=tools#/')

  // Assertions
  await t
    .expect(visibleManageFontsPopupBox.count).eql(1)
    .expect(dialogTitle.exists).ok()
    .expect(fieldDescription('Manage all your custom Gravity PDF fonts in one place. Only .ttf font files are supported and they MUST be uploaded through your media library (no external links).', 'div').exists).ok()
    .expect(font.addFontIcon.exists).ok()
    .expect(addFontText.exists).ok()
})

test('should open \'Manage Fonts Popup Box\' that can be close', async t => {
  // Get selectors
  const closeButton = Selector('div').withText('Manage Fonts').nth(10).find('[class^="ui-button ui-widget ui-state-default ui-corner-all"][title="Close"]')
  const hidePopupBox = font.manageFontsPopupBox.filterHidden()

  // Actions
  await font.navigateSettingsTab('gf_settings&subview=PDF&tab=tools#/')
  await t.click(closeButton)

  // Assertions
  await t.expect(hidePopupBox.count).eql(1)
})

test('should open \'Add Font Dialog Box Settings\'', async t => {
  // Get selectors
  const addFontDialogBox = Selector('.font-settings').filterVisible()
  const inputFieldOne = Selector('[name="font_name"].regular-text.font-name-field')
  const inputFielTwo = Selector('[name="regular"].regular-text')
  const inputFieldThree = Selector('[name="italics"].regular-text')
  const inputFieldFour = Selector('[name="bold"].regular-text')
  const inputFieldFive = Selector('[name="bolditalics"].regular-text')
  const selectFontButton = Selector('div').withText('Regular').nth(4).find('[data-uploader-button-text="Select Font"][data-uploader-title="Select Font"].gfpdf_settings_upload_button.button-secondary')
  const wpMediaModal = Selector('.media-modal')
  const showWPmediaModal = wpMediaModal.filterVisible()

  // Actions
  await font.navigateSettingsTab('gf_settings&subview=PDF&tab=tools#/')
  await t
    .click(font.addFontIcon)
    .click(selectFontButton)

  // Assertions
  await t
    .expect(addFontDialogBox.count).eql(1)
    .expect(fieldLabel('Font Name ', 'label').exists).ok()
    .expect(fieldLabel('Regular ', 'label').exists).ok()
    .expect(fieldLabel('Italics', 'label').exists).ok()
    .expect(fieldLabel('Bold', 'label').exists).ok()
    .expect(fieldLabel('Bold Italics', 'label').exists).ok()
    .expect(fieldDescription('Only alphanumeric characters and spaces are accepted.').exists).ok()
    .expect(inputFieldOne.exists).ok()
    .expect(inputFielTwo.exists).ok()
    .expect(inputFieldThree.exists).ok()
    .expect(inputFieldFour.exists).ok()
    .expect(inputFieldFive.exists).ok()
    .expect(button('Save Font').exists).ok()
    .expect(showWPmediaModal.count).eql(1)
})

test('should display multiple \'Add Font Dialog Box Settings\'', async t => {
  // Actions
  await font.navigateSettingsTab('gf_settings&subview=PDF&tab=tools#/')
  await t
    .click(font.addFontIcon)
    .click(font.addFontIcon)

  // Assertions
  await t
    .expect(font.fontList.child('li').nth(0).exists).ok()
    .expect(font.fontList.child('li').nth(1).exists).ok()
})

test('should display \'Add Font Dialog Box Settings\' Font Name field RED box error \'Only alphanumeric characters and spaces are accepted\'', async t => {
  // Get selectors
  const fontInputField = Selector('[name="font_name"].regular-text.font-name-field')
  const redInputBox = Selector('div').find('[class^="regular-text font-name-field"][style="border-color: red;"]')

  // Actions
  await font.navigateSettingsTab('gf_settings&subview=PDF&tab=tools#/')
  await t
    .click(font.addFontIcon)
    .typeText(fontInputField, 's$$$', { paste: true })

  // Assertions
  await t.expect(redInputBox.exists).ok()
})

test('should display \'Add Font Dialog Box Settings\' error message when font file inputed is not TFF', async t => {
  // Get selectors
  const regularFontField = Selector('[name="regular"].regular-text')
  const errorMessage = Selector('label').withText('Only TTF font files are supported.')

  // Actions
  await font.navigateSettingsTab('gf_settings&subview=PDF&tab=tools#/')
  await t
    .click(font.addFontIcon)
    .typeText(regularFontField, 'https://gravitypdf.com/Gotham-Black-Regular.otf', { paste: true })
    .click(button('Save Font'))

  // Assertions
  await t.expect(errorMessage.exists).ok()
})

test('should open \'Add Font Dialog Box Settings\' that can be minimize', async t => {
  // Get selectors
  const minimizeIcon = Selector('.fa-angle-right')
  const addFontDialogBox = Selector('.font-settings').filterHidden()

  // Actions
  await font.navigateSettingsTab('gf_settings&subview=PDF&tab=tools#/')
  await t
    .click(font.addFontIcon)
    .click(minimizeIcon)

  // Assertions
  await t.expect(addFontDialogBox.count).eql(1)
})

test('should open \'Add Font Dialog Box Settings\' with a confirmation Popup to delete', async t => {
  // Get selectors
  const visibleConfirmDeletePopupBox = font.confirmDeletePopupBox.filterVisible()
  const dialogTitle = Selector('span').withText('Delete Font?')
  const contentText = Selector('div').withText('Warning! You are about to delete this Font. Select \'Delete\' to delete, \'Cancel\' to stop.')

  // Actions
  await font.navigateSettingsTab('gf_settings&subview=PDF&tab=tools#/')
  await t
    .click(font.addFontIcon)
    .click(font.deleteIcon)

  // Assertions
  await t
    .expect(visibleConfirmDeletePopupBox.count).eql(1)
    .expect(dialogTitle.exists).ok()
    .expect(contentText.exists).ok()
    .expect(button('Delete').exists).ok()
})

test('should open \'Add Font Dialog Box Settings\' that can be close', async t => {
  // Get selectors
  const cancelButton = Selector('[class^="ui-button ui-widget ui-state-default ui-corner-all"]').nth(9).find('span').withText('Cancel')

  // Actions
  await font.navigateSettingsTab('gf_settings&subview=PDF&tab=tools#/')
  await t
    .click(font.addFontIcon)
    .click(font.deleteIcon)
    .click(cancelButton)

  // Assertions
  await t.expect(font.confirmDeletePopupBox.exists).notOk()
})

test('should open \'Add Font Dialog Box Settings\' that can be deleted', async t => {
  // Actions
  await font.navigateSettingsTab('gf_settings&subview=PDF&tab=tools#/')
  await t
    .click(font.addFontIcon)
    .click(font.deleteIcon)
    .click(button('Delete'))

  // Assertions
  await t.expect(font.fontList.child('li').nth(0).exists).notOk()
})
