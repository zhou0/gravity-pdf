import { Selector, t } from 'testcafe'
import { admin, baseURL } from '../../../auth'

class General {
  constructor () {
    this.advancedOptionsField = Selector('#gfpdf-advanced-options')
    this.fontSelectBox = Selector('div').find('[class^="chosen-container chosen-container-single"][id="gfpdf_settings_default_font__chosen"]')
    this.paperSizeSelectBox = Selector('div').find('[class^="chosen-container chosen-container-single"][id="gfpdf_settings_default_pdf_size__chosen"]')
    this.templateSelectBox = Selector('div').find('[class^="chosen-container chosen-container-single"][id="gfpdf_settings_default_template__chosen"]')
    this.templatePopupBox = Selector('div').find('[class^="container theme-wrap"]')
  }

  async navigateSettingsTab (text) {
    await t
      .useRole(admin)
      .navigateTo(`${baseURL}/wp-admin/admin.php?page=${text}`)
  }
}

export default General
