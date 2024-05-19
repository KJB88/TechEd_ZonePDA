import React from 'react'
import * as Popover from '@radix-ui/react-popover'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

import Header from '@/app/header'
import Footer from '@/app/footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zone PDA Network',
  description:
    'A student blog/forum project themed within GSC Game Worlds S.T.A.L.K.E.R universe.'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <Popover.Root>
      <html lang='en'>
        <body className={inter.className}>
          <div className='bg-skadovsk bg-cover bg-center h-screen'>
            <div className='bg-white/5 h-screen backdrop-blur-sm'>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <Header />
               {/*
              <Popover.Trigger className="text-black">MORE INFO</Popover.Trigger>
              <Popover.Portal>
                <Popover.Content className="text-black">
                  AAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHHH
                  <Popover.Arrow />
                </Popover.Content>
              </Popover.Portal>
  */}
              <main className='fixed bg-pda bg-top bg-contain bg-no-repeat pt-16 pda'>
                <div className='fixed mx-20 object-contain w- h-min flex flex-col gap-2 align-items pda-margin bg-black overflow-y-scroll'>
                  {children}
                </div>
              </main>
              <Footer />
            </div>
          </div>
        </body>
      </html>
     </Popover.Root>
    </ClerkProvider>
  )
}
