import { Selector } from 'testcafe'
import General from '../../../page-model/global-settings/general/general'

const run = new General()

fixture`General Tab - Check Added PDF To Form For Updated Global Settings Test`

test('should check that a new added PDF has the updated global settings set', async t => {
  // Get Selectors

  // Actions
  await run.navigateSettingsTab('gf_settings&subview=PDF&tab=general#')

  // Assertions
})