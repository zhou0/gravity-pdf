import { Selector } from 'testcafe'
import { admin, baseURL } from '../../auth'

fixture `General Tab - Installation Status Field Test`

test('should display Installation Status Field', async t => {
  // Get selectors
  const headingText = Selector('span').withText('Installation Status')
  const pdfSystemStatusTable = Selector('#pdf-system-status')

  const installationFirstLabel = Selector('th').withText('WP Memory Available')
  const installationFirstLabelResult = Selector('#pdf-system-status').find('td').nth(0)

  const installationSecondLabel = Selector('th').withText('WordPress Version')
  const installationSecondLabelResult = Selector('#pdf-system-status').find('td').nth(1)

  const installationThirdLabel = Selector('th').withText('Gravity Forms Version')
  const installationThirdLabelResult = Selector('#pdf-system-status').find('td').nth(2)

  const installationFourthLabel = Selector('th').withText('PHP Version')
  const installationFourthLabelResult = Selector('#pdf-system-status').find('td').nth(3)

  const installationFifthLabel = Selector('th').withText('Direct PDF Protection')
  const installationFifthLabelResult = Selector('#pdf-system-status').find('td').nth(4)

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=general#/`)

  // Assertions
  await t.expect(headingText.exists).ok()
  await t.expect(pdfSystemStatusTable.exists).ok()
  await t.expect(installationFirstLabel.exists).ok()
  await t.expect(installationFirstLabelResult.exists).ok()
  await t.expect(installationSecondLabel.exists).ok()
  await t.expect(installationSecondLabelResult.exists).ok()
  await t.expect(installationThirdLabel.exists).ok()
  await t.expect(installationThirdLabelResult.exists).ok()
  await t.expect(installationFourthLabel.exists).ok()
  await t.expect(installationFourthLabelResult.exists).ok()
  await t.expect(installationFifthLabel.exists).ok()
  await t.expect(installationFifthLabelResult.exists).ok()
})
