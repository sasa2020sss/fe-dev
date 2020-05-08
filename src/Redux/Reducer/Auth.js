const initialState = {
  auth: {},
  isLogin: false,
  isLoading: false,
}

const loginReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'LOGIN_ADMIN': {
      return {
        ...state,
        isLoading: true,
        isLogin: true,
        auth: action.payload,
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        isLogin: false,
        isLoading: true,
      }
    }
    default:
      return state
  }
}

export default loginReducer
