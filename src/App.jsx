import Router from "./router";
import Layout from "./components/ui/Layout";
import Footer from "./components/ui/Footer";
import Navbar from "./components/ui/Navbar";
import ScrollToTop from "./components/ui/ScrollToTop";

function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Navbar />
      <Router />
      <Footer />
    </Layout>
  );
}

export default App;
