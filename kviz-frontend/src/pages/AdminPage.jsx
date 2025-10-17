// src/pages/AdminPage.jsx
import React from "react";
import AdminDashboard from "../components/admin/AdminDashboard.jsx"; // default export iz admin foldera

const AdminPage = ({ token, onBack }) => {
  return <AdminDashboard token={token} onBack={onBack} />;
};

export default AdminPage;
