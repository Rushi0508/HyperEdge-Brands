import Navbar from "../components/Navbar"

function layout({children}: {children:React.ReactNode}) {
  return (
    <>
        <Navbar/>
        {children}
    </>
  )
}

export default layout