import { Selector } from 'testcafe'

export function fieldLabel (text, style = 'th') {
  return Selector(style).withText(text)
}

export function fieldDescription (text, style = 'span') {
  return Selector(style).withText(text)
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

export function button (text) {
  return Selector('button').withText(text)
}
