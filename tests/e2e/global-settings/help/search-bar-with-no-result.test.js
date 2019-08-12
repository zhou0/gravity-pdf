import { Selector, RequestMock } from 'testcafe'
import Help from '../../page-model/global-settings/help/help'

const run = new Help()

const result = []

const mock = RequestMock()
  .onRequestTo(`https://gravitypdf.com/wp-json/wp/v2/v5_docs/?search=bbbb`)
  .respond(result, 200, { 'access-Control-Allow-Origin': '*' })

fixture`Help Tab - Help Search Bar Test with Result`
  .requestHooks(mock)

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
