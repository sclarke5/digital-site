const getDefaultState = () => ({
  content: {},
  list: [],
  show: false,
})

export const state = () => getDefaultState()

export const mutations = {
  TOGGLE(state) {
    state.show = !state.show
  },
  SYNC(state, payload) {
    state.content = payload.content
    state.list = payload.list
  },
  RESET(state) {
    Object.assign(state, getDefaultState())
  },
  SYNCNEXT(state, payload){
    state.content = payload.target
    state.list = payload.list
    state.show = !state.show
  }
}

export const actions = {
  toggle(context, payload) {
    context.commit('TOGGLE')

    if (!payload) {
      context.commit('RESET')
    }

    if (payload) {
      context.commit('SYNC', payload)
    }
  },
  next(context, payload){
    context.commit('TOGGLE')
    
    if(payload){
      context.commit('SYNCNEXT', payload)
    }
  }
}
