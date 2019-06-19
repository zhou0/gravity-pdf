import { Selector } from 'testcafe'
import { admin, baseURL } from '../auth'

fixture `PDF Template - General Settings Test`

// Get Global selectors
const form = Selector('#the-list').find('tr').withText('Test Form')
const entriesLink = Selector('#the-list').find('tr').withText('Test Form').find('span').withText('Entries')
const settingsMenu = Selector('.gf_form_toolbar_settings')
const pdfLink = Selector('.gf_submenu').find('a').withText('PDF')
const addNewPdf = Selector('#add-new-pdf')
const selectBox = Selector('div').find('[class^="chosen-container chosen-container-single chosen-container-single-nosearch"][id="gfpdf_settings_template__chosen"]')
const advancedButton = Selector('button').withText('Advanced')
const conditionalCheckbox = Selector('div').find('[class^="gfpdf_settings_conditional conditional_logic_listener"]')

test('should display Name field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Name')
  const nameInputField = Selector('#gfpdf_settings\\[name\\]')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(nameInputField.exists).ok()
})

test('should display Template field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Template')
  const fieldDescription = Selector('span').withText('Choose an existing template or purchased more from our template shop. You can also build your own or hire us to create a custom solution.')
  const templatePopupBox = Selector('div').find('[class^="container theme-wrap"]')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(advancedButton)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(selectBox.exists).ok()
  await t.expect(advancedButton.exists).ok()
  await t.expect(fieldDescription.exists).ok()
  await t.expect(templatePopupBox.exists).ok()
})

test('should display Notifications field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Notifications')
  const notificationSelectBox = Selector('div').find('[class^="chosen-container chosen-container-multi"][id="gfpdf_settings_notification__chosen"]')
  const fieldDescription = Selector('span').withText('Automatically attach PDF to the selected notifications.')
  const chosenChoice = Selector('.chosen-choices').find('li').withText('Admin Notification')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.typeText(notificationSelectBox, 'admin', { paste: true })
  await t.pressKey('enter')

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(notificationSelectBox.exists).ok()
  await t.expect(fieldDescription.exists).ok()
  await t.expect(chosenChoice.exists).ok()
})

test('should display Filename field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Filename')
  const fileNameInputField = Selector('#gfpdf_settings\\[filename\\]')
  const fieldDescription = Selector('span').withText('The name used when saving a PDF. Mergetags are allowed.')
  const mergeTagBox = Selector('.open-list.tooltip-merge-tag[title^="<h6>Merge Tags</h6>Merge tags allow you to dynamic"]')
  const mergeTagOptionList = Selector('#gf_merge_tag_list').filterVisible()
  const firstMergeTagOption = Selector('li').withText('User IP Address')
  const secondMergeTagOption = Selector('li').withText('Date (mm/dd/yyyy)')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(mergeTagBox)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(fileNameInputField.exists).ok()
  await t.expect(fieldDescription.exists).ok()
  await t.expect(mergeTagBox.exists).ok()
  await t.expect(mergeTagOptionList.count).eql(1)
  await t.expect(firstMergeTagOption.exists).ok()
  await t.expect(secondMergeTagOption.exists).ok()
})

test('should display Conditional Logic field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Conditional Logic')
  const fieldDescription = Selector('label').withText('Enable conditional logic')
  const conditionalLogicField = Selector('#gfpdf_conditional_logic_container').filterVisible()

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(conditionalCheckbox)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(conditionalCheckbox.exists).ok()
  await t.expect(fieldDescription.exists).ok()
  await t.expect(conditionalLogicField.count).eql(1)
})

test('should toggle additional Conditional Logic field', async t => {
  // Get selectors
  const conditionalLogicField = Selector('#gfpdf_conditional_logic_container').filterHidden()

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_edit_forms`)
  await t.hover(form)
  await t.click(entriesLink)
  await t.hover(settingsMenu)
  await t.click(pdfLink)
  await t.click(addNewPdf)
  await t.click(conditionalCheckbox)
  await t.click(conditionalCheckbox)

  // Assertions
  await t.expect(conditionalLogicField.exists).ok()
})
