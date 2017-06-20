/**
 * Created by Jakub on 11.6.2017.
 */

const CURRENT_VERSION = '18'

export default () => {
  const persistedVersion = localStorage.getItem('stateVersion')

  if (persistedVersion !== CURRENT_VERSION) {
    console.log(`Invalidating local storage state version ${persistedVersion}. New version: ${CURRENT_VERSION}`)

    localStorage.removeItem('redux')
    localStorage.setItem('stateVersion', CURRENT_VERSION)
  }
}