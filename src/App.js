
import './App.css';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase/firebase.init';
import { useState } from 'react';


const auth = getAuth(app);
function App() {
  const [user, setUser] = useState({})
  const googleProvider = new GoogleAuthProvider();
  const githudPrivider = new GithubAuthProvider();

  const handleGoogle = () =>{
    signInWithPopup(auth, googleProvider)
    .then(result => {
      const user = result.user;
      setUser(user)
      console.log(user);
    })
    .catch(error => {
      console.log('error', error)
    }) 
  }
  const handleGithub = () =>{
    signInWithPopup(auth, githudPrivider)
    .then(result =>{
      const user = result.user;
      setUser(user)
    })
    .catch(error => {
      console.log('error', error)
    })
  }

  const handleSignOut = () =>{
    signOut(auth)
    .then(() => {
      setUser({})
    })
    .catch(() => {
      setUser({})
    })
  }

  
  return (
    <div className="App">
      {user.uid ?
        <button onClick={handleSignOut}>Sign Out</button> :
    <>
       <button onClick ={handleGoogle}>Sign In google</button>
       <button onClick = {handleGithub}>Sing In GitHub</button>
    </>}
      {user.uid && 
        <div>
      <h2>User Name : {user.displayName}</h2>
      <p>Email : {user.email}</p>
      <img src={user.photoURL} alt="" />
      </div>}
    </div>
  );
}

export default App;
