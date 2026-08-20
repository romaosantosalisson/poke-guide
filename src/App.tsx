import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Home } from "./pages/Home";
import { SearchByName } from "./pages/SearchByName";
import { SearchByType } from "./pages/SearchByType";
import { SearchByAbility } from "./pages/SearchByAbility";

export function App() {
  return (
    <HashRouter basename="/poke-guide/">
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search-name" element={<SearchByName />} />
            <Route path="/search-type" element={<SearchByType />} />
            <Route path="/search-ability" element={<SearchByAbility />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
