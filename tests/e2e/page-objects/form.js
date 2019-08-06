import { Selector, t } from 'testcafe'
import { admin, baseURL } from '../auth'

class Form {
  constructor () {
    this.name = Selector('#the-list').find('tr').withText('Sample 1')
    this.entries = Selector('#the-list').find('tr').withText('Sample 1').find('span').withText('Entries')
    this.settingsMenu = Selector('.gf_form_toolbar_settings')
    this.pdfLink = Selector('.gf_submenu').find('a').withText('PDF')
    this.addNewPdf = Selector('#add-new-pdf')
    this.list = Selector('.gf-locking ').withText('Sample 1')
  }

  async navigateSettingsTab (text) {
    await t
      .useRole(admin)
      .navigateTo(`${baseURL}/wp-admin/admin.php?page=${text}`)
      .hover(this.name)
      .click(this.entries)
      .hover(this.settingsMenu)
      .click(this.pdfLink)
      .click(this.addNewPdf)
  }
}

export default Form
