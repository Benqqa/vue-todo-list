import { createStore } from 'vuex'

export default createStore({
    state: {
        notes: [],
        history: []
    },
    getters: {
        NOTES(state) {
            return state.notes
        },
        NOTE(state, id) {
            return state.notes[id]
        },
        HISTORY(state) {
            return state.history
        },
    },
    mutations: {
        SET_NOTES_TO_STATE(state, notes) {
            state.notes = notes;
        },
        SET_NOTE_TO_NOTES(state, note) {
            let new_id;
            if (state.notes.length == 0)
                new_id = 0
            else
                new_id = state.notes.slice(-1)[0].id + 1

            if (!note) {
                note = {
                    todos: [],
                    title: 'Новая заметка',
                    id: 0
                }
            }
            note.id = new_id
            console.log(note);
            state.notes.push(note)
        },
        CHANGE_NOTE(state, note) {
            console.log(state.notes)
            state.notes = state.notes.map(el => {
                if (el.id == note.id) {
                    return note
                }
                return el
            })
        },
        REMOVE_NOTE_FROM_NOTES(state, nid) {
            state.notes = state.notes.filter(el => el.id != nid)
        },
        COMPLETE_TODO(state, nid, todoIndex) {
            state.notes.map(el => {
                if (el.id == nid) {
                    return el.todos = el.todos[todoIndex].isDone = true;
                } else {
                    return el
                }
            })
        },
        SET_NOTES_TO_LOCALSTORAGE(state) {
            localStorage.setItem('notesTodos', JSON.stringify(state.notes))
        },
        SET_NOTE_TO_HISTORY(state, note, index) {
            if (!index)
                state.history = state.history.filter((el, i) => i <= index)

            if (JSON.stringify(state.history.slice(-1)[0]) != JSON.stringify(note)) {

                state.history.push(note)
                console.log(state.history);
            }
        }
    },
    actions: {
        GET_NOTES_FROM_LOCALSTORAGE({ commit }) {
            if (localStorage.getItem('notesTodos')) {
                let notesTodos = JSON.parse(localStorage.getItem('notesTodos'))
                commit('SET_NOTES_TO_STATE', notesTodos)
            }
        },
        ADD_NOTE_TO_NOTES({ commit }, note) {
            commit('SET_NOTE_TO_NOTES', note)
            commit('SET_NOTES_TO_LOCALSTORAGE')
        },
        COMPLETE_TODO({ commit }, nid, todoIndex) {
            commit('COMPLETE_TODO', nid, todoIndex)
            commit('SET_NOTES_TO_LOCALSTORAGE')
        },
        CHANGE_NOTE({ commit }, note) {
            commit('CHANGE_NOTE', note)
            commit('SET_NOTES_TO_LOCALSTORAGE')
        },
        REMOVE_NOTE_FROM_NOTES({ commit }, nid) {
            commit('REMOVE_NOTE_FROM_NOTES', nid)
            commit('SET_NOTES_TO_LOCALSTORAGE')
        },
        SET_NOTE_TO_HISTORY({ commit }, note) {
            commit('SET_NOTE_TO_HISTORY', Object.assign({}, note))
        }

    },
    modules: {}
})