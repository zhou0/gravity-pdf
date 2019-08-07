import { Selector } from 'testcafe'
import {
  fieldLabel,
  fieldDescription,
  dropdownOption,
  dropdownOptionGroup,
  listItem
} from '../page-objects/helpers/field'
import Form from '../page-objects/form-settings/form'

const form = new Form()

fixture`PDF Template - Appearance Settings Test`

// Get Global selectors
const appearanceLink = Selector('#gfpdf-appearance-nav')
const selectBoxPaperSize = Selector('div').find('[class^="chosen-container chosen-container-single"][id="gfpdf_settings_pdf_size__chosen"]')
const selectBoxFont = Selector('div').find('[class^="chosen-container chosen-container-single"][id="gfpdf_settings_font__chosen"]')

test('should display Paper Size field', async t => {
  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(appearanceLink)

  // Assertions
  await t.expect(fieldLabel('Paper Size').exists).ok()
  await t.expect(selectBoxPaperSize.exists).ok()
  await t.expect(fieldDescription('Set the paper size used when generating PDFs.').exists).ok()
})

test('should display a dropdown of paper sizes option', async t => {
  // Get selectors
  const dropDownList = Selector('.chosen-results')

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(appearanceLink)

  // Assertions
  await t.expect(dropDownList.exists).ok()

  await t.expect(dropdownOptionGroup('Common Sizes').exists).ok()
  await t.expect(dropdownOption('A4 (210 x 297mm)').exists).ok()
  await t.expect(dropdownOption('Letter (8.5 x 11in)').exists).ok()

  await t.expect(dropdownOptionGroup('"A" Sizes').exists).ok()
  await t.expect(dropdownOption('A0 (841 x 1189mm)').exists).ok()
  await t.expect(dropdownOption('A1 (594 x 841mm)').exists).ok()

  await t.expect(dropdownOptionGroup('"B" Sizes').exists).ok()
  await t.expect(dropdownOption('B0 (1414 x 1000mm)').exists).ok()
  await t.expect(dropdownOption('B1 (1000 x 707mm)').exists).ok()

  await t.expect(dropdownOptionGroup('"C" Sizes').exists).ok()
  await t.expect(dropdownOption('C0 (1297 x 917mm)').exists).ok()
  await t.expect(dropdownOption('C1 (917 x 648mm)').exists).ok()

  await t.expect(dropdownOptionGroup('"RA" and "SRA" Sizes').exists).ok()
  await t.expect(dropdownOption('RA0 (860 x 1220mm)').exists).ok()
  await t.expect(dropdownOption('RA1 (610 x 860mm)').exists).ok()
})

test('should search and display existing paper size result', async t => {
  // Get selectors
  const searchBox = Selector('#gfpdf_settings_pdf_size__chosen').find('.chosen-search-input')
  const result = Selector('div').find('[class^="active-result group-option highlighted"]')

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(appearanceLink)
  await t.click(selectBoxPaperSize)
  await t.typeText(searchBox, 'letter', {paste: true})

  // Assertions
  await t.expect(result.count).eql(1)
})

test('should display Orientation field', async t => {
  // Get selectors
  const orientationDropdownField = Selector('#gfpdf_settings_orientation__chosen')

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(appearanceLink)
  await t.click(orientationDropdownField)

  // Assertions
  await t.expect(fieldLabel('Orientation').exists).ok()
  await t.expect(orientationDropdownField.exists).ok()
  await t.expect(listItem('Portrait').exists).ok()
  await t.expect(listItem('Landscape').exists).ok()
})

test('should display Font field', async t => {
  // Get selectors
  const fontDropdownField = Selector('#gfpdf_settings_font__chosen')

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(appearanceLink)

  // Assertions
  await t.expect(fieldLabel('Font').exists).ok()
  await t.expect(fontDropdownField.exists).ok()
  await t.expect(fieldDescription('Set the font type used in PDFs. Choose an existing font or install your own.').exists).ok()
})

test('should display a dropdown of Fonts', async t => {
  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(appearanceLink)
  await t.click(selectBoxFont)

  // Assertions
  await t.expect(dropdownOptionGroup('Unicode').exists).ok()
  await t.expect(dropdownOption('Dejavu Sans Condensed').exists).ok()
  await t.expect(dropdownOption('Dejavu Sans').exists).ok()

  await t.expect(dropdownOptionGroup('Indic').exists).ok()
  await t.expect(dropdownOption('Lohit Kannada').exists).ok()
  await t.expect(dropdownOption('Pothana2000').exists).ok()

  await t.expect(dropdownOptionGroup('Arabic').exists).ok()
  await t.expect(dropdownOption('XB Riyaz').exists).ok()
  await t.expect(dropdownOption('Lateef').exists).ok()

  await t.expect(dropdownOptionGroup('Chinese, Japanese, Korean').exists).ok()
  await t.expect(dropdownOption('Sun Ext').exists).ok()
  await t.expect(dropdownOption('Un Batang (Korean)').exists).ok()

  await t.expect(dropdownOptionGroup('Other').exists).ok()
  await t.expect(dropdownOption('Estrangelo Edessa (Syriac)').exists).ok()
  await t.expect(dropdownOption('Kaputa (Sinhala)').exists).ok()
})

test('should search and display existing font result', async t => {
  // Get selectors
  const searchBox = Selector('#gfpdf_settings_font__chosen').find('.chosen-search-input')
  const result = Selector('div').find('[class^="active-result group-option highlighted"]')

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(appearanceLink)
  await t.click(selectBoxFont)
  await t.typeText(searchBox, 'Free Sans', {paste: true})

  // Assertions
  await t.expect(result.count).eql(1)
})

test('should display Font Size field', async t => {
  // Get selectors
  const fontSizeInputBox = Selector('#gfpdf_settings\\[font_size\\]')

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(appearanceLink)

  // Assertions
  await t.expect(fieldLabel('Font Size').exists).ok()
  await t.expect(fontSizeInputBox.exists).ok()
  await t.expect(fieldDescription('Set the font size to use in the PDF.').exists).ok()
})

test('should display Font Color field', async t => {
  // Get selectors
  const selectColorButton = Selector('div').find('[class^="button wp-color-result"]')
  const popupPickerBox = Selector('.wp-picker-container')
  const showPopupPickerBox = Selector('.wp-picker-active')

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(appearanceLink)
  await t.click(selectColorButton)

  // Assertions
  await t.expect(fieldLabel('Font Color').exists).ok()
  await t.expect(selectColorButton.exists).ok()
  await t.expect(fieldDescription('Set the font color to use in the PDF.').exists).ok()
  await t.expect(popupPickerBox.exists).ok()
  await t.expect(showPopupPickerBox.exists).ok()
})

test('should display Reverse Text (RTL) field', async t => {
  // Get selectors
  const rtlYes = Selector('#gfpdf_settings\\[rtl\\]\\[Yes\\]')
  const rtlNo = Selector('#gfpdf_settings\\[rtl\\]\\[No\\]')

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(appearanceLink)

  // Assertions
  await t.expect(fieldLabel('Reverse Text (RTL)').exists).ok()
  await t.expect(fieldDescription('Script like Arabic and Hebrew are written right to left.').exists).ok()
  await t.expect(rtlYes.exists).ok()
  await t.expect(rtlNo.exists).ok()
})
