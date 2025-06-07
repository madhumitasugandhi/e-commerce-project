

const getCurrentUser = () => {
    const user = localStorage.getItem("e-commerce-user-details");
    if(!user) {
        return null;
    }

    try {
        return JSON.parse(user);
    } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
    }
};

const getJwtToken = () => {
    const token = localStorage.getItem("e-commerce-user-token");
    if(!token) {
        return null;
    }

    return `Bearer ${token}`;
};

const logout = () => {
    localStorage.clear();
    setTimeout(() => {
        window.location.href = "/login";
    }, 1000);
};

export { getCurrentUser, getJwtToken, logout };