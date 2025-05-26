import { createContext } from 'react'

// Crea el contexto de autenticación.
// Se inicializa con 'null' porque el valor real será proporcionado por AuthProvider.
const AuthContext = createContext(null)

// Exporta el contexto para que pueda ser importado y usado en otros componentes
// (tanto por el proveedor como por los consumidores).
export { AuthContext }

