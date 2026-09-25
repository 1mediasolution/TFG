import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import { Home } from '../pages/Home';

// Auth Pages
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { ForgotPassword } from '../pages/auth/ForgotPassword';
import { ResetPassword } from '../pages/auth/ResetPassword';

// Founder Pages
import { FounderDashboard } from '../pages/founder/FounderDashboard';
import { FounderProfile } from '../pages/founder/FounderProfile';
import { MyPortfolio } from '../pages/founder/MyPortfolio';
import { MyArticles } from '../pages/founder/MyArticles';
import { CreateArticle } from '../pages/founder/CreateArticle';
import { Inquiries } from '../pages/founder/Inquiries';

// Directory Pages
import { Directory } from '../pages/directory/Directory';
import { Founders } from '../pages/directory/Founders';
import { Investors } from '../pages/directory/Investors';

// Community Pages
import { Community } from '../pages/community/Community';
import { Announcements } from '../pages/community/Announcements';
import { BusinessNetworking } from '../pages/community/BusinessNetworking';
import { DealsPartnerships } from '../pages/community/DealsPartnerships';
import { Messages } from '../pages/community/Messages';

// Portfolio Pages
import { Portfolio } from '../pages/portfolio/Portfolio';
import { PublicFounderProfile } from '../pages/portfolio/PublicFounderProfile';

// Admin Pages
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { Articles } from '../pages/admin/Articles';
import { Members } from '../pages/admin/Members';
import { Advertisements } from '../pages/admin/Advertisements';
import { Verification } from '../pages/admin/Verification';
import { Moderation } from '../pages/admin/Moderation';

// Route Guards
import { ProtectedRoute } from './ProtectedRoute';
import { AdminRoute } from './AdminRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Home */}
      <Route path="/" element={<Home />} />

      {/* Auth */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />

      {/* Founder Area (Protected) */}
      <Route
        path="/founder/dashboard"
        element={
          <ProtectedRoute>
            <FounderDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/founder/profile"
        element={
          <ProtectedRoute>
            <FounderProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/founder/portfolio"
        element={
          <ProtectedRoute>
            <MyPortfolio />
          </ProtectedRoute>
        }
      />
      <Route
        path="/founder/articles"
        element={
          <ProtectedRoute>
            <MyArticles />
          </ProtectedRoute>
        }
      />
      <Route
        path="/founder/create-article"
        element={
          <ProtectedRoute>
            <CreateArticle />
          </ProtectedRoute>
        }
      />
      <Route
        path="/founder/inquiries"
        element={
          <ProtectedRoute>
            <Inquiries />
          </ProtectedRoute>
        }
      />

      {/* Directory */}
      <Route path="/directory" element={<Directory />} />
      <Route path="/directory/founders" element={<Founders />} />
      <Route path="/directory/investors" element={<Investors />} />

      {/* Community & Deals */}
      <Route path="/community" element={<Community />} />
      <Route path="/community/announcements" element={<Announcements />} />
      <Route path="/community/networking" element={<BusinessNetworking />} />
      <Route path="/community/deals" element={<DealsPartnerships />} />
      <Route path="/community/messages" element={<Messages />} />

      {/* Portfolio & Subdomain Dossiers */}
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/portfolio/:subdomain" element={<PublicFounderProfile />} />

      {/* Admin Syndicate Governance (Admin Protected) */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/articles"
        element={
          <AdminRoute>
            <Articles />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/members"
        element={
          <AdminRoute>
            <Members />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/advertisements"
        element={
          <AdminRoute>
            <Advertisements />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/verification"
        element={
          <AdminRoute>
            <Verification />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/moderation"
        element={
          <AdminRoute>
            <Moderation />
          </AdminRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
