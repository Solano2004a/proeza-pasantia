import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import { AdminProvider } from "./context/AdminContext";

export default function App() {
  return (
    // <AdminProvider>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main-panel" element={<AdminPanel />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    // </AdminProvider>
  );
}
