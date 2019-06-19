import { Selector } from 'testcafe'
import { admin, baseURL } from '../auth'

fixture `PDF Template - Appearance Settings Test`

// Get Global selectors
const form = Selector('#the-list').find('tr').withText('Test Form')
const entriesLink = Selector('#the-list').find('tr').withText('Test Form').find('span').withText('Entries')
const settingsMenu = Selector('.gf_form_toolbar_settings')
const pdfLink = Selector('.gf_submenu').find('a').withText('PDF')
const addNewPdf = Selector('#add-new-pdf')
const appearanceLink = Selector('#gfpdf-appearance-nav')
const selectBoxPaperSize = Selector('div').find('[class^="chosen-container chosen-container-single"][id="gfpdf_settings_pdf_size__chosen"]')
const selectBoxFont = Selector('div').find('[class^="chosen-container chosen-container-single"][id="gfpdf_settings_font__chosen"]')

test('should display Paper Size field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Paper Size')
  const fieldDescription = Selector('span').withText('Set the paper size used when generating PDFs.')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(appearanceLink)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(selectBoxPaperSize.exists).ok()
  await t.expect(fieldDescription.exists).ok()
})

test('should display a dropdown of paper sizes option', async t => {
  // Get selectors
  const dropDownList = Selector('.chosen-results')

  const commonSizesGroup = Selector('optgroup').withAttribute('label', 'Common Sizes')
  const commonSizesFirstOption = Selector('option').withText('A4 (210 x 297mm)')
  const commonSizedSecondOption = Selector('option').withText('Letter (8.5 x 11in)')

  const aSizesGroup = Selector('optgroup').withAttribute('label', '"A" Sizes')
  const aSizesFirstOption = Selector('option').withText('A0 (841 x 1189mm)')
  const aSizesSecondOption = Selector('option').withText('A1 (594 x 841mm)')

  const bSizeGroup = Selector('optgroup').withAttribute('label', '"B" Sizes')
  const bSizeFirstOption = Selector('option').withText('B0 (1414 x 1000mm)')
  const bSizeSecondOption = Selector('option').withText('B1 (1000 x 707mm)')

  const cSizeGroup = Selector('optgroup').withAttribute('label', '"C" Sizes')
  const cSizeFirstOption = Selector('option').withText('C0 (1297 x 917mm)')
  const cSizeSecondOption = Selector('option').withText('C1 (917 x 648mm)')

  const raSRAGroup = Selector('optgroup').withAttribute('label', '"RA" and "SRA" Sizes')
  const raSRAfirstOption = Selector('option').withText('RA0 (860 x 1220mm)')
  const raSRAsecondOption = Selector('option').withText('RA1 (610 x 860mm)')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(appearanceLink)

  // Assertions
  await t.expect(dropDownList.exists).ok()
  await t.expect(commonSizesGroup.exists).ok()
  await t.expect(commonSizesFirstOption.exists).ok()
  await t.expect(commonSizedSecondOption.exists).ok()
  await t.expect(aSizesGroup.exists).ok()
  await t.expect(aSizesFirstOption.exists).ok()
  await t.expect(aSizesSecondOption.exists).ok()
  await t.expect(bSizeGroup.exists).ok()
  await t.expect(bSizeFirstOption.exists).ok()
  await t.expect(bSizeSecondOption.exists).ok()
  await t.expect(cSizeGroup.exists).ok()
  await t.expect(cSizeFirstOption.exists).ok()
  await t.expect(cSizeSecondOption.exists).ok()
  await t.expect(raSRAGroup.exists).ok()
  await t.expect(raSRAfirstOption.exists).ok()
  await t.expect(raSRAsecondOption.exists).ok()
})

test('should search and display existing paper size result', async t => {
  // Get selectors
  const searchBox = Selector('#gfpdf_settings_pdf_size__chosen').find('.chosen-search-input')
  const result = Selector('div').find('[class^="active-result group-option highlighted"]')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(appearanceLink)
  await t.click(selectBoxPaperSize)
  await t.typeText(searchBox, 'letter', { paste: true })

  // Assertions
  await t.expect(result.count).eql(1)
})

test('should display Orientation field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Orientation')
  const orientationDropdownField = Selector('#gfpdf_settings_orientation__chosen')
  const portraitOption = Selector('li').withText('Portrait')
  const landscapeOption = Selector('li').withText('Landscape')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(appearanceLink)
  await t.click(orientationDropdownField)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(orientationDropdownField.exists).ok()
  await t.expect(portraitOption.exists).ok()
  await t.expect(landscapeOption.exists).ok()
})

