export const GENERAL = {
    // API call related
    UNEXPECTED_ERROR : "An unexpected error occurred, Please try again later",
    LOGOUT_SUCCESS : "Logout Successful",
    SESSION_EXPIRED : "Session Expired, Please login again",
    FORBID : "Access Denied",

    // Schema speciifc
    // auth schema
    EMAIL_SIZE : "Email must be 50 characters or less",
    EMAIL_VALID : "Enter a valid email",
    EMAIL_REQ : "Email is Required",
    PASSWORD_SIZE : "Password must be 50 characters or less",
    PASSWORD_REQ : "Password is required",
    STRONG_PASSWORD : "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
    CONFIRM_PASSWORD_MATCH : "New password and confirm password does not match",

    // department schema
    DEPARTMENT_NAME_SIZE : "Department name must be 100 characters or less",
    VALID_NAME : "Enter valid name",
    NAME_REQ : "Name is Required",

    // user schema
    NAME_SIZE : "Name must be 50 characters or less",
    ROLE_REQ : "Role is Required",
    DEPT_REQ : "Department is Required",
    MANAGER_REQ : "Manager is Required",

    // dashboard schema
    PASSWORD_NOT_SAME : "New password cannot be same as current password",
}