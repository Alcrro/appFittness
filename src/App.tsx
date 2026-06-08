import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Layout } from "./components/layout/Layout";
import { AuthPage } from "./pages/Auth";
import { DashboardPage } from "./pages/Dashboard";
import { WorkoutsPage } from "./pages/Workouts";
import { WorkoutDetailPage } from "./pages/WorkoutDetail";
import { ActiveSessionPage } from "./pages/ActiveSession";
import { HistoryPage } from "./pages/History";
import { ProgressPage } from "./pages/Progress";
import { ProfilePage } from "./pages/Profile";
import { ReactNode } from "react";

function Spinner() {
	return (
		<div className="min-h-screen bg-gray-950 flex items-center justify-center">
			<div className="text-orange-500 font-black text-2xl animate-pulse">AF</div>
		</div>
	);
}

function PrivateRoute({ children }: { children: ReactNode }) {
	const { user, loading } = useAuth();
	if (loading) return <Spinner />;
	return user ? (
		<>{children}</>
	) : (
		<Navigate
			to="/auth"
			replace
		/>
	);
}

function AppRoutes() {
	const { user, loading } = useAuth();
	if (loading) return <Spinner />;

	return (
		<Routes>
			<Route
				path="/auth"
				element={
					user ? (
						<Navigate
							to="/"
							replace
						/>
					) : (
						<AuthPage />
					)
				}
			/>
			<Route
				element={
					<PrivateRoute>
						<Layout />
					</PrivateRoute>
				}
			>
				<Route
					index
					element={<DashboardPage />}
				/>
				<Route
					path="antrenamente"
					element={<WorkoutsPage />}
				/>
				<Route
					path="antrenamente/:id"
					element={<WorkoutDetailPage />}
				/>
				<Route
					path="istoric"
					element={<HistoryPage />}
				/>
				<Route
					path="progres"
					element={<ProgressPage />}
				/>
				<Route
					path="profil"
					element={<ProfilePage />}
				/>
			</Route>
			<Route
				path="sesiune/:workoutId"
				element={
					<PrivateRoute>
						<ActiveSessionPage />
					</PrivateRoute>
				}
			/>
			<Route
				path="*"
				element={
					<Navigate
						to="/"
						replace
					/>
				}
			/>
		</Routes>
	);
}

export default function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<AppRoutes />
			</AuthProvider>
		</BrowserRouter>
	);
}
