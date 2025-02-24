// Routes.js
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import AdminRoute from "../auth/AdminRoute";
import Home from "../pages/Home";
import Team from "../pages/Team";
import Price from "../pages/Price";
import Contact from "../pages/Contact";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Toolkit from "../pages/Toolkit";
import AnswerFQs from "../admin/AnswerFQs";
import ManageBooking from "../admin/ManageBooking";
import Analytics from "../admin/Analytics";
import BookingSystem from "../pages/BookingSystem";
import Availability from "../admin/Availability";
import SelectTime from "../components/SelectTime";
import { useColorModeValue } from "@chakra-ui/react";
import Services from "../components/Services";
import Checkout from "../components/Checkout";
import PaymentSuccess from "../components/PaymentSuccess";

const AppRoutes = ({ user }) => {
  const textColor = useColorModeValue("black", "white");
  const bg = useColorModeValue("white", "black");
  return (
    <Routes>
      <Route path="/" element={<Home bg={bg} />} />
      <Route path="/team" element={<Team bg={bg} />} />
      <Route path="/price" element={<Price bg={bg} />} />
      <Route path="/contact" element={<Contact bg={bg} />} />
      <Route path="/login" element={<Login bg={bg} />} />
      <Route path="/register" element={<Register bg={bg} />} />
      <Route path="/select-time" element={<SelectTime bg={bg} />} />
      <Route path="/services" element={<Services bg={bg} />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/success" element={<PaymentSuccess />} />

      <Route
        path="/toolkit"
        element={
          <ProtectedRoute user={user}>
            <Toolkit bg={bg} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/booking"
        element={
          <ProtectedRoute user={user}>
            <BookingSystem bg={bg} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manage-bookings"
        element={
          <AdminRoute user={user}>
            <ManageBooking bg={bg} />
          </AdminRoute>
        }
      />
      <Route
        path="/enquiries"
        element={
          <AdminRoute user={user}>
            <AnswerFQs bg={bg} />
          </AdminRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <AdminRoute user={user}>
            <Analytics bg={bg} />
          </AdminRoute>
        }
      />
      <Route
        path="/dates"
        element={
          <AdminRoute user={user}>
            <Availability bg={bg} />
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
