import { Selector } from 'testcafe'

class DebugModeShortcode {
  constructor () {
    this.saveButton = Selector('input').withAttribute('value', 'Save Changes')
  }

}

export default DebugModeShortcode
