import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import DailyLog from "./pages/DailyLog";
import Update from "./pages/Update";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <nav className="w-full flex items-center justify-between bg-slate-600 px-6 py-4 shadow-md">
          <p className="text-white font-bold text-xl">Meal Tracker</p>

          <div className="flex gap-6">
            <Link
              className="text-white hover:text-gray-100 font-medium transition duration-200 hover:bg-slate-500 px-3 py-1 rounded"
              to="/"
            >
              Home
            </Link>
            <Link
              className="text-white hover:text-gray-100 font-medium transition duration-200 hover:bg-slate-500 px-3 py-1 rounded"
              to="/dailylog"
            >
              Daily Log
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/DailyLog" element={<DailyLog />} />
          <Route path="/:id" element={<Update />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
