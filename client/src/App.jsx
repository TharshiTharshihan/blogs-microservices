import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
      <Router>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog/:id" element={<BlogDetail />} />

          {/* PROTECTED ROUTES — Require authentication */}
          <Route path="/my-blogs" element={
            <PrivateRoute><MyBlogs /></PrivateRoute>
          } />
          <Route path="/create" element={
            <PrivateRoute><BlogForm /></PrivateRoute>
          } />
          <Route path="/edit/:id" element={
            <PrivateRoute><BlogForm /></PrivateRoute>
          } />
        </Routes>
      </Router>
            </BrowserRouter>

    </>
  )
}

export default App
