import { View, Text } from 'react-native'
import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from "./src/core/theme";
import Navigation from "./src/routes/navigation";
import { Provider as AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <Navigation   />
      </AuthProvider>
    </PaperProvider>
  )
}