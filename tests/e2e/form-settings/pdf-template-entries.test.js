import { Selector } from 'testcafe'
import { admin, baseURL } from '../auth'

fixture`PDF Template - Entries Test`

// Get Global selectors
const entriesLink = Selector('#the-list').find('tr').withText('Test Form').find('span').withText('Entries')
const settingsMenu = Selector('.gf_form_toolbar_settings')
const pdfTemplate = Selector('.alternate')
const deletePDF = Selector('.submitdelete')
const confirmDelete = Selector('button').find('[class^="ui-button-text"]').withText('Delete')
const pdfLink = Selector('.gf_submenu').find('a').withText('PDF')
const toggleSwitch = Selector('.check-column').find('img')
const entryItem = Selector('td').withAttribute('data-colname', 'Entry Id')
const viewPdfLink = Selector('a').withText('View PDF')
const nameField = Selector('#gfpdf_settings\\[name\\]')
const fileNameField = Selector('#gfpdf_settings\\[filename\\]')
const mainPdfTemplateList = Selector('a').withText('Back to PDF list.')
const formList = Selector('.gf-locking ').withText('Test Form')

test('should successfully add new PDF template into form entries', async t => {
  // Get selectors
  const addNewButton = Selector('#add-new-pdf')
  const addPdfButton = Selector('div').find('[class^="button-primary"][value="Add PDF"]')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(formList)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewButton)
  await t.typeText(nameField, 'Test PDF Template', { paste: true })
  await t.typeText(fileNameField, 'testpdftemplate', { paste: true })
  await t.click(addPdfButton)
  await t.click(mainPdfTemplateList)

  // Assertions
  await t.expect(pdfTemplate.count).eql(1)
})

test('should successfully switch from Active template to Inactive', async t => {
  // Get selectors
  const inActiveTemplate = Selector('div').find('[alt^="Inactive"][title="Inactive"]')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(formList)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(toggleSwitch)

  // Assertions
  await t.expect(inActiveTemplate.exists).ok()
})

test('should double check if the option View PDF link is disabled when template is Inactive', async t => {
  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(formList)
  await t.click(entriesLink)
  await t.hover(entryItem)

  // Assertions
  await t.expect(viewPdfLink.exists).notOk()
})

test('should successfully switch from Inactive template to Active', async t => {
  // Get selectors
  const activeTemplate = Selector('div').find('[alt^="Active"][title="Active"]')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(formList)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(toggleSwitch)

  // Assertions
  await t.expect(activeTemplate.exists).ok()
})

test('should double check if the option View PDF link is enabled when template is Active', async t => {
  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(formList)
  await t.click(entriesLink)
  await t.hover(entryItem)

  // Assertions
  await t.expect(viewPdfLink.exists).ok()
})

test('should successfully edit and update existing template using the Edit link option', async t => {
  // Get selectors
  const editLink = Selector('span').withText('Edit')
  const pdfTemplateList = Selector('#the-list')
  const updatePdfButton = Selector('div').find('[class^="button-primary"][value="Update PDF"]')
  const pdfTemplateDetail = Selector('.alternate').find('td').nth(0)

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(formList)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.hover(pdfTemplateList)
  await t.click(editLink)
  await t.typeText(nameField, 'Test PDF Template Updated', { replace: true })
  await t.typeText(fileNameField, 'testpdftemplateupdated', { replace: true })
  await t.click(updatePdfButton)
  await t.click(mainPdfTemplateList)

  // Assertions
  await t.expect(pdfTemplateDetail.innerText).contains('Test PDF Template Updated')
})

test('should successfully duplicate existing PDF template using the Duplicate link option', async t => {
  // Get selectors
  const pdfOptions = Selector('div').find('[class^="name column-name has-row-actions column-primary"]')
  const duplicateLink = Selector('a').withText('Duplicate')
  const pdfTempalteList = Selector('#the-list').find('tr')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(formList)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.hover(pdfOptions)
  await t.click(duplicateLink)

  // Assertions
  await t.expect(pdfTempalteList.count).eql(2)
})

test('should delete Gravity PDF templates from the list', async t => {
  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(formList)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  let tempalte = await pdfTemplate.count
  if (tempalte > 0) {
    for (let i = 0; i < tempalte; i++) {
      await t.hover(pdfTemplate)
      await t.click(deletePDF)
      await t.click(confirmDelete)
      await t.wait(2000)
    }
  }

  // Assertions
  await t.expect(pdfTemplate.count).eql(0)
})
