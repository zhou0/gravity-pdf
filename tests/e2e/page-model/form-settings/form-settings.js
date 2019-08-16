import { Selector, t } from 'testcafe'
import { admin, baseURL } from '../../auth'

class FormSettings {
  constructor () {
    this.name = Selector('#the-list').find('tr').withText('Sample 1')
    this.entries = Selector('#the-list').find('tr').withText('Sample 1').find('span').withText('Entries')
    this.settingsMenu = Selector('.gf_form_toolbar_settings')
    this.pdfLink = Selector('.gf_submenu').find('a').withText('PDF')
    this.addNewPdf = Selector('#tab_pdf').find('a').withText('Add New')
    this.list = Selector('.gf-locking ').withText('Sample 1')
    this.advancedLink = Selector('#gfpdf-advanced-nav')
    this.appearanceLink = Selector('#gfpdf-appearance-nav')
    this.conditionalCheckbox = Selector('div').find('[class^="gfpdf_settings_conditional conditional_logic_listener"]')
    this.templateLink = Selector('#gfpdf-custom-appearance-nav')
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

export default FormSettings
