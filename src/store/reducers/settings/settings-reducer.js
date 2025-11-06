import { setTheme, setLanguage } from '@/store/reducers/settings/settings-actions'

const initialState = {
  theme: 'light',
  language: 'en',
}

const _setTheme = (state, action) => ({
  ...state,
  theme: action.payload,
})

const _setLanguage = (state, action) => ({
  ...state,
  language: action.payload,
})

const reducers = {
  [setTheme.type]: _setTheme,
  [setLanguage.type]: _setLanguage,
}

const settingsReducer = (state = initialState, action) =>
  reducers[action.type] ? reducers[action.type](state, action) : state

export default settingsReducer
