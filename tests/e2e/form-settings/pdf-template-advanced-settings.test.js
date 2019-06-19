import { Selector } from 'testcafe'
import { admin, baseURL } from '../auth'

fixture `PDF Template - Advanced Settings Test`

// Get Global selectors
const form = Selector('#the-list').find('tr').withText('Test Form')
const entriesLink = Selector('#the-list').find('tr').withText('Test Form').find('span').withText('Entries')
const settingsMenu = Selector('.gf_form_toolbar_settings')
const pdfLink = Selector('.gf_submenu').find('a').withText('PDF')
const addNewPdf = Selector('#add-new-pdf')
const advancedLink = Selector('#gfpdf-advanced-nav')

test('should display Format field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Format')
  const firstOption = Selector('#gfpdf_settings\\[format\\]\\[Standard\\]')
  const secondOption = Selector('#gfpdf_settings\\[format\\]\\[PDFA1B\\]')
  const thirdOption = Selector('#gfpdf_settings\\[format\\]\\[PDFX1A\\]')
  const fieldDescription = Selector('span').withText('Generate a PDF in the selected format.')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(advancedLink)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(firstOption.exists).ok()
  await t.expect(secondOption.exists).ok()
  await t.expect(thirdOption.exists).ok()
  await t.expect(fieldDescription.exists).ok()
})

test('should display Enable PDF Security field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Enable PDF Security')
  const yes = Selector('#gfpdf_settings\\[security\\]\\[Yes\\]')
  const no = Selector('#gfpdf_settings\\[security\\]\\[No\\]')
  const fieldDescription = Selector('span').withText('Password protect generated PDFs, or restrict user capabilities.')

  const passwordLabel = Selector('th').withText('Password')
  const passwordInputField = Selector('#gfpdf_settings\\[password\\]')
  const mergeTagDropdown = Selector('.open-list.tooltip-merge-tag[title^="<h6>Merge Tags</h6>Merge tags allow you to dynamic"]')
  const passwordDescription = Selector('span').withText('Password protect the PDF, or leave blank to disable password protection.')

  const privilegesLabel = Selector('th').withText('Privileges')
  const privilegesBox = Selector('#gfpdf_settings_privileges__chosen')
  const privilegesBoxExtended = Selector('div').find('[class^="chosen-container chosen-container-multi chosen-with-drop chosen-container-active"]')
  const privilegesDescription = Selector('span').withText('Restrict end user capabilities by removing privileges.')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(advancedLink)
  await t.click(yes)
  await t.click(privilegesBox)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(yes.exists).ok()
  await t.expect(no.exists).ok()
  await t.expect(fieldDescription.exists).ok()
  await t.expect(passwordLabel.exists).ok()
  await t.expect(passwordInputField.exists).ok()
  await t.expect(mergeTagDropdown.exists).ok()
  await t.expect(passwordDescription.exists).ok()
  await t.expect(privilegesLabel.exists).ok()
  await t.expect(privilegesDescription.exists).ok()
  await t.expect(privilegesBox.exists).ok()
  await t.expect(privilegesBoxExtended.exists).ok()
})

test('should display Image DPI field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Image DPI')
  const fieldInputBox = Selector('#gfpdf_settings\\[image_dpi\\]')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(advancedLink)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(fieldInputBox.exists).ok()
})

test('should display Always Save PDF field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Always Save PDF')
  const yes = Selector('#gfpdf_settings\\[save\\]\\[Yes\\]')
  const no = Selector('#gfpdf_settings\\[save\\]\\[No\\]')
  const fieldDescription = Selector('span').withText('Force a PDF to be saved to disk when a new entry is created.')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(advancedLink)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(yes.exists).ok()
  await t.expect(no.exists).ok()
  await t.expect(fieldDescription.exists).ok()
})

test('should display Enable Public Access field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Enable Public Access')
  const yes = Selector('#gfpdf_settings\\[public_access\\]\\[Yes\\]')
  const no = Selector('#gfpdf_settings\\[public_access\\]\\[No\\]')
  const fieldDescription = Selector('span').withText('Disable all security protocols and allow anyone to access the PDFs.')

  const restrictOwnerFieldLabel = Selector('th').withText('Restrict Owner').filterHidden()
  const yesOption = Selector('#gfpdf_settings\\[restrict_owner\\]\\[Yes\\]').filterHidden()
  const noOption = Selector('#gfpdf_settings\\[restrict_owner\\]\\[No\\]').filterHidden()
  const restrictOwnerFieldDescription = Selector('span').withText('When enabled, the original entry owner will NOT be able to view the PDFs.').filterHidden()

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(advancedLink)
  await t.click(yes)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(yes.exists).ok()
  await t.expect(no.exists).ok()
  await t.expect(fieldDescription.exists).ok()
  await t.expect(restrictOwnerFieldLabel.count).eql(1)
  await t.expect(yesOption.count).eql(1)
  await t.expect(noOption.count).eql(1)
  await t.expect(restrictOwnerFieldDescription.count).eql(1)
})

test('should display Restrict Owner field', async t => {
  // Get selectors
  const restrictOwnerFieldLabel = Selector('th').withText('Restrict Owner')
  const yes = Selector('#gfpdf_settings\\[restrict_owner\\]\\[Yes\\]')
  const no = Selector('#gfpdf_settings\\[restrict_owner\\]\\[No\\]')
  const restrictOwnerFieldDescription = Selector('span').withText('When enabled, the original entry owner will NOT be able to view the PDFs.')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(advancedLink)

  // Assertions
  await t.expect(restrictOwnerFieldLabel.exists).ok()
  await t.expect(yes.exists).ok()
  await t.expect(no.exists).ok()
  await t.expect(restrictOwnerFieldDescription.exists).ok()
})
