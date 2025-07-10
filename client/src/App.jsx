import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './components/button'
import UserCard from './components/UserCard.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { RouterProvider } from 'react-router'
import { router } from './routes/routes.jsx'

function App() {
  // const [value, setValue] = useState(initialValue)
  const [modifier, setModifier] = useState("primary")

  // useEffect(()=>{
  //   console.log("value set to:", modifier);
  // },[modifier])

  // function primarymodifierHandler(){
  //   setModifier("primary")
  // }

  // function secondarymodifierHandler(){
  //   setModifier("secondary")
  // }

  // <button/> calls the componnent button.jsx 
  return (
    <>
      {/* <Button modifier={modifier} onClick={primarymodifierHandler}/>
      <Button modifier={modifier} onClick={secondarymodifierHandler}/> */}
      {/* <UserCard username={"Prince Pamintuan"} bio={"Computer Science Student"} tweetCount={15}/> */}
      <RouterProvider router={router}/> 
      
    </>
  )
}

export default App
