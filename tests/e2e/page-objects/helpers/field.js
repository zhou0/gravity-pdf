import { Selector } from 'testcafe'

export function fieldLabel (name) {
  return Selector('th').withText(name)
}

export function fieldDescription (text) {
  return Selector('span').withText(text)
}

export function dropdownOptionGroup (text) {
  return Selector('optgroup').withAttribute('label', text)
}

export function dropdownOption (text) {
  return Selector('option').withText(text)
}

export function listItem (text) {
  return Selector('li').withText(text)
}
