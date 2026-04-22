// Configure API endpoint for local vs production
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:3000'  // Local backend/api development
    : 'https://2ytrivx9bl.execute-api.ap-south-1.amazonaws.com';  // Production AWS

const API_URL = API_BASE;
let authToken = localStorage.getItem('authToken') || '';
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;  // Store logged-in user info for role-based UI
let editingId = null;

console.log('[Auth] Page load - authToken:', authToken ? '✓ Set' : '✗ Empty', 'currentUser:', currentUser ? `✓ ${currentUser.role}` : '✗ None');

// --- User Dropdown Management ---
function toggleUserDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    dropdown?.classList.toggle('active');
}

function closeUserDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    dropdown?.classList.remove('active');
}

function updateUserDisplay() {
    if (currentUser) {
        const userName = currentUser.name || currentUser.email || 'User';
        const userEmail = currentUser.email || 'N/A';
        const userRole = currentUser.role?.toUpperCase() || 'GUEST';
        
        document.getElementById('dropdown-user-name').textContent = userName;
        document.getElementById('dropdown-user-email').textContent = userEmail;
        document.getElementById('dropdown-user-role').textContent = userRole;
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown && !dropdown.contains(e.target)) {
        closeUserDropdown();
    }
});

// Update user display on page load if already logged in
document.addEventListener('DOMContentLoaded', updateUserDisplay);

// --- API Wrapper ---
async function authenticatedFetch(url, options = {}) {
    const headers = {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        ...options.headers
    };

    console.log(`[Fetch] ${options.method || 'GET'} ${url.replace(API_URL, '')} - Token: ${authToken ? '✓ Present' : '✗ MISSING'}${authToken ? ` (${authToken.substring(0, 20)}...)` : ''}`);

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401 || response.status === 403) {
        console.warn(`[Fetch] ⚠️ ${response.status} ${url.replace(API_URL, '')}`);
    }

    return response;
}

// --- Toast Notification System ---
function showToast(message, type = 'success', duration = 4000) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// --- Auth Helper Functions ---
async function checkAuthStatus() {
    try {
        const res = await fetch(`${API_URL}/api/auth/status`);
        const data = await res.json();
        return data;
    } catch (err) {
        console.error('Error checking auth status:', err);
        return { adminExists: false, bootstrapRequired: true };
    }
}

function toggleAuthMode() {
    document.getElementById('login-form-container').classList.toggle('hidden');
    document.getElementById('signup-form-container').classList.toggle('hidden');
    document.getElementById('login-error').classList.add('hidden');
    document.getElementById('signup-error').classList.add('hidden');
}

async function performLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorEl = document.getElementById('login-error');

    if (!email || !password) {
        errorEl.textContent = 'Email and password are required';
        errorEl.classList.remove('hidden');
        return;
    }

    try {
        const res = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        console.log('[Login] Response:', { status: res.status, hasToken: !!data.token, user: data.user });

        if (res.ok) {
            authToken = data.token;
            currentUser = data.user;  // Store current user for role-based UI
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            console.log('[Login] ✅ Success - Token set:', authToken.substring(0, 20) + '...', 'Role:', currentUser.role);
            
            // Update user display in navbar
            updateUserDisplay();
            
            document.getElementById('login-overlay').style.display = 'none';
            document.getElementById('dashboard-ui').style.display = 'block';
            await loadAllData();
            document.getElementById('login-email').value = '';
            document.getElementById('login-password').value = '';
        } else {
            errorEl.textContent = data.error || 'Login failed';
            errorEl.classList.remove('hidden');
            console.log('[Login] ❌ Failed:', data.error);
        }
    } catch (err) {
        console.error('[Login] Error:', err);
        errorEl.textContent = 'Connection failed. Is your backend running?';
        errorEl.classList.remove('hidden');
    }
}

