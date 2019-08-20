import { Selector, t } from 'testcafe'
import { admin, baseURL } from '../../auth'
import { button } from './field'

class Page {
  constructor () {
    this.addNewButton = Selector('.wrap').find('a').withText('Add New')
    this.closePopupButton = Selector('button').withAttribute('aria-label', 'Disable tips')
    this.titleField = Selector('.editor-post-title').find('textarea').withAttribute('placeholder', 'Add title')
    this.testPage = Selector('#the-list').find('tr').find('a').withText('Test page')
    this.addBlockIcon = Selector('button').withAttribute('aria-label', 'Add block')
    this.searchBlock = Selector('input').withAttribute('placeholder', 'Search for a block')
    this.shortcodeLink = Selector('button').withAttribute('aria-label', 'Shortcode')
    this.shortcodeTextarea = Selector('textarea').withAttribute('placeholder', 'Write shortcode here…')
    this.pageHeader = Selector('.entry-header').find('h1').withText('Test page')
    this.trashLink = Selector('a').withAttribute('aria-label', 'Move “Test page” to the Trash')
  }

  async navigatePage () {
    await t
      .useRole(admin)
      .navigateTo(`${baseURL}/wp-admin/edit.php?post_type=page`)
  }

  async addNewPage () {
    await this.navigatePage()
    await t
      .click(this.addNewButton)
      .click(this.closePopupButton)
      .typeText(this.titleField, 'Test page', { paste: true })
      .click(button('Schedule…'))
      .click(button('Schedule'))
  }
}

export default Page
