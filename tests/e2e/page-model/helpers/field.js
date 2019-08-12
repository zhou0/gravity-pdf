import { Selector } from 'testcafe'

export function fieldLabel (text, style = 'th') {
  return Selector(style).withText(text)
}

export function fieldDescription (text, style = 'span') {
  return Selector(style).withText(text)
}

export function dropdownBox (style, id) {
  return Selector('div').find(`[class^="${style}"][id="${id}"]`)
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

export function infoText (text, style = 'td') {
  return Selector(style).withText(text)
}

export function button (text) {
  return Selector('button').withText(text)
}
