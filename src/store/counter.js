import { defineStore } from '../pinia'

export default defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  actions: {
    plusAsync(num) {
      setTimeout(() => {
        this.count += num
      }, 1000)
    },
  },
})
