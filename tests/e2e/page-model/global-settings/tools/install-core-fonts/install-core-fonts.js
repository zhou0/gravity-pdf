import { Selector, t } from 'testcafe'
import { button } from '../../../helpers/field'
import { admin, baseURL } from '../../../../auth'

class InsallCoreFonts {
  constructor () {
    this.downloadButton = button('Download Core Fonts')
    this.pendingResult = Selector('.gfpdf-core-font-status-pending')
  }

  async navigateSettingsTab (text) {
    await t
      .useRole(admin)
      .navigateTo(`${baseURL}/wp-admin/admin.php?page=${text}`)
      .click(this.downloadButton)
  }
}

export default InsallCoreFonts
