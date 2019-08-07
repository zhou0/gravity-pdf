import { Selector, t } from 'testcafe'
import { admin, baseURL } from '../../auth'

class Form {
  constructor () {
  }

  async navigateSettingsTab (text) {
    await t
      .useRole(admin)
      .navigateTo(`${baseURL}/wp-admin/admin.php?page=${text}`)
  }
}

export default Form
