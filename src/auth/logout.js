import { getAuth, signOut } from 'firebase/auth'
import firebase_app from 'src/configs/firebase.config'

const auth = getAuth(firebase_app)

const logOut = () => {
  try {
    signOut(auth)
  } catch (e) {
    console.log(e)
  }
}

export default logOut
