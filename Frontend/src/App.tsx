import Landing from "./Pages/Landing";
import SignUpPage from "./Pages/SignUpPage";
import CoursesPage from "./Pages/CoursesPage";
import "./App.css"
const App = () =>{
  <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

          body, html {
            font-family: 'Poppins', sans-serif;
            overflow-x: hidden;  /* Remove horizontal scrollbar */
          }
        `}
      </style>
  
  return(
    <>
    <Landing/> 
    <SignUpPage/>
    <CoursesPage/>
    </>
  )
}

export default App;