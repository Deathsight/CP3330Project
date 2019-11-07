class AuthClass {

    init = (toggleState) => {
        this.toggle = toggleState
    }

    isLoggedIn = () => {
        return localStorage.getItem('token') !== null
    }

    username = () => {
        return localStorage.getItem('username')
    }

    login = (token, username) => {
        localStorage.setItem('token',token)
        localStorage.setItem('username', username)
        this.toggle()
    }

    logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        this.toggle()
    }
}
const Auth = new AuthClass()
export default Auth