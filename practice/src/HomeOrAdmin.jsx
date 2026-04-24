import React from 'react'
import { useAuth } from './context/AuthContext'
import Home from './Home'
import AdminPanel from './AdminPanel'

export default function HomeOrAdmin() {
  const { currentUser } = useAuth()

  if (currentUser?.role === 'admin') {
    return <AdminPanel />
  }

  return <Home />
}