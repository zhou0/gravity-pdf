import { t } from 'testcafe'
import { baseURL } from '../../auth'

class Link {
  async navigateLink (text) {
    await t
      .navigateTo(`${baseURL}/wp-admin/admin.php?page=${text}`)
  }
}

export default Link
