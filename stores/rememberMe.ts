export const useRememberMe = defineStore('remember', {
    state: () => ({
      rememberMe: false,
      email:'',
      password: '',
    }),
  
    getters: {
      getRememberMeValue: (state) => state.rememberMe,
      getEmail: (state) => state.email,
      getPassword: (state) => state.password,
    },
  
    actions: {
      setRememberMe(value: boolean) {
        this.rememberMe = value;
      },
  
      setEmail(value: string) {
        this.email = value;
      },

      setPassword(value: string) {
        this.password = value;
      },
    },
  })
  
  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useRememberMe, import.meta.hot))
  }