import { Selector } from 'testcafe'
import Help from '../../page-model/global-settings/help/help'

const run = new Help()

fixture`Help Tab - Help Search Bar Test`

test('should check if the help search bar exist', async t => {
  // Get selectors
  const helpSearchBar = Selector('#search-help-input')

  // Actions
  await run.navigateSettingsTab('gf_settings&subview=PDF&tab=help')

  // Assertions
  await t.expect(helpSearchBar.exists).ok()
})
