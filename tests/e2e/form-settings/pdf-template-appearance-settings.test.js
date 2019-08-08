import { Selector } from 'testcafe'
import {
  fieldLabel,
  fieldDescription,
  dropdownOption,
  dropdownOptionGroup,
  listItem
} from '../page-model/helpers/field'
import FormSettings from '../page-model/form-settings/form-settings'

const run = new FormSettings()

fixture`PDF Template - Appearance Settings Test`

test('should display Paper Size field', async t => {
  // Actions
  await run.navigateSettingsTab('gf_edit_forms')
  await t.click(run.appearanceLink)

  // Assertions
  await t
    .expect(fieldLabel('Paper Size').exists).ok()
    .expect(run.selectBoxPaperSize.exists).ok()
    .expect(fieldDescription('Set the paper size used when generating PDFs.').exists).ok()
})

test('should display a dropdown of paper sizes option', async t => {
  // Get selectors
  const dropDownList = Selector('.chosen-results')

  // Actions
  await run.navigateSettingsTab('gf_edit_forms')
  await t.click(run.appearanceLink)

  // Assertions
  await t.expect(dropDownList.exists).ok()

  await t
    .expect(dropdownOptionGroup('Common Sizes').exists).ok()
    .expect(dropdownOption('A4 (210 x 297mm)').exists).ok()
    .expect(dropdownOption('Letter (8.5 x 11in)').exists).ok()

    .expect(dropdownOptionGroup('"A" Sizes').exists).ok()
    .expect(dropdownOption('A0 (841 x 1189mm)').exists).ok()
    .expect(dropdownOption('A1 (594 x 841mm)').exists).ok()

    .expect(dropdownOptionGroup('"B" Sizes').exists).ok()
    .expect(dropdownOption('B0 (1414 x 1000mm)').exists).ok()
    .expect(dropdownOption('B1 (1000 x 707mm)').exists).ok()

    .expect(dropdownOptionGroup('"C" Sizes').exists).ok()
    .expect(dropdownOption('C0 (1297 x 917mm)').exists).ok()
    .expect(dropdownOption('C1 (917 x 648mm)').exists).ok()

    .expect(dropdownOptionGroup('"RA" and "SRA" Sizes').exists).ok()
    .expect(dropdownOption('RA0 (860 x 1220mm)').exists).ok()
    .expect(dropdownOption('RA1 (610 x 860mm)').exists).ok()
})

test('should search and display existing paper size result', async t => {
  // Get selectors
  const searchBox = Selector('#gfpdf_settings_pdf_size__chosen').find('.chosen-search-input')
  const result = Selector('div').find('[class^="active-result group-option highlighted"]')

  // Actions
  await run.navigateSettingsTab('gf_edit_forms')
  await t
    .click(run.appearanceLink)
    .click(run.selectBoxPaperSize)
    .typeText(searchBox, 'letter', {paste: true})

  // Assertions
  await t.expect(result.count).eql(1)
})

test('should display Orientation field', async t => {
  // Get selectors
  const orientationDropdownField = Selector('#gfpdf_settings_orientation__chosen')

  // Actions
  await run.navigateSettingsTab('gf_edit_forms')
  await t
    .click(run.appearanceLink)
    .click(orientationDropdownField)

  // Assertions
  await t
    .expect(fieldLabel('Orientation').exists).ok()
    .expect(orientationDropdownField.exists).ok()
    .expect(listItem('Portrait').exists).ok()
    .expect(listItem('Landscape').exists).ok()
})

test('should display Font field', async t => {
  // Get selectors
  const fontDropdownField = Selector('#gfpdf_settings_font__chosen')

  // Actions
  await run.navigateSettingsTab('gf_edit_forms')
  await t.click(run.appearanceLink)

  // Assertions
  await t
    .expect(fieldLabel('Font').exists).ok()
    .expect(fontDropdownField.exists).ok()
    .expect(fieldDescription('Set the font type used in PDFs. Choose an existing font or install your own.').exists).ok()
})

