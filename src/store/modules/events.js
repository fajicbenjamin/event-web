const state = {
    events: []
}

const getters = {
    getEvents: state => state.events
}

const mutations = {
    addEvents (state, elem) {
        state.events.push(elem)
    },
    sortDistributors (state) {
        let lang = localStorage.getItem('vue-lang')

        state.distributors.sort(function (a, b) {
            if (a.label[lang] < b.label[lang]) return -1
            if (a.label[lang] > b.label[lang]) return 1
            return 0
        })
    }
}

const actions = {
    // async fetchDistributors ({ commit }) {
    //     api.fetchDistributors().then(function (data) {
    //         data.data.data.forEach((elem) => {
    //             commit('addDistributors',
    //                 {
    //                     value: elem.id,
    //                     label: elem.display_name
    //                 }
    //             )
    //         })
    //         commit('sortDistributors')
    //     })
    // }
}

export default {
    state,
    getters,
    mutations,
    actions
}
