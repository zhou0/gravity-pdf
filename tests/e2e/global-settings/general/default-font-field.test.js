import { Selector } from 'testcafe'
import { admin, baseURL } from '../../auth'

fixture `General Tab - Default Font Field Test`

// Get Global selectors
const selectBox = Selector('div').find('[class^="chosen-container chosen-container-single"][id="gfpdf_settings_default_font__chosen"]')

test('should display Default Font Field', async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Default Font')
  const fieldDescription = Selector('label').withText('Set the default font type used in PDFs. Choose an existing font or install your own.')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=general#/`)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(fieldDescription.exists).ok()
  await t.expect(selectBox.exists).ok()
})

test('should search and display existing result', async t => {
  // Get selectors
  const searchBox = Selector('#gfpdf_settings_default_font__chosen').find('.chosen-search-input')
  const result = Selector('div').find('[class^="active-result group-option highlighted"]')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=general#/`)
  await t.click(selectBox)
  await t.typeText(searchBox, 'Free Sans', { paste: true })

  // Assertions
  await t.expect(result.count).eql(1)
})

test('should display a dropdown of Default Fonts', async t => {
  // Get selectors
  const dropDownList = Selector('.chosen-results')

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
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=general#/`)
  await t.click(selectBox)

  // Assertions
  await t.expect(dropDownList.exists).ok()
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
