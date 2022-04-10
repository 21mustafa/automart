import Footer from "./components/footer/Footer";
import Navigation from "./components/navigation/Navigation";
import OnlineHelp from "./components/onlinehelp/OnlineHelp";
import { Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import QueryPage from "./query/QueryPage";
import DetailPopup from "./components/detailpopup/DetailPopup";

function App() {
  return (
    <>
      <OnlineHelp/>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/query" element={<QueryPage />} />
      </Routes>
      <Footer/>
      <DetailPopup/>
    </>
  );
}

export default App;
