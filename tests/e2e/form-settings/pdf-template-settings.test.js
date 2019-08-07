import { Selector } from 'testcafe'
import { fieldLabel, fieldDescription, button } from '../page-objects/helpers/field'
import Form from '../page-objects/form-settings/form'

const form = new Form()

fixture`PDF Template - Template Settings Test`

// Get Global selectors
const templateLink = Selector('#gfpdf-custom-appearance-nav')

test('should display Field Border Color field', async t => {
  // Get selectors
  const showPopupPickerBox = Selector('.wp-picker-active')

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(templateLink)
  await t.click(button('Select Color').nth(1))

  // Assertions
  await t.expect(fieldLabel('Field Border Color').exists).ok()
  await t.expect(button('Select Color').nth(1).exists).ok()
  await t.expect(fieldDescription('Control the color of the field border.').exists).ok()
  await t.expect(showPopupPickerBox.exists).ok()
})

test('should display Show Form Title field', async t => {
  // Get selectors
  const yes = Selector('#gfpdf_settings\\[show_form_title\\]\\[Yes\\]')
  const no = Selector('#gfpdf_settings\\[show_form_title\\]\\[No\\]')

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(templateLink)

  // Assertions
  await t.expect(fieldLabel('Show Form Title').exists).ok()
  await t.expect(yes.exists).ok()
  await t.expect(no.exists).ok()
  await t.expect(fieldDescription('Display the form title at the beginning of the PDF.').exists).ok()
})

test('should display Show Page Names field', async t => {
  // Get selectors
  const yes = Selector('#gfpdf_settings\\[show_page_names\\]\\[Yes\\]')
  const no = Selector('#gfpdf_settings\\[show_page_names\\]\\[No\\]')

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(templateLink)

  // Assertions
  await t.expect(fieldLabel('Show Page Names').exists).ok()
  await t.expect(yes.exists).ok()
  await t.expect(no.exists).ok()
  await t.expect(fieldDescription('Display form page names on the PDF. Requires the use of the Page Break field.').exists).ok()
})

test('should display Show HTML Fields field', async t => {
  // Get selectors
  const yes = Selector('#gfpdf_settings\\[show_html\\]\\[Yes\\]')
  const no = Selector('#gfpdf_settings\\[show_html\\]\\[No\\]')

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(templateLink)

  // Assertions
  await t.expect(fieldLabel('Show HTML Fields').exists).ok()
  await t.expect(yes.exists).ok()
  await t.expect(no.exists).ok()
  await t.expect(fieldDescription('Display HTML fields in the PDF.').exists).ok()
})

test('should display Show Section Break Description field', async t => {
  // Get selectors
  const yes = Selector('#gfpdf_settings\\[show_section_content\\]\\[Yes\\]')
  const no = Selector('#gfpdf_settings\\[show_section_content\\]\\[No\\]')

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(templateLink)

  // Assertions
  await t.expect(fieldLabel('Show Section Break Description').exists).ok()
  await t.expect(yes.exists).ok()
  await t.expect(no.exists).ok()
  await t.expect(fieldDescription('Display the Section Break field description in the PDF.').exists).ok()
})

test('should display Enable Conditional Logic field', async t => {
  // Get selectors
  const yes = Selector('#gfpdf_settings\\[enable_conditional\\]\\[Yes\\]')
  const no = Selector('#gfpdf_settings\\[enable_conditional\\]\\[No\\]')

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(templateLink)

  // Assertions
  await t.expect(fieldLabel('Enable Conditional Logic').exists).ok()
  await t.expect(yes.exists).ok()
  await t.expect(no.exists).ok()
  await t.expect(fieldDescription('When enabled the PDF will adhere to the form field conditional logic.').exists).ok()
})

test('should display Show Empty Fields field', async t => {
  // Get selectors
  const yes = Selector('#gfpdf_settings\\[show_empty\\]\\[Yes\\]')
  const no = Selector('#gfpdf_settings\\[show_empty\\]\\[No\\]')

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(templateLink)

  // Assertions
  await t.expect(fieldLabel('Show Empty Fields').exists).ok()
  await t.expect(yes.exists).ok()
  await t.expect(no.exists).ok()
  await t.expect(fieldDescription('Display Empty fields in the PDF.').exists).ok()
})

