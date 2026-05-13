// src/routes/AppRoutes.jsx

import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";

import Dashboard from "../pages/Dashboard";
import Workspaces from "../pages/Workspaces";
import History from "../pages/History";
import WorkspaceDetails from "../pages/WorkspaceDetails";
import Schedule from "../pages/Schedule";

import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {

  return (

    <Routes>

      {/* AUTH */}

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      {/* DASHBOARD / WORKSPACE HISTORY */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* CREATE WORKSPACE */}

      <Route
        path="/create-workspace"
        element={
          <ProtectedRoute>
            <Workspaces />
          </ProtectedRoute>
        }
      />

      {/* WORKSPACE DETAILS */}

      <Route
        path="/workspace/:id"
        element={
          <ProtectedRoute>
            <WorkspaceDetails />
          </ProtectedRoute>
        }
      />

      {/* CONTENT HISTORY */}

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />

      <Route
        path="/schedule"
        element={
        <ProtectedRoute>
          <Schedule />
        </ProtectedRoute>
       }
      />

    </Routes>

  );
}

export default AppRoutes;