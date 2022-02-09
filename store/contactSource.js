const getDefaultState = () => ({
  source: ''
})

export const state = () => getDefaultState()

export const mutations = {
  UPDATE(state, payload) {
    state.source = payload.sourceCaseStudy
    console.log('inside modal')
    console.log(state.source)
  },
}

export const actions = {
  update(context, payload){    
    if(payload){
      context.commit('UPDATE', payload)
    }
  },
}