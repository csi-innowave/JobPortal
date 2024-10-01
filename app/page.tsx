import Image from "next/image";
import AuthPage from "./login";
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
          <AuthPage />
      </ThemeProvider>
  )
}
