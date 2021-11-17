export const defaultReducer = (state, value) => {
  state.value = value.payload;
}

export const defaultState = {
  value: {
    error: null,
    isLoaded: false,
    data: null
  }
}