import { Selector } from 'testcafe'

// Field label
export function fieldLabel (text, style = 'th') {
  return Selector(style).withText(text)
}

// Field description
export function fieldDescription (text, style = 'span') {
  return Selector(style).withText(text)
}

// Dropdown box
export function dropdownBox (style, id) {
  return Selector('div').find(`[class^="${style}"][id="${id}"]`)
}

// Dropdown options
export function dropdownOptionGroup (text) {
  return Selector('optgroup').withAttribute('label', text)
}

export function dropdownOption (text) {
  return Selector('option').withText(text)
}

// Item in the list
export function listItem (text) {
  return Selector('li').withText(text)
}

// Radio button options
export function radioItem (id, field, value) {
  return Selector(`#${id}\\[${field}\\]\\[${value}\\]`)
}

// Info text
export function infoText (text, style = 'td') {
  return Selector(style).withText(text)
}

// Button
export function button (text) {
  return Selector('button').withText(text)
}
