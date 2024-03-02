

export default function Navbar() {

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 xl:px-[40px] ">
        <a href="/" className="text-2xl font-bold">Logo</a>
        <div className="ml-auto flex items-center space-x-4 ">

          <a href="/sign-in" className="text-sm font-medium transition-colors hover:text-primary">
            Sign in
          </a>

        </div>
      </div>
    </nav>
  );
}