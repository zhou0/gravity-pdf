import { Selector } from 'testcafe'

class PdfRestriction {
  constructor () {
    this.wpAdminBar = Selector('ul').withAttribute('id', 'wp-admin-bar-top-secondary').withAttribute('class', 'ab-top-secondary ab-top-menu')
    this.logout = Selector('a').withText('Log Out')
    this.errorMessage = Selector('p').withText('You do not have access to view this PDF.')
  }
}

export default PdfRestriction
