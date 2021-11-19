export const defaultReducer = (state, value) => {
  state.value = value.payload;
}

export const defaultState = {
  value: {
    isLoaded: false,
    data: null
  }
}