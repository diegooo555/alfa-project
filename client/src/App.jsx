import { BrowserRouter, Routes, Route } from "react-router-dom"

import AlfaPage from "./pages/AlfaPage"

import RegisterPage from "./pages/RegisterPage"

import LoginPage from "./pages/LoginPage"

import TasksPage from "./pages/TasksPage"



import ProtectedRoute from "./ProtectedRoute"

import { AuthProvider } from "./context/authContext"

function App() {


  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AlfaPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/tasks' element={<TasksPage />} />
            <Route path='/add-task' element={<h1>New Task</h1>} />
            <Route path='/tasks/:id' element={<h1>Update Task</h1>} />
            <Route path='/profile' element={<h1>Profile</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
