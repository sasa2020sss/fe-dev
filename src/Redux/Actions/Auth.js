import axios from 'axios'
import config from '../../utils/config'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token_admin')}`

export const loginAdmin = (data, callback) => async dispatch => {
  try {
    const query = `auth/login`
    const res = await axios.post(config.APP_BACKEND.concat(query), data)
    console.log('ini data', res)
    localStorage.setItem('token_admin', res.data.token)
    callback(true)
    dispatch({
      type: 'LOGIN_ADMIN',
      payload: res.data.token,
    })
  } catch (error) {
    console.log(error)
  }
}

export const logout = () => {
  localStorage.removeItem('token_admin')
  return {
    type: 'LOGOUT',
  }
}
