

const App = () => {
  return (
    <>
    <h1 className="text-center text-4xl font-bold text-blue-500 mt-20">Hello World</h1>
    <h1 className="text-center text-4xl font-bold text-blue-500 mt-20">{import.meta.env.VITE_APPWRITE_URL}</h1>
    <h1 className="text-center text-4xl font-bold text-blue-500 mt-20">{import.meta.env.VITE_APPWRITE_PROJECT_ID}</h1>
    </>
  )
}

export default App;