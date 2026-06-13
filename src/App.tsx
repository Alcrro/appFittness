import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./shared/context/AuthContext";
import { Layout } from "./shared/components/organisms/layout/Layout";
import { AuthPage } from "./features/auth/pages/Auth";
import { DashboardPage } from "./features/dashboard/pages/Dashboard";
import { WorkoutsPage } from "./features/workouts/pages/Workouts";
import { WorkoutDetailPage } from "./features/workouts/pages/WorkoutDetail";
import { ActiveSessionPage } from "./features/session/pages/ActiveSession";
import { HistoryPage } from "./features/history/pages/History";
import { ProgressPage } from "./features/progress/pages/Progress";
import { ProfilePage } from "./features/profile/pages/Profile";
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
