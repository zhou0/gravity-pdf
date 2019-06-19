import { Selector } from 'testcafe'
import { admin, baseURL } from '../auth'

fixture `PDF Template - Template Settings Test`

// Get Global selectors
const form = Selector('#the-list').find('tr').withText('Test Form')
const entriesLink = Selector('#the-list').find('tr').withText('Test Form').find('span').withText('Entries')
const settingsMenu = Selector('.gf_form_toolbar_settings')
const pdfLink = Selector('.gf_submenu').find('a').withText('PDF')
const addNewPdf = Selector('#add-new-pdf')
const templateLink = Selector('#gfpdf-custom-appearance-nav')

test('should display Field Border Color field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Field Border Color')
  const selectColorButton = Selector('.wp-picker-container').nth(1).find('button').withText('Select Color')
  const fieldDescription = Selector('span').withText('Control the color of the field border.')
  const showPopupPickerBox = Selector('.wp-picker-active')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(templateLink)
  await t.click(selectColorButton)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(selectColorButton.exists).ok()
  await t.expect(fieldDescription.exists).ok()
  await t.expect(showPopupPickerBox.exists).ok()
})

test('should display Show Form Title field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Show Form Title')
  const yes = Selector('#gfpdf_settings\\[show_form_title\\]\\[Yes\\]')
  const no = Selector('#gfpdf_settings\\[show_form_title\\]\\[No\\]')
  const fieldDescription = Selector('span').withText('Display the form title at the beginning of the PDF.')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(templateLink)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(yes.exists).ok()
  await t.expect(no.exists).ok()
  await t.expect(fieldDescription.exists).ok()
})

test('should display Show Page Names field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Show Page Names')
  const yes = Selector('#gfpdf_settings\\[show_page_names\\]\\[Yes\\]')
  const no = Selector('#gfpdf_settings\\[show_page_names\\]\\[No\\]')
  const fieldDescription = Selector('span').withText('Display form page names on the PDF. Requires the use of the Page Break field.')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(templateLink)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(yes.exists).ok()
  await t.expect(no.exists).ok()
  await t.expect(fieldDescription.exists).ok()
})

test('should display Show HTML Fields field', async t => {
  // Get selectors
  const fieldsLabel = Selector('th').withText('Show HTML Fields')
  const yes = Selector('#gfpdf_settings\\[show_html\\]\\[Yes\\]')
  const no = Selector('#gfpdf_settings\\[show_html\\]\\[No\\]')
  const fieldsDescription = Selector('span').withText('Display HTML fields in the PDF.')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(templateLink)

  // Assertions
  await t.expect(fieldsLabel.exists).ok()
  await t.expect(yes.exists).ok()
  await t.expect(no.exists).ok()
  await t.expect(fieldsDescription.exists).ok()
})

test('should display Show Section Break Description field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Show Section Break Description')
  const yes = Selector('#gfpdf_settings\\[show_section_content\\]\\[Yes\\]')
  const no = Selector('#gfpdf_settings\\[show_section_content\\]\\[No\\]')
  const fieldDescription = Selector('span').withText('Display the Section Break field description in the PDF.')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(templateLink)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(yes.exists).ok()
  await t.expect(no.exists).ok()
  await t.expect(fieldDescription.exists).ok()
})

test('should display Enable Conditional Logic field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Enable Conditional Logic')
  const yes = Selector('#gfpdf_settings\\[enable_conditional\\]\\[Yes\\]')
  const no = Selector('#gfpdf_settings\\[enable_conditional\\]\\[No\\]')
  const fieldDescription = Selector('span').withText('When enabled the PDF will adhere to the form field conditional logic.')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(templateLink)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(yes.exists).ok()
  await t.expect(no.exists).ok()
  await t.expect(fieldDescription.exists).ok()
})

test('should display Show Empty Fields field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Show Empty Fields')
  const yes = Selector('#gfpdf_settings\\[show_empty\\]\\[Yes\\]')
  const no = Selector('#gfpdf_settings\\[show_empty\\]\\[No\\]')
  const fieldDescription = Selector('span').withText('Display Empty fields in the PDF.')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(templateLink)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(yes.exists).ok()
  await t.expect(no.exists).ok()
  await t.expect(fieldDescription.exists).ok()
})

