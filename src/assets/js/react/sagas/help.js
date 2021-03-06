import { takeLatest, call, put } from 'redux-saga/effects'
import {
  updateResult,
  updateError,
  GET_DATA
} from '../actions/help'
import { apiGetSearchResult } from '../api/help'

/**
 * @package     Gravity PDF
 * @copyright   Copyright (c) 2019, Blue Liquid Designs
 * @license     http://opensource.org/licenses/gpl-2.0.php GNU Public License
 * @since       5.2
 */

/*
 This file is part of Gravity PDF.

 Gravity PDF – Copyright (c) 2019, Blue Liquid Designs

 This program is free software; you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation; either version 2 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program; if not, write to the Free Software
 Found
 */

/**
 * Worker Saga getResults - Success and error handling of AJAX call
 *
 * @param action
 *
 * @since 5.2
 */
export function * getResults (action) {
  try {
    const result = yield call(apiGetSearchResult, action.payload)
    yield put(updateResult(result.body))
  } catch (error) {
    yield put(updateError(GFPDF.getSearchResultError))
  }
}

/**
 * Watcher Saga watchGetResults for getResults()
 *
 * @since 5.2
 */
export function * watchGetResults () {
  yield takeLatest(GET_DATA, getResults)
}
