function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-theme-aware bg-cover bg-fixed bg-center transition-all duration-300">
      <div className="flex-1">
        {" "}
        {/* This grows to push footer down */}
        {children}
      </div>
    </div>
  );
}
export default Layout;