test('should display Background Color field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Background Color')
  const selectBackgroundButton = Selector('.wp-picker-container').nth(2).find('button').withText('Select Color')
  const fieldDescription = Selector('span').withText('Set the background color for all pages.')
  const showBackgroundPickerBox = Selector('.wp-picker-active')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(templateLink)
  await t.click(selectBackgroundButton)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(selectBackgroundButton.exists).ok()
  await t.expect(fieldDescription.exists).ok()
  await t.expect(showBackgroundPickerBox.exists).ok()
})

test('should display Background Image field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Background Image')
  const uploadFileButton = Selector('div').find('[class^="gfpdf_settings_upload_button button-secondary"]')
  const fieldDescription = Selector('span').withText('The background image is included on all pages. For optimal results, use an image the same dimensions as the paper size.')
  const popupMediaBox = Selector('#__wp-uploader-id-0').filterVisible()

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(templateLink)
  await t.click(uploadFileButton)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(uploadFileButton.exists).ok()
  await t.expect(fieldDescription.exists).ok()
  await t.expect(popupMediaBox.count).eql(1)
})

test('should display Header field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Header')
  let AddMediaButton = Selector('#insert-media-button')
  let wsiwigEditor = Selector('#wp-gfpdf_settings_header-editor-container')
  const fieldDescription = Selector('span').withText('The header is included at the top of each page. For simple columns try this HTML table snippet.')
  let showMediabox = Selector('#__wp-uploader-id-0').filterVisible()

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(templateLink)
  await t.click(AddMediaButton)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(AddMediaButton.exists).ok()
  await t.expect(wsiwigEditor.exists).ok()
  await t.expect(fieldDescription.exists).ok()
  await t.expect(showMediabox.count).eql(1)
})

test('should display First Page Header field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('First Page Header')
  let toggleCheckbox = Selector('label').withText('Use different header on first page of PDF').find('.gfpdf-input-toggle')
  const fieldDescription = Selector('label').withText('Use different header on first page of PDF?')
  let wsiwigEditor = Selector('#wp-gfpdf_settings_first_header-editor-container').filterVisible()
  let addMediaButton = Selector('button').withAttribute('data-editor', 'gfpdf_settings_first_header')
  let showMediabox = Selector('#__wp-uploader-id-0').filterVisible()

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(templateLink)
  await t.click(toggleCheckbox)
  await t.click(addMediaButton)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(toggleCheckbox.exists).ok()
  await t.expect(fieldDescription.exists).ok()
  await t.expect(wsiwigEditor.count).eql(1)
  await t.expect(addMediaButton.exists).ok()
  await t.expect(showMediabox.count).eql(1)
})

test('should display Footer field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Footer')
  let addMediaButton = Selector('div').find('[class^="button insert-media add_media"]').withText('Add Media')
  const fieldDescription = Selector('span').withText('The footer is included at the bottom of every page. For simple columns try this HTML table snippet.')
  let showMediabox = Selector('#__wp-uploader-id-0').filterVisible()

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(templateLink)
  await t.click(addMediaButton)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(addMediaButton.exists).ok()
  await t.expect(fieldDescription.exists).ok()
  await t.expect(showMediabox.count).eql(1)
})

test('should display First Page Footer field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('First Page Footer')
  let toggleCheckbox = Selector('label').withText('Use different footer on first page of PDF').find('.gfpdf-input-toggle')
  const fieldDescription = Selector('label').withText('Use different footer on first page of PDF?')
  let wsiwigEditor = Selector('#wp-gfpdf_settings_first_footer-editor-container').filterVisible()
  let addMediaButton = Selector('div').find('[class^="button insert-media add_media"]').withText('Add Media')
  let showMediabox = Selector('#__wp-uploader-id-0').filterVisible()

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(templateLink)
  await t.click(toggleCheckbox)
  await t.click(addMediaButton)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(toggleCheckbox.exists).ok()
  await t.expect(fieldDescription.exists).ok()
  await t.expect(wsiwigEditor.count).eql(1)
  await t.expect(showMediabox.count).eql(1)
})
