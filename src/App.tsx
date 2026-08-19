import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Home } from "./pages/Home";
import { SearchByName } from "./pages/SearchByName";
import { SearchByType } from "./pages/SearchByType";
import { SearchByAbility } from "./pages/SearchByAbility";

export function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nome" element={<SearchByName />} />
            <Route path="/tipo" element={<SearchByType />} />
            <Route path="/habilidade" element={<SearchByAbility />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
