import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './layout/AppLayout.jsx'
import AuthLayout from './layout/AuthLayout.jsx'
import {
  LoginPage,
  SignupPage,
  ForgotPasswordPage,
  DashboardPage,
  ProfilePage,
  CreateTripPage,
  MyTripsPage,
  TripDetailsPage,
  TravelCalendarPage,
  HotelBookingPage,
  TransportBookingPage,
  BookingHistoryPage,
  ExpenseTrackerPage,
  BudgetPlannerPage,
  ExpenseAnalyticsPage,
  ExploreDestinationsPage,
  DestinationDetailsPage,
  FavoritePlacesPage,
  TravelChecklistPage,
  NotesJournalPage,
  NotificationsPage,
  SettingsPage,
  NotFoundPage,
} from './pages/Pages.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />

        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="create-trip" element={<CreateTripPage />} />
          <Route path="my-trips" element={<MyTripsPage />} />
          <Route path="trip-details" element={<Navigate replace to="/trip-details/1" />} />
          <Route path="trip-details/:id" element={<TripDetailsPage />} />
          <Route path="travel-calendar" element={<TravelCalendarPage />} />
          <Route path="hotel-booking" element={<HotelBookingPage />} />
          <Route path="transport-booking" element={<TransportBookingPage />} />
          <Route path="booking-history" element={<BookingHistoryPage />} />
          <Route path="expense-tracker" element={<ExpenseTrackerPage />} />
          <Route path="budget-planner" element={<BudgetPlannerPage />} />
          <Route path="expense-analytics" element={<ExpenseAnalyticsPage />} />
          <Route path="explore-destinations" element={<ExploreDestinationsPage />} />
          <Route path="destination-details" element={<Navigate replace to="/destination-details/1" />} />
          <Route path="destination-details/:id" element={<DestinationDetailsPage />} />
          <Route path="favorite-places" element={<FavoritePlacesPage />} />
          <Route path="travel-checklist" element={<TravelChecklistPage />} />
          <Route path="notes-journal" element={<NotesJournalPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
