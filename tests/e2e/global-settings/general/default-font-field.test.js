import { Selector } from 'testcafe'
import { fieldLabel, fieldDescription, dropdownOptionGroup, dropdownOption } from '../../page-objects/helpers/field'
import Form from '../../page-objects/global-settings/form'

const form = new Form()

fixture `General Tab - Default Font Field Test`

// Get Global selectors
const selectBox = Selector('div').find('[class^="chosen-container chosen-container-single"][id="gfpdf_settings_default_font__chosen"]')

test('should display Default Font Field', async t => {
  // Actions
  await form.navigateSettingsTab('gf_settings&subview=PDF&tab=general#')

  // Assertions
  await t
    .expect(fieldLabel('Default Font').exists).ok()
    .expect(fieldDescription('Set the default font type used in PDFs. Choose an existing font or install your own.', 'label').exists).ok()
    .expect(selectBox.exists).ok()
})

test('should search and display existing result', async t => {
  // Get selectors
  const searchBox = Selector('#gfpdf_settings_default_font__chosen').find('.chosen-search-input')
  const result = Selector('div').find('[class^="active-result group-option highlighted"]')

  // Actions
  await form.navigateSettingsTab('gf_settings&subview=PDF&tab=general#')
  await t
    .click(selectBox)
    .typeText(searchBox, 'Free Sans', { paste: true })

  // Assertions
  await t.expect(result.count).eql(1)
})

test('should display a dropdown of Default Fonts', async t => {
  // Get selectors
  const dropDownList = Selector('.chosen-results')

  // Actions
  await form.navigateSettingsTab('gf_settings&subview=PDF&tab=general#')
  await t.click(selectBox)

  // Assertions
  await t
    .expect(dropDownList.exists).ok()
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
