import { Selector } from 'testcafe'
import {
  fieldLabel,
  fieldDescription,
  dropdownOptionGroup,
  dropdownOption,
  button,
  templateDetails
} from '../../page-model/helpers/field'
import General from '../../page-model/global-settings/general/general'
import { baseURL } from '../../auth'

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

test('should display individual specific Template details', async t => {
  // Get Selectors
  const imageScreenshot = Selector('.screenshot').find('img').withAttribute('src', `${baseURL}/wp-content/uploads/PDF_EXTENDED_TEMPLATES/images/zadani.png`)

  // Actions
  await run.navigateSettingsTab('gf_settings&subview=PDF&tab=general#')
  await t
    .click(button('Advanced'))
    .click(run.zadaniDetailsLink)

  // Assertions
  await t
    .expect(imageScreenshot.exists).ok()
    .expect(templateDetails('current-label', 'Current Template').exists).ok()
    .expect(templateDetails('theme-name', 'Zadani').exists).ok()
    .expect(templateDetails('theme-version', 'Version: ').exists).ok()
    .expect(templateDetails('theme-author', 'Gravity PDF').exists).ok()
    .expect(templateDetails('theme-author', 'Group: Core').exists).ok()
    .expect(templateDetails('theme-description', 'A minimalist business-style template that will generate a well-spaced document great for printing. Through the Template tab you can control the PDF header and footer, change the background color or image, and show or hide the form title, page names, HTML fields and the Section Break descriptions.').exists).ok()
    .expect(templateDetails('theme-tags', 'Tags: Header, Footer, Background, Optional HTML Fields, Optional Page Fields, Field Border Color').exists).ok()
})

test('should navigate to next and previous Template', async t => {
  // Get Selectors
  const blankSlateTemplate = Selector('div').find('[class^="theme-name"]').withText('Blank Slate')
  const zadaniTemplate = Selector('div').find('[class^="theme-name"]').withText('Zadani')

  // Actions & Assertions
  await run.navigateSettingsTab('gf_settings&subview=PDF&tab=general#')
  await t
    .click(button('Advanced'))
    .click(run.zadaniDetailsLink)
    .click(button('Show next template'))
    .expect(blankSlateTemplate.exists).ok()
    .click(button('Show previous template'))
    .expect(zadaniTemplate.exists).ok()
    .pressKey('right')
    .expect(blankSlateTemplate.exists).ok()
    .pressKey('left')
    .expect(zadaniTemplate.exists).ok()
})

test('should display Popup Template Selector that can be close', async t => {
  // Actions
  await run.navigateSettingsTab('gf_settings&subview=PDF&tab=general#')
  await t
    .click(button('Advanced'))
    .click(button('Close dialog'))
    .click(button('Advanced'))
    .pressKey('esc')

  // Assertions
  await t.expect(run.templatePopupBox.exists).notOk()
})

test('should display Template filter search bar', async t => {
  // Get Selectors
  const templateSearchbar = Selector('#wp-filter-search-input')
  const searchResult = Selector('.theme-author')

  // Actions
  await run.navigateSettingsTab('gf_settings&subview=PDF&tab=general#')
  await t
    .click(button('Advanced'))
    .typeText(templateSearchbar, 'rubix', { paste: true })

  // Assertions
  await t
    .expect(templateSearchbar.exists).ok()
    .expect(searchResult.count).eql(1)
})

test('should successfully upload a new Template', async t => {
  // Get Selectors
  const addNewTemplate = Selector('input').withAttribute('type', 'file')
  const templateFile = './files/gpdf-cellulose-1.4.0.zip'
  const imageScreenshot = Selector('.theme-screenshot').find('img').withAttribute('src', `${baseURL}/wp-content/uploads/PDF_EXTENDED_TEMPLATES/images/gpdf-cellulose.png`)

  // Actions
  await run.navigateSettingsTab('gf_settings&subview=PDF&tab=general#')
  await t
    .click(button('Advanced'))
    .setFilesToUpload(addNewTemplate, templateFile)

  // Assertions
  await t
    .expect(templateDetails('notice inline', 'Template successfully installed').exists).ok()
    .expect(imageScreenshot.exists).ok()
    .expect(templateDetails('theme-author', 'Universal (Premium)').exists).ok()
    .expect(templateDetails('theme-name', 'Cellulose').exists).ok()
    .expect(templateDetails('notice inline', 'PDF Template(s) Successfully Installed / Updated').exists).ok()
})

test('should successfully delete a template', async t => {
  // Get Selectors
  const celluloseDetailsLink = Selector('.theme[data-slug="gpdf-cellulose"]').find('span').withText('Template Details')
  const deleteButton = Selector('a').withText('Delete').nth(0)
  const imageScreenshot = Selector('.theme-screenshot').find('img').withAttribute('src', `${baseURL}/wp-content/uploads/PDF_EXTENDED_TEMPLATES/images/gpdf-cellulose.png`)

  // Actions
  await run.navigateSettingsTab('gf_settings&subview=PDF&tab=general#')
  await t
    .setNativeDialogHandler(() => true)
    .click(button('Advanced'))
    .click(celluloseDetailsLink)
    .click(deleteButton)

  // Assertions
  await t
    .expect(imageScreenshot.exists).notOk()
    .expect(templateDetails('theme-author', 'Universal (Premium)').exists).notOk()
    .expect(templateDetails('theme-name', 'Cellulose').exists).notOk()
})