test('should display a dropdown of Fonts', async t => {
  // Actions
  await run.navigateSettingsTab('gf_edit_forms')
  await t
    .click(run.appearanceLink)
    .click(run.selectBoxFont)

  // Assertions
  await t
    .expect(dropdownOptionGroup('Unicode').exists).ok()
    .expect(dropdownOption('Dejavu Sans Condensed').exists).ok()
    .expect(dropdownOption('Dejavu Sans').exists).ok()

    .expect(dropdownOptionGroup('Indic').exists).ok()
    .expect(dropdownOption('Lohit Kannada').exists).ok()
    .expect(dropdownOption('Pothana2000').exists).ok()

    .expect(dropdownOptionGroup('Arabic').exists).ok()
    .expect(dropdownOption('XB Riyaz').exists).ok()
    .expect(dropdownOption('Lateef').exists).ok()

    .expect(dropdownOptionGroup('Chinese, Japanese, Korean').exists).ok()
    .expect(dropdownOption('Sun Ext').exists).ok()
    .expect(dropdownOption('Un Batang (Korean)').exists).ok()

    .expect(dropdownOptionGroup('Other').exists).ok()
    .expect(dropdownOption('Estrangelo Edessa (Syriac)').exists).ok()
    .expect(dropdownOption('Kaputa (Sinhala)').exists).ok()
})

test('should search and display existing font result', async t => {
  // Get selectors
  const searchBox = Selector('#gfpdf_settings_font__chosen').find('.chosen-search-input')
  const result = Selector('div').find('[class^="active-result group-option highlighted"]')

  // Actions
  await run.navigateSettingsTab('gf_edit_forms')
  await t
    .click(run.appearanceLink)
    .click(run.selectBoxFont)
    .typeText(searchBox, 'Free Sans', {paste: true})

  // Assertions
  await t
    .expect(result.count).eql(1)
})

test('should display Font Size field', async t => {
  // Get selectors
  const fontSizeInputBox = Selector('#gfpdf_settings\\[font_size\\]')

  // Actions
  await run.navigateSettingsTab('gf_edit_forms')
  await t.click(run.appearanceLink)

  // Assertions
  await t
    .expect(fieldLabel('Font Size').exists).ok()
    .expect(fontSizeInputBox.exists).ok()
    .expect(fieldDescription('Set the font size to use in the PDF.').exists).ok()
})

test('should display Font Color field', async t => {
  // Get selectors
  const selectColorButton = Selector('div').find('[class^="button wp-color-result"]')
  const popupPickerBox = Selector('.wp-picker-container')
  const showPopupPickerBox = Selector('.wp-picker-active')

  // Actions
  await run.navigateSettingsTab('gf_edit_forms')
  await t
    .click(run.appearanceLink)
    .click(selectColorButton)

  // Assertions
  await t
    .expect(fieldLabel('Font Color').exists).ok()
    .expect(selectColorButton.exists).ok()
    .expect(fieldDescription('Set the font color to use in the PDF.').exists).ok()
    .expect(popupPickerBox.exists).ok()
    .expect(showPopupPickerBox.exists).ok()
})

test('should display Reverse Text (RTL) field', async t => {
  // Get selectors
  const rtlYes = Selector('#gfpdf_settings\\[rtl\\]\\[Yes\\]')
  const rtlNo = Selector('#gfpdf_settings\\[rtl\\]\\[No\\]')

  // Actions
  await run.navigateSettingsTab('gf_edit_forms')
  await t.click(run.appearanceLink)

  // Assertions
  await t
    .expect(fieldLabel('Reverse Text (RTL)').exists).ok()
    .expect(fieldDescription('Script like Arabic and Hebrew are written right to left.').exists).ok()
    .expect(rtlYes.exists).ok()
    .expect(rtlNo.exists).ok()
})
