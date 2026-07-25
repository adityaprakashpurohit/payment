import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layouts
import { AuthLayout } from "./layouts/AuthLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { ClientLayout } from "./layouts/ClientLayout";

// Auth Pages
import { Login } from "./pages/auth/Login";

// Admin Pages
import { AdminDashboard } from "./pages/admin/Dashboard";
import { Clients } from "./pages/admin/Clients";
import { AddClient } from "./pages/admin/AddClient";
import { AssignPayment } from "./pages/admin/AssignPayment";
import { Payments } from "./pages/admin/Payments";

// Client Pages
import { ClientDashboard } from "./pages/client/Dashboard";
import { PaymentHistory } from "./pages/client/PaymentHistory";
import { Invoice } from "./pages/client/Invoice";

// Common
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'bg-card border-2 border-accent text-accent font-mono uppercase rounded-none cyber-chamfer-sm [box-shadow:var(--box-shadow-neon-sm)]',
          style: {
            borderRadius: '0px',
            padding: '16px',
            color: 'var(--color-accent)',
            backgroundColor: 'var(--color-card)',
          },
        }}
      />
      <Routes>
        {/* Redirect Root to Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="add-client" element={<AddClient />} />
          <Route path="assign-payment" element={<AssignPayment />} />
          <Route path="payments" element={<Payments />} />
        </Route>

        {/* Client Routes */}
        <Route path="/client" element={<ClientLayout />}>
          <Route path="dashboard" element={<ClientDashboard />} />
          <Route path="payment-history" element={<PaymentHistory />} />
          <Route path="invoice" element={<Invoice />} />
        </Route>

        {/* Catch All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
