import Link  from "next/link";

export default function Home() {
  return <>
  <header className=" bg-[url('/img/mountain.jpg')]" >
    <div className="content px-8 py-2">
      <nav className="flex items-center justify-between">
        <h2 className="text-gray-200 font-bold text-2xl">Well Being</h2>
        <div className="auth flex items-center">
          <Link className="bg-transparent text-gray-200  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700" href="/auth/login">Sign In</Link>
          <Link className="bg-gray-900 text-gray-200  py-2 px-3 rounded  hover:bg-gray-800 hover:text-gray-100" href="/auth/register">Register</Link>
        </div>
      </nav>
    </div>
    
    
  </header>
  </>
}