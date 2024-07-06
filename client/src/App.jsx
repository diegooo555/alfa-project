import { BrowserRouter, Routes, Route } from "react-router-dom"

import AlfaPage from "./pages/AlfaPage"

import RegisterPage from "./pages/RegisterPage"

import LoginPage from "./pages/LoginPage"

import TasksPage from "./pages/TasksPage"

import {TaskProvider} from "./context/taskContext"


import ProtectedRoute from "./ProtectedRoute"

import { AuthProvider } from "./context/authContext"

function App() {


  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<AlfaPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/tasks' element={<TasksPage />} />
              <Route path='/profile' element={<h1>Profile</h1>} />            
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App
