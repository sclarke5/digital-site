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
}