test('should display Background Color field', async t => {
  // Get selectors
  const showBackgroundPickerBox = Selector('.wp-picker-active')

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(templateLink)
  await t.click(button('Select Color').nth(2))

  // Assertions
  await t.expect(fieldLabel('Background Color').exists).ok()
  await t.expect(button('Select Color').nth(2).exists).ok()
  await t.expect(fieldDescription('Set the background color for all pages.').exists).ok()
  await t.expect(showBackgroundPickerBox.exists).ok()
})

test('should display Background Image field', async t => {
  // Get selectors
  const uploadFileButton = Selector('div').find('[class^="gfpdf_settings_upload_button button-secondary"]')
  const popupMediaBox = Selector('#__wp-uploader-id-0').filterVisible()

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(templateLink)
  await t.click(uploadFileButton)

  // Assertions
  await t.expect(fieldLabel('Background Image').exists).ok()
  await t.expect(uploadFileButton.exists).ok()
  await t.expect(fieldDescription('The background image is included on all pages. For optimal results, use an image the same dimensions as the paper size.').exists).ok()
  await t.expect(popupMediaBox.count).eql(1)
})

test('should display Header field', async t => {
  // Get selectors
  let wsiwigEditor = Selector('#wp-gfpdf_settings_header-editor-container')
  let showMediabox = Selector('#__wp-uploader-id-0').filterVisible()

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(templateLink)
  await t.click(button('Add Media').nth(0))

  // Assertions
  await t.expect(fieldLabel('Header').exists).ok()
  await t.expect(button('Add Media').nth(0).exists).ok()
  await t.expect(wsiwigEditor.exists).ok()
  await t.expect(fieldDescription('The header is included at the top of each page. For simple columns try this HTML table snippet.').exists).ok()
  await t.expect(showMediabox.count).eql(1)
})

test('should display First Page Header field', async t => {
  // Get selectors
  let toggleCheckbox = Selector('label').withText('Use different header on first page of PDF').find('.gfpdf-input-toggle')
  let wsiwigEditor = Selector('#wp-gfpdf_settings_first_header-editor-container').filterVisible()
  let showMediabox = Selector('#__wp-uploader-id-0').filterVisible()

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(templateLink)
  await t.click(toggleCheckbox)
  await t.click(button('Add Media').nth(1))

  // Assertions
  await t.expect(fieldLabel('First Page Header').exists).ok()
  await t.expect(toggleCheckbox.exists).ok()
  await t.expect(fieldDescription('Use different header on first page of PDF?', 'label').exists).ok()
  await t.expect(button('Add Media').nth(1).exists).ok()
  await t.expect(wsiwigEditor.count).eql(1)
  await t.expect(showMediabox.count).eql(1)
})

test('should display Footer field', async t => {
  // Get selectors
  let showMediabox = Selector('#__wp-uploader-id-0').filterVisible()

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(templateLink)
  await t.click(button('Add Media').nth(2))

  // Assertions
  await t.expect(fieldLabel('Footer').exists).ok()
  await t.expect(button('Add Media').nth(2).exists).ok()
  await t.expect(fieldDescription('The footer is included at the bottom of every page. For simple columns try this HTML table snippet.').exists).ok()
  await t.expect(showMediabox.count).eql(1)
})

test('should display First Page Footer field', async t => {
  // Get selectors
  let toggleCheckbox = Selector('label').withText('Use different footer on first page of PDF').find('.gfpdf-input-toggle')
  let wsiwigEditor = Selector('#wp-gfpdf_settings_first_footer-editor-container').filterVisible()
  let showMediabox = Selector('#__wp-uploader-id-0').filterVisible()

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(templateLink)
  await t.click(toggleCheckbox)
  await t.click(button('Add Media').nth(3))

  // Assertions
  await t.expect(fieldLabel('First Page Footer').exists).ok()
  await t.expect(toggleCheckbox.exists).ok()
  await t.expect(fieldDescription('Use different footer on first page of PDF?', 'label').exists).ok()
  await t.expect(button('Add Media').nth(3).exists).ok()
  await t.expect(wsiwigEditor.count).eql(1)
  await t.expect(showMediabox.count).eql(1)
})
