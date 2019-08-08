import { Selector, t } from 'testcafe'
import { admin, baseURL } from '../../../auth'

class License {
  constructor () {
    this.licenseInputField = Selector('#gfpdf_settings\\[license_gravity-pdf-core-booster\\]')
    this.saveButton = Selector('input').withAttribute('value', 'Save Changes')
    this.validLicenseKey = '987654321'
    this.invalidLicenseKey = '123456789'
  }

  async navigateSettingsTab (text) {
    await t
      .useRole(admin)
      .navigateTo(`${baseURL}/wp-admin/admin.php?page=${text}`)
      .click(this.licenseInputField)
      .selectText(this.licenseInputField, 32, 0)
      .pressKey('backspace')
  }
}

export default License
