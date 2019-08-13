import { Selector, t } from 'testcafe'
import { admin, baseURL } from '../../../auth'

class General {
  constructor () {
    this.advancedOptionsField = Selector('#gfpdf-advanced-options')
    this.fontSelectBox = Selector('div').find('[class^="chosen-container chosen-container-single"][id="gfpdf_settings_default_font__chosen"]')
    this.paperSizeSelectBox = Selector('div').find('[class^="chosen-container chosen-container-single"][id="gfpdf_settings_default_pdf_size__chosen"]')
    this.templateSelectBox = Selector('div').find('[class^="chosen-container chosen-container-single"][id="gfpdf_settings_default_template__chosen"]')
    this.templatePopupBox = Selector('div').find('[class^="container theme-wrap"]')
    this.viewOption = Selector('div').find('[class^="gfpdf_settings_default_action"][value="View"]')
    this.downlaodOption = Selector('div').find('[class^="gfpdf_settings_default_action"][value="Download"]')
    this.formname = Selector('#the-list').find('tr').withText('Sample 2')
    this.entries = Selector('#the-list').find('tr').withText('Sample 2').find('span').withText('Entries')
    this.settingsMenu = Selector('.gf_form_toolbar_settings')
    this.pdfLink = Selector('.gf_submenu').find('a').withText('PDF')
    this.addNewPdf = Selector('#add-new-pdf')
    this.pdfname = Selector('#gfpdf_settings\\[name\\]')
    this.fileName = Selector('#gfpdf_settings\\[filename\\]')
    this.addPdfButton = Selector('div').find('[class^="button-primary"][value="Add PDF"]')
    this.list = Selector('.gf-locking ').withText('Sample 2')
    this.template = Selector('.alternate')
    this.deletePDF = Selector('.submitdelete')
    this.confirmDelete = Selector('button').find('[class^="ui-button-text"]').withText('Delete')
    this.templateList = Selector('#the-list')
    this.editLink = Selector('span').withText('Edit')
    this.appearanceLink = Selector('#gfpdf-appearance-nav')
    this.activeZadaniDetailsLink = Selector('.active.theme[data-slug="zadani"]').find('span').withText('Template Details')
    this.zadaniDetailsLink = Selector('.theme[data-slug="zadani"]').find('span').withText('Template Details')
    this.celluloseDetailsLink = Selector('.theme[data-slug="gpdf-cellulose"]').find('span').withText('Template Details')
    this.templateSelectButton = Selector('a').withText('Select')
    this.paperSizeField = Selector('#gfpdf_settings_default_pdf_size__chosen')
    this.fontField = Selector('#gfpdf_settings_default_font__chosen')
    this.fontSize = Selector('#gfpdf_settings\\[default_font_size\\]')
    this.successUpdateMessage = Selector('p').withText('Settings updated.')
    this.addNewTemplate = Selector('input').withAttribute('type', 'file')
    this.saveButton = Selector('div').find('[class^="button button-primary"][value="Save Changes"]')
  }

  async navigateSettingsTab (text) {
    await t
      .useRole(admin)
      .navigateTo(`${baseURL}/wp-admin/admin.php?page=${text}`)
  }

  async navigateAddPdf (text) {
    await t
      .useRole(admin)
      .navigateTo(`${baseURL}/wp-admin/admin.php?page=${text}`)
      .hover(this.formname)
      .click(this.entries)
      .hover(this.settingsMenu)
      .click(this.pdfLink)
      .click(this.addNewPdf)
      .typeText(this.pdfname, 'Test PDF Template', { paste: true })
      .typeText(this.fileName, 'testpdftemplate', { paste: true })
      .click(this.addPdfButton)
      .navigateTo(`${baseURL}/wp-admin/admin.php?page=${text}`)
      .hover(this.formname)
      .click(this.entries)
  }

  async navigateDeletePdfEntries (text) {
    await t
      .useRole(admin)
      .navigateTo(`${baseURL}/wp-admin/admin.php?page=${text}`)
      .hover(this.list)
      .click(this.entries)
      .hover(this.settingsMenu)
      .click(this.pdfLink)
    let tempalte = await this.template.count
    if (tempalte > 0) {
      for (let i = 0; i < tempalte; i++) {
        await t
          .hover(this.template)
          .click(this.deletePDF)
          .click(this.confirmDelete)
          .wait(2000)
      }
    }
  }
}

export default General
