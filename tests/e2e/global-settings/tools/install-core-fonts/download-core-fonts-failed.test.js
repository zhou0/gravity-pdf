import { Selector, RequestMock } from 'testcafe'
import { admin, baseURL } from '../../../auth'

const mock = RequestMock()
  .onRequestTo(`${baseURL}/wp-admin/admin-ajax.php`)
  .respond({}, 500, { 'access-Control-Allow-Origin': '*' })

fixture `Tools Tab - Download Core Fonts Test`
  .requestHooks(mock)

test('should return download core fonts error/failed', async t => {
  // Get selectors
  const downloadButton = Selector('button').withText('Download Core Fonts')
  const pendingResult = Selector('.gfpdf-core-font-status-pending')
  const downloadFailed = Selector('.gfpdf-core-font-status-error')
  const retryDownload = Selector('a').withText('Retry Failed Downloads?')

  // Actions
  await t.useRole(admin)
  await t.navigateTo(`${baseURL}/wp-admin/admin.php?page=gf_settings&subview=PDF&tab=tools#/`)
  await t.click(downloadButton)

  // Assertions
  await t.expect(pendingResult.exists).ok()
  await t.expect(downloadFailed.exists).ok()
  await t.expect(retryDownload.exists).ok()
})
