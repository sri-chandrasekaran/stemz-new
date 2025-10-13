import { call_api } from './api';

// Test signup
const testSignup = async () => {
    const signupPayload = {
        name: "Test User",
        email: "testuser@example.com",
        password: "password123"
    };

    try {
        const response = await call_api(signupPayload, "auth/signup", "POST");
        console.log('Signup successful:', response);
    } catch (error) {
        console.error('Signup failed:', error);
    }
};

// Test login
const testLogin = async () => {
    const loginPayload = {
        email: "testuser@example.com",
        password: "password123"
    };

    try {
        const response = await call_api(loginPayload, "auth/login", "POST");
        console.log('Login successful:', response);
    } catch (error) {
        console.error('Login failed:', error);
    }
};

// Run tests
console.log('Testing Signup...');
testSignup();

setTimeout(() => {
    console.log('\nTesting Login...');
    testLogin();
}, 2000);