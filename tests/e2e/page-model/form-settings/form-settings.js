import { Selector, t } from 'testcafe'
import { addNewPdf } from '../helpers/field'

class FormSettings {
  constructor () {
    this.advancedLink = Selector('#gfpdf-advanced-nav')
    this.appearanceLink = Selector('#gfpdf-appearance-nav')
    this.conditionalCheckbox = Selector('div').find('[class^="gfpdf_settings_conditional conditional_logic_listener"]')
    this.templateLink = Selector('#gfpdf-custom-appearance-nav')
  }

  async navigateAdvancedLink () {
    await t
      .click(addNewPdf)
      .click(this.advancedLink)
  }

  async navigateAppearanceLink () {
    await t
      .click(addNewPdf)
      .click(this.appearanceLink)
  }

  async navigateTemplateLink () {
    await t
      .click(addNewPdf)
      .click(this.templateLink)
  }
}

export default FormSettings
