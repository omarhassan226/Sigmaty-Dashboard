import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { PackagesProvider } from './contexts/PackagesContext.jsx'
import { TeachersProvider } from './contexts/TeachersContext.jsx'
import { PermissionsProvider } from './contexts/Permissions.jsx'
import { StudentsProvider } from './contexts/StudenContext.jsx'
// import { UserProvider } from './contexts/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <PackagesProvider>
        <TeachersProvider>
          <PermissionsProvider>
            <StudentsProvider>
              {/* <UserProvider> */}
              <App />
              {/* </UserProvider> */}
            </StudentsProvider>
          </PermissionsProvider>
        </TeachersProvider>
      </PackagesProvider>
    </AuthProvider>
  </React.StrictMode>,
)
