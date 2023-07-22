import '../css/globals.css'

export const metadata = {
  title: 'Coolor pallete saver',
  description: 'Save your coolor pallete so that they dont disappear',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <h1 className='logo'>Coolor pallete saver</h1>
        {children}</body>
    </html>
  )
}