async function performSignup() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const errorEl = document.getElementById('signup-error');

    if (!name || !email || !password) {
        errorEl.textContent = 'All fields are required';
        errorEl.classList.remove('hidden');
        return;
    }

    if (password.length < 8) {
        errorEl.textContent = 'Password must be at least 8 characters';
        errorEl.classList.remove('hidden');
        return;
    }

    try {
        const res = await fetch(`${API_URL}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();

        if (res.ok) {
            authToken = data.token;
            currentUser = data.user;  // Store current user for role-based UI
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Update user display in navbar
            updateUserDisplay();
            
            document.getElementById('login-overlay').style.display = 'none';
            document.getElementById('dashboard-ui').style.display = 'block';
            document.getElementById('signup-name').value = '';
            document.getElementById('signup-email').value = '';
            document.getElementById('signup-password').value = '';
            showToast('Account created successfully!', 'success');
            loadAllData();
        } else {
            errorEl.textContent = data.error || 'Signup failed';
            errorEl.classList.remove('hidden');
        }
    } catch (err) {
        console.error('Signup error:', err);
        errorEl.textContent = 'Connection failed. Is your backend running?';
        errorEl.classList.remove('hidden');
    }
}

function logout() {
    closeUserDropdown();
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    authToken = '';
    currentUser = null;
    location.reload();
}

// Check auth on page load
(async () => {
    // Restore user from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
        } catch (e) {
            console.warn('Could not parse saved user data');
        }
    }

    // Ensure UI is clean on start
    document.getElementById('dashboard-ui').style.display = 'none';
    document.getElementById('login-overlay').style.display = 'flex';

    if (authToken) {
        try {
            const res = await fetch(`${API_URL}/api/auth/verify`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            
            if (res.ok) {
                // IMPORTANT: Hide login overlay first, then show dashboard
                document.getElementById('login-overlay').style.display = 'none';
                document.getElementById('dashboard-ui').style.display = 'block';
                await loadAllData();
            } else {
                throw new Error('Invalid token');
            }
        } catch (err) {
            console.error('Auth verification failed:', err);
            localStorage.removeItem('authToken');
            authToken = '';
            await checkAuthStatus();
        }
    } else {
        await checkAuthStatus();
    }
})();

// --- UI Helpers ---
function switchTab(tab) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-link').forEach(el => {
        el.classList.remove('active', 'border-orange-600', 'text-orange-600');
        el.classList.add('border-transparent', 'text-gray-500');
    });

    document.getElementById(`tab-${tab}`).classList.add('active');
    const activeBtn = document.querySelector(`button[onclick="switchTab('${tab}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active', 'border-orange-600', 'text-orange-600');
        activeBtn.classList.remove('border-transparent', 'text-gray-500');
    }
}

function showModal(id, mode = 'Add', data = null) {
    editingId = data ? data.id : null;
    const modal = document.getElementById(id);
    const titleEl = modal.querySelector('h3');
    
    // Reset form if not quote modal or editing
    if (id !== 'quote-modal') {
        const form = modal.querySelector('form');
        if (form && !data) form.reset();
    }
    
    // Handle user modal
    if (id === 'user-modal') {
        const userModalTitle = document.getElementById('user-modal-title');
        const passwordInput = document.getElementById('user-password-input');
        if (userModalTitle) {
            userModalTitle.textContent = data ? `Edit User: ${data.name}` : 'Add New User';
        }
        const form = modal.querySelector('form');
        if (data && form) {
            form.email.value = data.email || '';
            form.name.value = data.name || '';
            form.role.value = data.role || 'viewer';
            form.status.value = data.status || 'active';
            form.password.value = '';
            form.password.placeholder = 'Leave blank to keep current password';
            if (passwordInput) passwordInput.required = false;
        } else if (form) {
            form.password.placeholder = 'Min 8 chars, 1 uppercase, 1 number';
            if (passwordInput) passwordInput.required = true;
        }
    }
    // Handle other modals
    else if (titleEl && (id === 'project-modal' || id === 'service-modal' || id === 'testimonial-modal')) {
        titleEl.textContent = `${mode} ${id.split('-')[0].charAt(0).toUpperCase() + id.split('-')[0].slice(1)}`;
        if (data) {
            const form = modal.querySelector('form');
            Object.keys(data).forEach(key => {
                const input = form.querySelector(`[name="${key}"]`);
                if (input) input.value = data[key];
            });
            if (data.specs) {
                if (document.getElementById('spec-area')) document.getElementById('spec-area').value = data.specs.area || '';
                if (document.getElementById('spec-duration')) document.getElementById('spec-duration').value = data.specs.duration || '';
            }
        }
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function hideModal(id) {
    document.getElementById(id).classList.add('hidden');
    document.getElementById(id).classList.remove('flex');
    editingId = null;
}

// --- Data Loading ---
let allProjects = [];
let allServices = [];
let allTestimonials = [];
let allQuotes = [];
let allUsers = [];

async function loadAllData() {
    if (!authToken) {
        console.warn('Unauthorized access attempt to loadAllData');
        return;
    }
    
    console.log('[loadAllData] Starting with currentUser:', currentUser);
    
    // Update UI based on user role
    updateRoleBasedUI();
    
    // Await all data loads to ensure currentUser is properly set before rendering
    await renderAdminUsers();
    await renderAdminProjects();
    await renderAdminServices();
    await renderAdminTestimonials();
    await renderAdminQuotes();
    await renderAdminStats();
}

// Update UI elements based on current user's role
function updateRoleBasedUI() {
    const isAdmin = currentUser?.role === 'admin';
    const addUserBtn = document.getElementById('add-user-btn');
    
    if (addUserBtn) {
        if (isAdmin) {
            addUserBtn.style.display = 'block';
        } else {
            addUserBtn.style.display = 'none';
        }
    }
}

// ========== USER MANAGEMENT FUNCTIONS ==========

async function renderAdminUsers() {
    try {
        const res = await authenticatedFetch(`${API_URL}/api/users?page=1&limit=50`);
        
        if (!res.ok) {
            const json = await res.json();
            const tbody = document.getElementById('users-table-body');
            if (tbody) {
                const errorMsg = json.error || `HTTP ${res.status}: ${res.statusText}`;
                tbody.innerHTML = `<tr><td colspan="5" class="px-6 py-8 text-center text-red-500">Error: ${errorMsg}</td></tr>`;
            }
            console.error(`[Users] Failed to load: ${res.status} - ${json.error}`, json);
            return;
        }
        
        const json = await res.json();
        allUsers = json.users || [];
        console.log('[Users] ✅ Loaded', allUsers.length, 'users');
        renderUsersTable();
    } catch (err) {
        console.error('[Users] Exception:', err);
        const tbody = document.getElementById('users-table-body');
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="5" class="px-6 py-8 text-center text-red-500">Error: ${err.message}</td></tr>`;
        }
    }
}

function renderUsersTable() {
    const tbody = document.getElementById('users-table-body');
    const isAdmin = currentUser?.role === 'admin';
    
    console.log('[renderUsersTable] currentUser:', currentUser, 'isAdmin:', isAdmin, 'allUsers count:', allUsers.length);
    
    if (allUsers.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">No users found</td></tr>`;
        return;
    }

    tbody.innerHTML = allUsers.map(u => `
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
            <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">${u.email}</td>
            <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">${u.name}</td>
            <td class="px-6 py-4">
                <span class="px-3 py-1 text-xs font-bold rounded-full ${getRoleColor(u.role)}">
                    ${u.role.toUpperCase()}
                </span>
            </td>
            <td class="px-6 py-4">
                <span class="px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(u.status)}">
                    ${u.status}
                </span>
            </td>
            <td class="px-6 py-4 text-center text-sm space-x-2">
                ${isAdmin ? `
                    <button onclick="editUser('${u.id}')" class="text-blue-600 dark:text-blue-400 font-bold hover:underline">Edit</button>
                    <button onclick="deleteUser('${u.id}')" class="text-red-500 dark:text-red-400 font-bold hover:underline">Delete</button>
                ` : '<span class="text-gray-400 italic">View only</span>'}
            </td>
        </tr>
    `).join('');
}

function getRoleColor(role) {
    const colors = {
        admin: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        manager: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        editor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        viewer: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        guest: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
    };
    return colors[role] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
}

function getStatusColor(status) {
    const colors = {
        active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        inactive: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
        suspended: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    };
    return colors[status] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
}

function filterUsers() {
    const search = document.getElementById('user-search')?.value?.toLowerCase() || '';
    const role = document.getElementById('user-role-filter')?.value || '';
    const status = document.getElementById('user-status-filter')?.value || '';
    const isAdmin = currentUser?.role === 'admin';

    const filtered = allUsers.filter(u => {
        const matchSearch = !search || u.email.toLowerCase().includes(search) || u.name.toLowerCase().includes(search);
        const matchRole = !role || u.role === role;
        const matchStatus = !status || u.status === status;
        return matchSearch && matchRole && matchStatus;
    });

    console.log('[filterUsers] isAdmin:', isAdmin, 'filtered count:', filtered.length);

    document.getElementById('users-table-body').innerHTML = filtered.length === 0 
        ? `<tr><td colspan="5" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">No matching users</td></tr>`
        : filtered.map(u => `
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">${u.email}</td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">${u.name}</td>
                <td class="px-6 py-4">
                    <span class="px-3 py-1 text-xs font-bold rounded-full ${getRoleColor(u.role)}">
                        ${u.role.toUpperCase()}
                    </span>
                </td>
                <td class="px-6 py-4">
                    <span class="px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(u.status)}">
                        ${u.status}
                    </span>
                </td>
                <td class="px-6 py-4 text-center text-sm space-x-2">
                    ${isAdmin ? `
                        <button onclick="editUser('${u.id}')" class="text-blue-600 dark:text-blue-400 font-bold hover:underline">Edit</button>
                        <button onclick="deleteUser('${u.id}')" class="text-red-500 dark:text-red-400 font-bold hover:underline">Delete</button>
                    ` : '<span class="text-gray-400 italic">View only</span>'}
                </td>
            </tr>
        `).join('');
}

function editUser(id) {
    if (currentUser?.role !== 'admin') {
        showToast('Only admins can edit users', 'error');
        return;
    }
    const user = allUsers.find(u => u.id === id);
    if (!user) return;
    showModal('user-modal', 'Edit', user);
}

async function deleteUser(id) {
    if (currentUser?.role !== 'admin') {
        showToast('Only admins can delete users', 'error');
        return;
    }
    if (!confirm('Are you sure you want to delete this user? This will deactivate their account.')) return;
    
    try {
        const res = await authenticatedFetch(`${API_URL}/api/users/${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            renderAdminUsers();
            showToast('User deactivated successfully!', 'success');
        } else {
            const error = await res.json();
            showToast('Delete failed: ' + (error.error || 'Check permissions'), 'error');
        }
    } catch (err) {
        console.error('Error deleting user:', err);
        showToast('Error deleting user', 'error');
    }
}

// ========== END USER MANAGEMENT ==========

async function renderAdminProjects() {
    const res = await authenticatedFetch(`${API_URL}/api/projects`);
    allProjects = await res.json();
    const list = document.getElementById('admin-projects-list');
    list.innerHTML = allProjects.map(p => `
        <div class="bg-white dark:bg-gray-800 p-4 rounded shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
            <img src="${p.image}" class="w-full h-32 object-cover rounded mb-4 shadow-sm">
            <h4 class="font-bold text-sm dark:text-gray-200">${p.name_key}</h4>
            <p class="text-xs text-gray-400 dark:text-gray-500 mb-4">${p.category} | ${p.status_key}</p>
            <div class="flex justify-end gap-2">
                <button onclick="editItem('projects', ${p.id})" class="text-blue-600 dark:text-blue-400 text-xs font-bold hover:underline">Edit</button>
                <button onclick="deleteItem('projects', ${p.id})" class="text-red-500 dark:text-red-400 text-xs font-bold hover:underline">Delete</button>
            </div>
        </div>
    `).join('');
}

async function renderAdminServices() {
    const res = await authenticatedFetch(`${API_URL}/api/services`);
    allServices = await res.json();
    const list = document.getElementById('admin-services-list');
    list.innerHTML = allServices.map(s => `
        <div class="bg-white dark:bg-gray-800 p-4 rounded shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
            <h4 class="font-bold text-sm dark:text-gray-200">${s.title_key}</h4>
            <div class="flex justify-end gap-2 mt-4">
                <button onclick="editItem('services', ${s.id})" class="text-blue-600 dark:text-blue-400 text-xs font-bold hover:underline">Edit</button>
                <button onclick="deleteItem('services', ${s.id})" class="text-red-500 dark:text-red-400 text-xs font-bold hover:underline">Delete</button>
            </div>
        </div>
    `).join('');
}

async function renderAdminTestimonials() {
    const res = await authenticatedFetch(`${API_URL}/api/testimonials`);
    allTestimonials = await res.json();
    const list = document.getElementById('admin-testimonials-list');
    list.innerHTML = allTestimonials.map(t => `
        <div class="bg-white dark:bg-gray-800 p-4 rounded shadow-sm border border-gray-200 dark:border-gray-700 flex justify-between items-center transition-colors">
            <div>
                <p class="font-bold text-sm dark:text-gray-200">${t.name}</p>
                <p class="text-xs text-gray-400 dark:text-gray-500">${t.role_key}</p>
            </div>
            <div class="flex gap-2">
                <button onclick="editItem('testimonials', ${t.id})" class="text-blue-600 dark:text-blue-400 text-xs font-bold hover:underline">Edit</button>
                <button onclick="deleteItem('testimonials', ${t.id})" class="text-red-500 dark:text-red-400 text-xs font-bold hover:underline">Delete</button>
            </div>
        </div>
    `).join('');
}

async function renderAdminQuotes() {
    const res = await authenticatedFetch(`${API_URL}/api/quotes`);
    const list = document.getElementById('admin-quotes-list');
    
    if (res.status === 401 || res.status === 403) {
        if (list) list.innerHTML = `<div class="p-8 text-center text-gray-500 dark:text-gray-400">Access Denied: You don't have permission to view quotes.</div>`;
        return;
    }
    
    if (!res.ok) return;
    allQuotes = await res.json();
    list.innerHTML = `
        <table class="w-full text-left text-sm">
            <thead class="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                    <th class="p-4 font-bold dark:text-gray-200">Date</th>
                    <th class="p-4 font-bold dark:text-gray-200">Name</th>
                    <th class="p-4 font-bold dark:text-gray-200">Category</th>
                    <th class="p-4 text-right dark:text-gray-200">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                ${allQuotes.map(q => `
                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td class="p-4 text-gray-400 dark:text-gray-500 text-xs">${new Date(q.created_at).toLocaleDateString()}</td>
                        <td class="p-4 font-semibold dark:text-gray-200">${q.name}</td>
                        <td class="p-4 dark:text-gray-300">${q.category}</td>
                        <td class="p-4 text-right">
                            <button onclick="viewQuote(${q.id})" class="text-orange-600 dark:text-orange-500 font-bold hover:underline">View Details</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

async function renderAdminStats() {
    const res = await authenticatedFetch(`${API_URL}/api/stats`);
    if (!res.ok) return;
    const stats = await res.json();
    const form = document.getElementById('stats-form');
    Object.keys(stats).forEach(key => {
        const input = form.querySelector(`[name="${key}"]`);
        if (input) input.value = stats[key];
    });
}

function viewQuote(id) {
    const q = allQuotes.find(quote => quote.id === id);
    if (!q) return;

    const body = document.getElementById('quote-detail-body');
    body.innerHTML = `
        <div class="grid grid-cols-3 gap-2">
            <p class="text-gray-400 dark:text-gray-500 font-bold uppercase text-[10px]">Client Name</p>
            <p class="col-span-2 font-bold text-gray-900 dark:text-gray-100">${q.name}</p>
            
            <p class="text-gray-400 dark:text-gray-500 font-bold uppercase text-[10px]">Email</p>
            <p class="col-span-2 text-blue-600 dark:text-blue-400">${q.email}</p>
            
            <p class="text-gray-400 dark:text-gray-500 font-bold uppercase text-[10px]">Category</p>
            <p class="col-span-2 dark:text-gray-300">${q.category}</p>
            
            <p class="text-gray-400 dark:text-gray-500 font-bold uppercase text-[10px]">Received</p>
            <p class="col-span-2 dark:text-gray-300">${new Date(q.created_at).toLocaleString()}</p>
        </div>
        <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 border-l-4 border-orange-600">
            <p class="text-gray-400 dark:text-gray-500 font-bold uppercase text-[10px] mb-2">Message</p>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">${q.message}</p>
        </div>
    `;
    showModal('quote-modal');
}

// --- CRUD Actions ---

function editItem(type, id) {
    let data;
    if (type === 'projects') {
        data = allProjects.find(p => p.id === id);
        showModal('project-modal', 'Edit', data);
    } else if (type === 'services') {
        data = allServices.find(s => s.id === id);
        showModal('service-modal', 'Edit', data);
    } else if (type === 'testimonials') {
        data = allTestimonials.find(t => t.id === id);
        showModal('testimonial-modal', 'Edit', data);
    }
}

async function deleteItem(type, id) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
        const res = await authenticatedFetch(`${API_URL}/api/${type}/${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            if (type === 'projects') {
                renderAdminProjects();
            } else if (type === 'services') {
                renderAdminServices();
            } else if (type === 'testimonials') {
                renderAdminTestimonials();
            }
            showToast(`${type.slice(0, -1)} deleted successfully!`, 'success');
        } else {
            showToast('Delete failed. Check your admin key.', 'error');
        }
    } catch (err) {
        console.error('Error deleting item:', err);
        showToast('Error deleting item', 'error');
    }
}

// Form Handlers
document.getElementById('user-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Check if user is admin
    if (currentUser?.role !== 'admin') {
        showToast('Only admins can create or edit users', 'error');
        return;
    }
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Remove empty password field
    if (!data.password) delete data.password;

    const url = editingId ? `${API_URL}/api/users/${editingId}` : `${API_URL}/api/users`;
    const method = editingId ? 'PUT' : 'POST';

    try {
        const res = await authenticatedFetch(url, {
            method: method,
            body: JSON.stringify(data)
        });

        if (res.ok) {
            hideModal('user-modal');
            renderAdminUsers();
            showToast(editingId ? 'User updated successfully!' : 'User created successfully!', 'success');
        } else {
            const error = await res.json();
            showToast('Error: ' + (error.error || 'Operation failed'), 'error');
        }
    } catch (err) {
        console.error('Error:', err);
        showToast('Error saving user', 'error');
    }
});

async function uploadAndZipImage(file) {
    if (!file) return null;

    const zip = new JSZip();
    zip.file(file.name, file);
    const zippedContent = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });

    const urlRes = await authenticatedFetch(`${API_URL}/api/auth/upload-url?filename=${file.name}.zip&contentType=application/zip`);
    const { uploadUrl, key } = await urlRes.json();

    await fetch(uploadUrl, {
        method: 'PUT',
        body: zippedContent,
        headers: { 'Content-Type': 'application/zip' }
    });

    return key;
}

document.getElementById('project-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Uploading & Saving...';

    try {
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        // Handle Image Upload & Zipping
        const fileInput = document.getElementById('project-image-file');
        if (fileInput.files.length > 0) {
            const uploadedKey = await uploadAndZipImage(fileInput.files[0]);
            if (uploadedKey) data.image = uploadedKey;
        }

        data.specs = {
            area: document.getElementById('spec-area').value,
            duration: document.getElementById('spec-duration').value,
            typeKey: data.category === 'res' ? 'opt_res' : (data.category === 'comm' ? 'opt_comm' : 'opt_infra')
        };

        const url = editingId ? `${API_URL}/api/projects/${editingId}` : `${API_URL}/api/projects`;
        const method = editingId ? 'PUT' : 'POST';

        const res = await authenticatedFetch(url, {
            method: method,
            body: JSON.stringify(data)
        });

        if (res.ok) {
            hideModal('project-modal');
            renderAdminProjects();
            showToast(editingId ? 'Project updated successfully!' : 'Project created successfully!', 'success');
        } else {
            const error = await res.json();
            showToast('Error: ' + (error.error || 'Operation failed'), 'error');
        }
    } catch (err) {
        console.error('Error saving project:', err);
        showToast('Error saving project', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Save Project';
    }
});

document.getElementById('service-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const url = editingId ? `${API_URL}/api/services/${editingId}` : `${API_URL}/api/services`;
    const method = editingId ? 'PUT' : 'POST';

    try {
        const res = await authenticatedFetch(url, {
            method: method,
            body: JSON.stringify(data)
        });

        if (res.ok) {
            hideModal('service-modal');
            renderAdminServices();
            showToast(editingId ? 'Service updated successfully!' : 'Service created successfully!', 'success');
        } else {
            const error = await res.json();
            showToast('Error: ' + (error.error || 'Operation failed'), 'error');
        }
    } catch (err) {
        console.error('Error:', err);
        showToast('Error saving service', 'error');
    }
});

document.getElementById('testimonial-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const url = editingId ? `${API_URL}/api/testimonials/${editingId}` : `${API_URL}/api/testimonials`;
    const method = editingId ? 'PUT' : 'POST';

    try {
        const res = await authenticatedFetch(url, {
            method: method,
            body: JSON.stringify(data)
        });

        if (res.ok) {
            hideModal('testimonial-modal');
            renderAdminTestimonials();
            showToast(editingId ? 'Testimonial updated successfully!' : 'Testimonial created successfully!', 'success');
        } else {
            const error = await res.json();
            showToast('Error: ' + (error.error || 'Operation failed'), 'error');
        }
    } catch (err) {
        console.error('Error:', err);
        showToast('Error saving testimonial', 'error');
    }
});

document.getElementById('stats-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const res = await authenticatedFetch(`${API_URL}/api/stats`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });

        if (res.ok) {
            renderAdminStats();
            showToast('Stats updated successfully!', 'success');
        } else {
            const error = await res.json();
            showToast('Error: ' + (error.error || 'Operation failed'), 'error');
        }
    } catch (err) {
        console.error('Error:', err);
        showToast('Error saving stats', 'error');
    }
});
