import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      <Header />
      <main className="flex-1 overflow-hidden">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
