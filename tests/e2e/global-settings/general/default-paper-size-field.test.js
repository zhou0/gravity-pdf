import { Selector } from 'testcafe'
import { admin, baseURL } from '../../auth'

fixture `General Tab -  Default Paper Size Field Test`

// Get Global selectors
const selectBox = Selector('div').find('[class^="chosen-container chosen-container-single"][id="gfpdf_settings_default_pdf_size__chosen"]')

test("should display 'Default Paper Size' field", async t => {
  // Get selectors
  const fieldLabel = Selector('th').withText('Default Paper Size')
  const fieldDescription = Selector('label').withText('Set the default paper size used when generating PDFs.')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=general#/`)

  // Assertions
  await t.expect(fieldLabel.exists).ok()
  await t.expect(selectBox.exists).ok()
  await t.expect(fieldDescription.exists).ok()
})

test('should search and display existing result', async t => {
  // Get selectors
  const searchBox = Selector('#gfpdf_settings_default_pdf_size__chosen').find('.chosen-search-input')
  const result = Selector('div').find('[class^="active-result group-option highlighted"]')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=general#/`)
  await t.click(selectBox)
  await t.typeText(searchBox, 'letter', { paste: true })

  // Assertions
  await t.expect(result.count).eql(1)
})

test('should display a dropdown of paper sizes option', async t => {
  // Get selectors
  const dropDownList = Selector('.chosen-results')

  const commonSizesGroup = Selector('optgroup').withAttribute('label', 'Common Sizes')
  const commonSizesFirstOption = Selector('option').withText('A4 (210 x 297mm)')
  const commonSizedSecondOption = Selector('option').withText('Letter (8.5 x 11in)')

  const aSizesGroup = Selector('optgroup').withAttribute('label', '"A" Sizes')
  const aSizesFirstOption = Selector('option').withText('A0 (841 x 1189mm)')
  const aSizesSecondOption = Selector('option').withText('A1 (594 x 841mm)')

  const bSizeGroup = Selector('optgroup').withAttribute('label', '"B" Sizes')
  const bSizeFirstOption = Selector('option').withText('B0 (1414 x 1000mm)')
  const bSizeSecondOption = Selector('option').withText('B1 (1000 x 707mm)')

  const cSizeGroup = Selector('optgroup').withAttribute('label', '"C" Sizes')
  const cSizeFirstOption = Selector('option').withText('C0 (1297 x 917mm)')
  const cSizeSecondOption = Selector('option').withText('C1 (917 x 648mm)')

  const raSRAGroup = Selector('optgroup').withAttribute('label', '"RA" and "SRA" Sizes')
  const raSRAfirstOption = Selector('option').withText('RA0 (860 x 1220mm)')
  const raSRAsecondOption = Selector('option').withText('RA1 (610 x 860mm)')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=general#/`)

  // Assertions
  await t.expect(dropDownList.exists).ok()
  await t.expect(commonSizesGroup.exists).ok()
  await t.expect(commonSizesFirstOption.exists).ok()
  await t.expect(commonSizedSecondOption.exists).ok()
  await t.expect(aSizesGroup.exists).ok()
  await t.expect(aSizesFirstOption.exists).ok()
  await t.expect(aSizesSecondOption.exists).ok()
  await t.expect(bSizeGroup.exists).ok()
  await t.expect(bSizeFirstOption.exists).ok()
  await t.expect(bSizeSecondOption.exists).ok()
  await t.expect(cSizeGroup.exists).ok()
  await t.expect(cSizeFirstOption.exists).ok()
  await t.expect(cSizeSecondOption.exists).ok()
  await t.expect(raSRAGroup.exists).ok()
  await t.expect(raSRAfirstOption.exists).ok()
  await t.expect(raSRAsecondOption.exists).ok()
})
