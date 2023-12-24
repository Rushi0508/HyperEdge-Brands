import getCurrentUser from "../actions/getCurrentUser"
import Navbar from "../components/Navbar"

async function layout({children}: {children:React.ReactNode}) {
  const user = await getCurrentUser();
  return (
    <>
        <Navbar/>
        <div className="max-w-screen-2xl mx-auto px-14">
          {children}
        </div>
    </>
  )
}

export default layout