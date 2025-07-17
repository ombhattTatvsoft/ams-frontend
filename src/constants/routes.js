export const PUBLIC_ROUTES = {
  HOME: "/",
  LOGIN: "/auth/login",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password/:resetcode",
};

export const PRIVATE_ROUTES = {
  DASHBOARD: "/dashboard",
  PROFILE: "/dashboard/profile",
  CHANGE_PASSWORD: "/dashboard/change-password",
  USERS: "/user",
  ATTENDANCE_SELF: "/attendance/self",
  ATTENDANCE_TEAM: "/attendance/team",
  LEAVE_TEAM: "/leave/team",
  LEAVE_SELF: "/leave/self",
  HOLIDAY: "/holiday",
  DEPARTMENT: "/department",
  REPORT_ANALYTICS: "/report-analytics",
};