test('should display Font field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Font')
  const fontDropdownField = Selector('#gfpdf_settings_font__chosen')
  const fieldDescription = Selector('span').withText('Set the font type used in PDFs. Choose an existing font or install your own.')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(appearanceLink)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(fontDropdownField.exists).ok()
  await t.expect(fieldDescription.exists).ok()
})

test('should display a dropdown of Fonts', async t => {
  // Get selectors
  const unicodeGroup = Selector('optgroup').withAttribute('label', 'Unicode')
  const unicodeFirstOption = Selector('option').withText('Dejavu Sans Condensed')
  const unicodeSecondOption = Selector('option').withText('Dejavu Sans')

  const indicGroup = Selector('optgroup').withAttribute('label', 'Indic')
  const indicFirstOption = Selector('option').withText('Lohit Kannada')
  const indicSecondOption = Selector('option').withText('Pothana2000')

  const arabicGroup = Selector('optgroup').withAttribute('label', 'Arabic')
  const arabicFirstOption = Selector('option').withText('XB Riyaz')
  const arabicSecondOption = Selector('option').withText('Lateef')

  const chineseGroup = Selector('optgroup').withAttribute('label', 'Chinese, Japanese, Korean')
  const chineseFirstOption = Selector('option').withText('Sun Ext')
  const chineseSecondOption = Selector('option').withText('Un Batang (Korean)')

  const otherGroup = Selector('optgroup').withAttribute('label', 'Other')
  const otherFirstOption = Selector('option').withText('Estrangelo Edessa (Syriac)')
  const otherSecondOption = Selector('option').withText('Kaputa (Sinhala)')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(appearanceLink)
  await t.click(selectBoxFont)

  // Assertions
  await t.expect(unicodeGroup.exists).ok()
  await t.expect(unicodeFirstOption.exists).ok()
  await t.expect(unicodeSecondOption.exists).ok()
  await t.expect(indicGroup.exists).ok()
  await t.expect(indicFirstOption.exists).ok()
  await t.expect(indicSecondOption.exists).ok()
  await t.expect(arabicGroup.exists).ok()
  await t.expect(arabicFirstOption.exists).ok()
  await t.expect(arabicSecondOption.exists).ok()
  await t.expect(chineseGroup.exists).ok()
  await t.expect(chineseFirstOption.exists).ok()
  await t.expect(chineseSecondOption.exists).ok()
  await t.expect(otherGroup.exists).ok()
  await t.expect(otherFirstOption.exists).ok()
  await t.expect(otherSecondOption.exists).ok()
})

test('should search and display existing font result', async t => {
  // Get selectors
  const searchBox = Selector('#gfpdf_settings_font__chosen').find('.chosen-search-input')
  const result = Selector('div').find('[class^="active-result group-option highlighted"]')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(appearanceLink)
  await t.click(selectBoxFont)
  await t.typeText(searchBox, 'Free Sans', { paste: true })

  // Assertions
  await t.expect(result.count).eql(1)
})

test('should display Font Size field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Font Size')
  const fontSizeInputBox = Selector('#gfpdf_settings\\[font_size\\]')
  const fieldDescription = Selector('span').withText('Set the font size to use in the PDF.')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(appearanceLink)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(fontSizeInputBox.exists).ok()
  await t.expect(fieldDescription.exists).ok()
})

test('should display Font Color field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Font Color')
  const selectColorButton = Selector('div').find('[class^="button wp-color-result"]')
  const fieldDescription = Selector('span').withText('Set the font color to use in the PDF.')
  const popupPickerBox = Selector('.wp-picker-container')
  const showPopupPickerBox = Selector('.wp-picker-active')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(appearanceLink)
  await t.click(selectColorButton)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(selectColorButton.exists).ok()
  await t.expect(fieldDescription.exists).ok()
  await t.expect(popupPickerBox.exists).ok()
  await t.expect(showPopupPickerBox.exists).ok()
})

test('should display Reverse Text (RTL) field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Reverse Text (RTL)')
  const fieldDescription = Selector('span').withText('Script like Arabic and Hebrew are written right to left.')
  const rtlYes = Selector('#gfpdf_settings\\[rtl\\]\\[Yes\\]')
  const rtlNo = Selector('#gfpdf_settings\\[rtl\\]\\[No\\]')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(appearanceLink)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(fieldDescription.exists).ok()
  await t.expect(rtlYes.exists).ok()
  await t.expect(rtlNo.exists).ok()
})
