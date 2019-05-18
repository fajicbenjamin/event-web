import {api} from '../../main.js'
import axios from 'axios'

const state = {
    token: localStorage.getItem('token')
}

const getters = {
    isLoggedIn: state => !!state.token
}

const mutations = {
    setLoggedIn (state, elem) {
        state.token = elem
    },
}

const actions = {
    login({commit}, user) {
        return new Promise((resolve, reject) => {
            axios({url: api + 'login', data: user, method: 'POST' })
                .then(response => {
                    const token = response.headers.authorization
                    commit('setLoggedIn', token)
                    localStorage.setItem('token', token)
                    axios.defaults.headers.common['Authorization'] = token
                    resolve(response)
                })
                .catch(err => {
                    localStorage.removeItem('token')
                    reject(err)
                })
        })
    },
    logout() {
        return new Promise((resolve) => {
            localStorage.removeItem('token')
            delete this.$http.defaults.headers.common['Authorization']
            resolve()
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
