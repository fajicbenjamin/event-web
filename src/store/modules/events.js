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
    async fetchEvents ({ commit }, eventsArray) {
            eventsArray.forEach((elem) => {
                commit('addEvents',
                    {
                        name: elem.name,
                    }
                )
            })
            // commit('sortDistributors')
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
