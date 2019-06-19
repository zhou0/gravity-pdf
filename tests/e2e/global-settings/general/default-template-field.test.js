import { Selector } from 'testcafe'
import { admin, baseURL } from '../../auth'

fixture `General Tab - Default Template Field Test`

// Get Global selectors
const selectBox = Selector('div').find('[class^="chosen-container chosen-container-single"][id="gfpdf_settings_default_template__chosen"]')
const advancedButton = Selector('button').withText('Advanced')
const templatePopupBox = Selector('div').find('[class^="container theme-wrap"]')
const closeButton = Selector('button').withAttribute('aria-label', 'close')
const installedTemplatesSearchbar = Selector('#wp-filter-search-input')

test("should display 'Default Template Field'", async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Default Template')
  const fieldDescription = Selector('label').withText('Choose an existing template or purchased more from our template shop. You can also build your own or hire us to create a custom solution.')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=general#/`)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(selectBox.exists).ok()
  await t.expect(fieldDescription.exists).ok()
  await t.expect(advancedButton.exists).ok()
})

test('should display the Core Templates dropdown option', async t => {
  // Get selectors
  const coreTemplatesGroup = Selector('optgroup').withAttribute('label', 'Core')
  const blankSlateOption = Selector('option').withText('Blank Slate')
  const focusGravityOption = Selector('option').withText('Focus Gravity')
  const rubixOption = Selector('option').withText('Rubix')
  const zadaniOption = Selector('option').withText('Zadani')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=general#/`)

  // Assertions
  await t.expect(coreTemplatesGroup.exists).ok()
  await t.expect(blankSlateOption.exists).ok()
  await t.expect(focusGravityOption.exists).ok()
  await t.expect(rubixOption.exists).ok()
  await t.expect(zadaniOption.exists).ok()
})

test('should display Popup Template Selector', async t => {
  // Get selectors
  const popupHeaderText = Selector('h1').withText('Installed PDFs')
  const individualThemeBox = Selector('.theme')
  const themeScreenshot = Selector('.theme-screenshot')
  const themeAuthor = Selector('.theme-author')
  const themeName = Selector('.theme-name')
  const themeSelectButton = Selector('a').withText('Select')
  const themeDetailsLink = Selector('span').withText('Template Details')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=general#/`)
  await t.click(advancedButton)

  // Assertions
  await t.expect(templatePopupBox.exists).ok()
  await t.expect(popupHeaderText.exists).ok()
  await t.expect(closeButton.exists).ok()
  await t.expect(installedTemplatesSearchbar.exists).ok()
  await t.expect(individualThemeBox.exists).ok()
  await t.expect(themeScreenshot.exists).ok()
  await t.expect(themeAuthor.exists).ok()
  await t.expect(themeName.exists).ok()
  await t.expect(themeSelectButton.exists).ok()
  await t.expect(themeDetailsLink.exists).ok()
})

test("should display 'Add New Template Dropzone'", async t => {
  // Get selectors
  const dropZoneBox = Selector('.dropzone')
  const addNewTemplateButton = Selector('a').withText('Add New Template').find('div').find('span')
  const installationMessage = Selector('div')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=general#/`)
  await t.click(advancedButton)

  // Assertions
  await t.expect(dropZoneBox.exists).ok()
  await t.expect(addNewTemplateButton.exists).ok()
  await t
    .expect(installationMessage.innerText)
    .contains('If you have a PDF template in .zip format you may install it here. You can also update an existing PDF template (this will override any changes you have made).')
})

test('should display Popup Template Selector that can be close', async t => {
  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=general#/`)
  await t.click(advancedButton)
  await t.click(closeButton)

  // Assertions
  await t.expect(templatePopupBox.exists).notOk()
})

test('should display Template filter search bar', async t => {
  // Get selectors
  const templateSearchbar = Selector('#wp-filter-search-input')
  const searchResult = Selector('.theme-author')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=general#/`)
  await t.click(advancedButton)
  await t.typeText(templateSearchbar, 'rubix', { paste: true })

  // Assertions
  await t.expect(templateSearchbar.exists).ok()
  await t.expect(searchResult.count).eql(1)
})
