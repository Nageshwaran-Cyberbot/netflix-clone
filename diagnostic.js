// Run this in your browser console to diagnose issues
console.log('=== NETFLIX CLONE DIAGNOSTICS ===\n');

// Check 1: Auth State
const token = localStorage.getItem('netflix_token');
const user = localStorage.getItem('user');
console.log('1. Auth State:');
console.log('   Token exists:', !!token);
console.log('   User data:', user ? JSON.parse(user) : 'No user data');
console.log('');

// Check 2: Current Route
console.log('2. Current Route:', window.location.pathname);
console.log('');

// Check 3: DOM Elements
console.log('3. DOM Elements:');
console.log('   Navbar present:', !!document.querySelector('nav, [class*="navbar"]'));
console.log('   Footer present:', !!document.querySelector('footer, [class*="footer"]'));
console.log('   ChatBot present:', !!document.querySelector('[class*="chatbot"]'));
console.log('');

// Check 4: React Context
console.log('4. To check React Context, open React DevTools:');
console.log('   - Find AuthContext');
console.log('   - Check: user, token, isAuthenticated, loading');
console.log('');

// Check 5: Network Requests
console.log('5. Check Network Tab:');
console.log('   - Look for failed API calls (red)');
console.log('   - Check /api/auth/login response');
console.log('   - Verify token in Authorization header');
console.log('');

console.log('=== END DIAGNOSTICS ===');
