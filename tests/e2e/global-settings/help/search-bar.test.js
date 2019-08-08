import { Selector } from 'testcafe'
import Help from '../../page-objects/global-settings/help/help'

const run = new Help()

fixture `Help Tab - Help Search Bar Test`

test('should check if the help search bar exist', async t => {
  // Get selectors
  const helpSearchBar = Selector('#search-help-input')

  // Actions
  await run.navigateSettingsTab('gf_settings&subview=PDF&tab=help')

  // Assertions
  await t.expect(helpSearchBar.exists).ok()
})

test('should search and display existing results', async t => {
  // Get selectors
  const resultExist = Selector('.resultExist')

  // Actions
  await run.navigateSettingsTab('gf_settings&subview=PDF&tab=help')
  await t
    .typeText(run.searchBar, 'help', { paste: true })
    .wait(4000)

  // Assertions
  await t.expect(resultExist.exists).ok()
})

test('should search and display a message for no found results', async t => {
  // Get selectors
  const noResult = Selector('.noResult')
  const messageText = Selector('.noResult')

  // Actions
  await run.navigateSettingsTab('gf_settings&subview=PDF&tab=help')
  await t.typeText(run.searchBar, 'bbbb', { paste: true })

  // Assertions
  await t
    .expect(noResult.exists).ok()
    .expect(messageText.innerText).contains('It doesn\'t look like there are any topics related to your issue.')
})
