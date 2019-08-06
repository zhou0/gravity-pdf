import { Selector } from 'testcafe'
import { fieldLabel, fieldDescription } from '../page-objects/helpers/field'
import Form from '../page-objects/form'

const form = new Form()

fixture `PDF Template - Advanced Settings Test`

// Get Global selectors
const advancedLink = Selector('#gfpdf-advanced-nav')

test('should display Format field', async t => {
  // Get selectors
  const firstOption = Selector('#gfpdf_settings\\[format\\]\\[Standard\\]')
  const secondOption = Selector('#gfpdf_settings\\[format\\]\\[PDFA1B\\]')
  const thirdOption = Selector('#gfpdf_settings\\[format\\]\\[PDFX1A\\]')

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(advancedLink)

  // Assertions
  await t.expect(fieldLabel('Format').exists).ok()
  await t.expect(firstOption.exists).ok()
  await t.expect(secondOption.exists).ok()
  await t.expect(thirdOption.exists).ok()
  await t.expect(fieldDescription('Generate a PDF in the selected format.').exists).ok()
})

test('should display Enable PDF Security field', async t => {
  // Get selectors
  const yes = Selector('#gfpdf_settings\\[security\\]\\[Yes\\]')
  const no = Selector('#gfpdf_settings\\[security\\]\\[No\\]')

  const passwordInputField = Selector('#gfpdf_settings\\[password\\]')
  const mergeTagDropdown = Selector('.open-list.tooltip-merge-tag[title^="<h6>Merge Tags</h6>Merge tags allow you to dynamic"]')

  const privilegesBox = Selector('#gfpdf_settings_privileges__chosen')
  const privilegesBoxExtended = Selector('div').find('[class^="chosen-container chosen-container-multi chosen-with-drop chosen-container-active"]')

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(advancedLink)
  await t.click(yes)
  await t.click(privilegesBox)

  // Assertions
  await t.expect(fieldLabel('Enable PDF Security').exists).ok()
  await t.expect(yes.exists).ok()
  await t.expect(no.exists).ok()
  await t.expect(fieldDescription('Password protect generated PDFs, or restrict user capabilities.').exists).ok()

  await t.expect(fieldLabel('Password').exists).ok()
  await t.expect(passwordInputField.exists).ok()
  await t.expect(mergeTagDropdown.exists).ok()
  await t.expect(fieldDescription('Password protect the PDF, or leave blank to disable password protection.').exists).ok()

  await t.expect(fieldLabel('Privileges').exists).ok()
  await t.expect(fieldDescription('Restrict end user capabilities by removing privileges.').exists).ok()
  await t.expect(privilegesBox.exists).ok()
  await t.expect(privilegesBoxExtended.exists).ok()
})

test('should display Image DPI field', async t => {
  // Get selectors
  const fieldInputBox = Selector('#gfpdf_settings\\[image_dpi\\]')

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(advancedLink)

  // Assertions
  await t.expect(fieldLabel('Image DPI').exists).ok()
  await t.expect(fieldInputBox.exists).ok()
})

test('should display Always Save PDF field', async t => {
  // Get selectors
  const yes = Selector('#gfpdf_settings\\[save\\]\\[Yes\\]')
  const no = Selector('#gfpdf_settings\\[save\\]\\[No\\]')

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(advancedLink)

  // Assertions
  await t.expect(fieldLabel('Always Save PDF').exists).ok()
  await t.expect(yes.exists).ok()
  await t.expect(no.exists).ok()
  await t.expect(fieldDescription('Force a PDF to be saved to disk when a new entry is created.').exists).ok()
})

test('should display Enable Public Access field', async t => {
  // Get selectors
  const yes = Selector('#gfpdf_settings\\[public_access\\]\\[Yes\\]')
  const no = Selector('#gfpdf_settings\\[public_access\\]\\[No\\]')

  const yesOption = Selector('#gfpdf_settings\\[restrict_owner\\]\\[Yes\\]').filterHidden()
  const noOption = Selector('#gfpdf_settings\\[restrict_owner\\]\\[No\\]').filterHidden()

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(advancedLink)
  await t.click(yes)

  // Assertions
  await t.expect(fieldLabel('Enable Public Access').exists).ok()
  await t.expect(yes.exists).ok()
  await t.expect(no.exists).ok()
  await t.expect(fieldDescription('Disable all security protocols and allow anyone to access the PDFs.').exists).ok()

  await t.expect(fieldLabel('Restrict Owner').filterHidden().count).eql(1)
  await t.expect(yesOption.count).eql(1)
  await t.expect(noOption.count).eql(1)
  await t.expect(fieldDescription('When enabled, the original entry owner will NOT be able to view the PDFs.').filterHidden().count).eql(1)
})

test('should display Restrict Owner field', async t => {
  // Get selectors
  const yes = Selector('#gfpdf_settings\\[restrict_owner\\]\\[Yes\\]')
  const no = Selector('#gfpdf_settings\\[restrict_owner\\]\\[No\\]')

  // Actions
  await form.navigateSettingsTab('gf_edit_forms')
  await t.click(advancedLink)

  // Assertions
  await t.expect(fieldLabel('Restrict Owner').exists).ok()
  await t.expect(yes.exists).ok()
  await t.expect(no.exists).ok()
  await t.expect(fieldDescription('When enabled, the original entry owner will NOT be able to view the PDFs.').exists).ok()
})
