import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import Landing from './pages/Landing'
import Register from './pages/Register'
import Success from './pages/Success'
import Admin from './pages/Admin'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success/:registrationNumber" element={<Success />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  )
}
