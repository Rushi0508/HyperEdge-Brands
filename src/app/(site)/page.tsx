import getCurrentUser from '../actions/getCurrentUser'

const Home = async ()=> {
    const user = await getCurrentUser();
  return (
    <>
        <div className="text-2xl font-semibold my-4">Hi, {user?.personName} 👋</div>
    </>
  )
}

export default Home