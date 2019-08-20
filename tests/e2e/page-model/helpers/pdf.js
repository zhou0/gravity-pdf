import { Selector, t } from 'testcafe'
import { admin, baseURL } from '../../auth'
import { formList, formEntries, addNewPdf } from './field'

class Pdf {
  constructor () {
    this.pdflist = Selector('#gform_tabs').find('a').withText('PDF')
    this.pdfname = Selector('#gfpdf_settings\\[name\\]')
    this.fileName = Selector('#gfpdf_settings\\[filename\\]')
    this.addPdfButton = Selector('div').find('[class^="button-primary"][value="Add PDF"]')
    this.settingsMenu = Selector('.gf_form_toolbar_settings')
    this.pdfLink = Selector('.gf_submenu').find('a').withText('PDF')
    this.template = Selector('.alternate')
    this.deletePDF = Selector('.submitdelete')
    this.confirmDelete = Selector('button').find('[class^="ui-button-text"]').withText('Delete')
  }

  async navigateAddPdf (text) {
    await t
      .useRole(admin)
      .navigateTo(`${baseURL}/wp-admin/admin.php?page=${text}`)
      .click(addNewPdf)
      .typeText(this.pdfname, 'Test PDF Template', { paste: true })
      .typeText(this.fileName, 'testpdftemplate', { paste: true })
      .click(this.addPdfButton)
  }

  async navigatePdfSection (text) {
    await t
      .useRole(admin)
      .navigateTo(`${baseURL}/wp-admin/admin.php?page=${text}`)
  }

  async navigateDeletePdfEntries (text, formName) {
    await t
      .useRole(admin)
      .navigateTo(`${baseURL}/wp-admin/admin.php?page=${text}`)
      .hover(formList(formName))
      .click(formEntries(formName))
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

export default Pdf
