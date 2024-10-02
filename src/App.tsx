import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LayoutPage from "./layout/layout";
import NotFound from "./layout/notFound";

const paths = [
  '/home',
  '/about',
  '/contact',
  '/development'
]

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        {paths.map((path) => <Route key={path} path={path} element={<LayoutPage />} />)}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
