import { reactive, inject } from 'vue'

export function createPinia() {
  return {
    install(app) {
      const store = reactive({})

      app.provide('setSubStore', (storeName, subStore) => {
        store[storeName] = subStore

        function $patch(options) {
          for (const key in options) {
            // store[storeName][key] = options[key]
            Reflect.set(store[storeName], key, options[key])
          }
        }

        Reflect.set(store[storeName], '$patch', $patch)
      })

      app.provide('piniaStore', store)
    },
  }
}

export function defineStore(storeName, options) {
  const store = reactive({})
  const state = options.state()
  const actions = options.actions

  for (const key in state) {
    store[key] = state[key]
  }

  for (const method in actions) {
    store[method] = actions[method].bind(store)
  }

  return function () {
    const piniaStore = inject('piniaStore')
    if (!piniaStore[storeName]) {
      const setSubStore = inject('setSubStore')
      setSubStore(storeName, store)
    }

    return piniaStore[storeName]
  }
}
