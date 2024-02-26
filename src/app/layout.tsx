import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import ToastContext from './context/ToastContext'
import AuthContext from './context/Authcontext'

const poppins = Poppins({ subsets: ['latin'], weight: "400", display: "swap" })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthContext>
          <ToastContext/>
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
