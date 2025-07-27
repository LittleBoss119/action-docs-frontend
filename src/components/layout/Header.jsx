const Header = () => {
  return (
    <header className="bg-gray-900 text-white px-6 py-4 shadow">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          {/* Logo atau inisial */}
          <div className="bg-blue-600 text-white font-bold rounded-full w-9 h-9 flex items-center justify-center text-sm">
            AD
          </div>

          <div>
            <h1 className="text-lg sm:text-xl font-semibold leading-tight">
              Action Documentation
            </h1>
            <p className="text-xs text-gray-300">
              Internal API Reference — Telekom Indonesia
            </p>
          </div>
        </div>

        {/* Optional: Tambahan kanan, nanti bisa ditambahkan versi, profile, dll */}
        {/* <div className="mt-3 sm:mt-0">
          <span className="text-sm text-gray-400">v1.0.0</span>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
