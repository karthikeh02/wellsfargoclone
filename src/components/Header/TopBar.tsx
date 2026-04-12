export default function TopBar() {
  const linkStyle: React.CSSProperties = {
    fontSize: '0.76470588rem',
    fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
    color: '#fff',
    textDecoration: 'none',
    letterSpacing: 0,
    lineHeight: '1.231',
  };

  return (
    <header
      className="w-full flex items-center relative"
      style={{ backgroundColor: '#D71E28', borderBottom: '4px solid #FFCD41', height: '72px' }}
    >
      <div className="max-w-[1400px] w-full mx-auto px-5 relative h-full flex items-center">
        {/* Logo */}
        <a href="#" className="flex items-center" style={{ margin: '0 0 0 16px' }}>
          <img
            src="https://www17.wellsfargomedia.com/assets/images/rwd/wf_logo_220x23.png"
            alt="Wells Fargo Home Page"
            style={{ height: '23px', width: 'auto', filter: 'brightness(0) invert(1)' }}
          />
        </a>

        {/* Right Nav */}
        <nav className="absolute right-0 top-0 h-full flex items-center pr-5" aria-label="Header Navigation">
          <ul className="flex items-center list-none m-0 p-0">
            <li style={{ margin: '0 24px 0 0', height: '40px', display: 'flex', alignItems: 'center' }}>
              <a href="#" style={linkStyle} className="hover:underline">
                Open an Account
              </a>
            </li>
            <li style={{ margin: '0 24px 0 0', height: '40px', display: 'flex', alignItems: 'center' }}>
              <a href="#" style={linkStyle} className="hover:underline">
                ATMs/Locations
              </a>
            </li>
            <li style={{ margin: '0 24px 0 0', height: '40px', display: 'flex', alignItems: 'center' }}>
              <a href="#" style={linkStyle} className="hover:underline">
                Help
              </a>
            </li>
            <li style={{ margin: '0 24px 0 0', height: '40px', display: 'flex', alignItems: 'center' }}>
              <a href="#" style={linkStyle} className="hover:underline" lang="es">
                Espa&ntilde;ol
              </a>
            </li>
            <li style={{ margin: '0 20px 0 0', height: '50px', width: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <a href="#" aria-label="Search" style={{ color: '#fff', textDecoration: 'none' }}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '18px', height: '18px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </a>
            </li>
            <li>
              <div
                className="flex items-center justify-center rounded-full bg-white"
                style={{ minWidth: '80px', height: '36px' }}
              >
                <a
                  href="#"
                  style={{
                    color: '#3b3331',
                    fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
                    fontWeight: 600,
                    fontSize: '0.88235294rem',
                    lineHeight: '1.267',
                    padding: '0 20px',
                    textDecoration: 'none',
                    textAlign: 'center',
                    borderRadius: '24px',
                  }}
                  className="hover:underline"
                >
                  Sign On
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
