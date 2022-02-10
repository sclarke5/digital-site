const getDefaultState = () => ({
  source: ''
})

export const state = () => getDefaultState()

export const mutations = {
  UPDATE(state, payload) {
    state.source = payload.sourceCaseStudy
  },
}

export const actions = {
  update(context, payload){    
    if(payload){
      context.commit('UPDATE', payload)
    }
  },
}