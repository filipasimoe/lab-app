import { createStore} from 'vuex'

export default createStore({
    state: {
        authenticated: false,
        isAdmin: false,
        userId: 0,
        targetId: 0
    },
    mutations: {
        SET_AUTH: (state, auth) => state.authenticated = auth,
        SET_ADMIN: (state, admin) => state.isAdmin = admin,
        SET_ID: (state, id) => state.userId = id,
        SET_TARGET: (state, target) => state.targetId = target
    },
    actions: {
        setAuth: ({commit}, auth) => commit('SET_AUTH', auth),
        setAdmin: ({commit}, admin) => commit('SET_ADMIN', admin),
        setId: ({commit}, id) => commit('SET_ID', id),
        setTarget: ({commit}, target) => commit('SET_TARGET', target)
    },
    modules: {}
})