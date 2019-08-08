import { Selector } from 'testcafe'
import {
  fieldLabel,
  fieldDescription,
  dropdownOptionGroup,
  dropdownOption,
  button
} from '../../page-model/helpers/field'
import General from '../../page-model/global-settings/general/general'

const run = new General()

fixture`General Tab - Default Template Field Test`

test('should display \'Default Template Field\'', async t => {
  // Actions
  await run.navigateSettingsTab('gf_settings&subview=PDF&tab=general#')

  // Assertions
  await t
    .expect(fieldLabel('Default Template').exists).ok()
    .expect(run.templateSelectBox.exists).ok()
    .expect(fieldDescription('Choose an existing template or purchased more from our template shop. You can also build your own or hire us to create a custom solution.', 'label').exists).ok()
    .expect(button('Advanced').exists).ok()
})

test('should display the Core Templates dropdown option', async t => {
  // Actions
  await run.navigateSettingsTab('gf_settings&subview=PDF&tab=general#')

  // Assertions
  await t
    .expect(dropdownOptionGroup('Core').exists).ok()
    .expect(dropdownOption('Blank Slate').exists).ok()
    .expect(dropdownOption('Focus Gravity').exists).ok()
    .expect(dropdownOption('Rubix').exists).ok()
    .expect(dropdownOption('Zadani').exists).ok()
})

test('should display Popup Template Selector', async t => {
  // Get selectors
  const popupHeaderText = Selector('h1').withText('Installed PDFs')
  const installedTemplatesSearchbar = Selector('#wp-filter-search-input')
  const individualThemeBox = Selector('.theme')
  const themeScreenshot = Selector('.theme-screenshot')
  const themeAuthor = Selector('.theme-author')
  const themeName = Selector('.theme-name')
  const themeSelectButton = Selector('a').withText('Select')
  const themeDetailsLink = Selector('span').withText('Template Details')

  // Actions
  await run.navigateSettingsTab('gf_settings&subview=PDF&tab=general#')
  await t.click(button('Advanced'))

  // Assertions
  await t
    .expect(run.templatePopupBox.exists).ok()
    .expect(popupHeaderText.exists).ok()
    .expect(button('Close dialog').exists).ok()
    .expect(installedTemplatesSearchbar.exists).ok()
    .expect(individualThemeBox.exists).ok()
    .expect(themeScreenshot.exists).ok()
    .expect(themeAuthor.exists).ok()
    .expect(themeName.exists).ok()
    .expect(themeSelectButton.exists).ok()
    .expect(themeDetailsLink.exists).ok()
})

test('should display \'Add New Template Dropzone\'', async t => {
  // Get selectors
  const dropZoneBox = Selector('.dropzone')
  const addNewTemplateButton = Selector('a').withText('Add New Template').find('div').find('span')
  const installationMessage = Selector('div')

  // Actions
  await run.navigateSettingsTab('gf_settings&subview=PDF&tab=general#')
  await t.click(button('Advanced'))

  // Assertions
  await t
    .expect(dropZoneBox.exists).ok()
    .expect(addNewTemplateButton.exists).ok()
    .expect(installationMessage.innerText).contains('If you have a PDF template in .zip format you may install it here. You can also update an existing PDF template (this will override any changes you have made).')
})

test('should display Popup Template Selector that can be close', async t => {
  // Actions
  await run.navigateSettingsTab('gf_settings&subview=PDF&tab=general#')
  await t
    .click(button('Advanced'))
    .click(button('Close dialog'))

  // Assertions
  await t.expect(run.templatePopupBox.exists).notOk()
})

test('should display Template filter search bar', async t => {
  // Get selectors
  const templateSearchbar = Selector('#wp-filter-search-input')
  const searchResult = Selector('.theme-author')

  // Actions
  await run.navigateSettingsTab('gf_settings&subview=PDF&tab=general#')
  await t
    .click(button('Advanced'))
    .typeText(templateSearchbar, 'rubix', {paste: true})

  // Assertions
  await t
    .expect(templateSearchbar.exists).ok()
    .expect(searchResult.count).eql(1)
})
