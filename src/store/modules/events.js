import {api} from "../../main";
import axios from 'axios'

const state = {
    events: [],
    currentEvent: null,
    promise: null,
}

const getters = {
    getEvents: state => state.events,
    getCurrentEvent: state => state.currentEvent,
    getPromise: state => state.promise
}

const mutations = {
    addEvent (state, elem) {
        state.events.push(elem)
    },
    setCurrentEvent (state, elem) {
        state.currentEvent = elem
    },
    setPromise (state, promise) {
        state.promise = promise
    },
}

const actions = {
    fetchEvents({ commit })  {
        return new Promise((resolve, reject) => {
            axios.get(api + 'events')
                .then((response) => {
                    response.data.forEach(event => {
                        commit('addEvent', event)
                    })
                    resolve()
                })
                .catch((error => {
                    console.log(error.statusText);
                    reject()
                }));
        });
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
