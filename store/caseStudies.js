export const state = () => ({
  caseStudies: [],
  loaded: '0',
})
 
export const mutations = {
  setCaseStudies (state, entries) {
    state.caseStudies = entries
  },
  setLoaded (state, loaded) {
    state.loaded = loaded
  }
}