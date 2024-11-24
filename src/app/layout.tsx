import '@/app/globals.css';
import { myUserDetailData } from '@/data-access/entities/user/MyUserDetailData';
import { resetToken } from '@/server-actions/auth/resetToken';
import {
  Flowbite,
  MegaMenu,
  ThemeModeScript,
  ThemeProps,
} from 'flowbite-react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const theme = {
  theme: {
    button: {
      color: {
        primary: 'bg-primary hover:bg-secondary text-white',
      },
    },
  },
} satisfies ThemeProps;

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await resetToken({}, new FormData());
  const myUser = await myUserDetailData.findOne();

  return (
    <html lang='en' className='h-full'>
      <head>
        <ThemeModeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <Flowbite theme={theme}>
          <div className='h-full'>
            <MegaMenu className='absolute h-12 w-full px-6 bg-primary text-white'>
              <div className='w-full flex justify-between items-center'>
                <div>
                  <h1>next-sample</h1>
                </div>

                <div className='flex-auto' />

                {myUser && <div>{myUser.name}</div>}
              </div>
            </MegaMenu>
            <div className='h-full pt-12'>{children}</div>
          </div>
        </Flowbite>
      </body>
    </html>
  );
}
