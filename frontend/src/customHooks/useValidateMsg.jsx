export const useValidateMessage = (userInfo) => {
    const newErrors = {};
    // Fullname
    if (!userInfo.fullName || userInfo.fullName.trim() === "") {
        newErrors.fullName = "Full name is required.";
    }

    // Email
    if (!userInfo.email) {
        newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
        newErrors.email = "Invalid email format.";
    }

    // Gender
    if (!userInfo.gender) {
        newErrors.gender = "Gender is required.";
    }

    // Password
    if (!userInfo.password) {
        newErrors.password = "Password is required.";
    } else if (userInfo.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters.";
    }

    // Confirm Password
    if (!userInfo.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password.";
    } else if (userInfo.password !== userInfo.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
    }

    // Phone
    if (!userInfo.phone) {
        newErrors.phone = "Phone number is required.";
    } else if (userInfo.phone.length < 10) {
        newErrors.phone = "Invalid phone number.";
    }

    return { errors: newErrors }
}

