class AuthService {
    static getUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }

    static getCurrentUser() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    }

    static login(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            return { success: true, message: 'Login successful!' };
        }
        
        return { success: false, message: 'Invalid credentials' };
    }

    static register(userData) {
        const users = this.getUsers();
        
        // Check if email already exists
        if (users.find(u => u.email === userData.email)) {
            return { success: false, message: 'Email already registered' };
        }

        // Add new user
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        
        return { success: true, message: 'Registration successful! Please login.' };
    }

    static logout() {
        localStorage.removeItem('currentUser');
        return { success: true, message: 'Logged out successfully' };
    }

    static updateLogin(userData) {
        const users = this.getUsers();
        const currentUser = this.getCurrentUser();
        
        if (!currentUser) {
            return { success: false, message: 'No user logged in' };
        }

        const userIndex = users.findIndex(u => u.email === currentUser.email);
        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...userData };
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
            return { success: true, message: 'Profile updated successfully' };
        }

        return { success: false, message: 'User not found' };
    }
}

export default AuthService;