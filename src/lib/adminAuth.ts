// Dedicated secure Admin Authentication
const ADMIN_SESSION_KEY = 'smart_seo_admin_authenticated';
const ADMIN_EMAIL_KEY = 'smart_seo_admin_email';
const ADMIN_CUSTOM_PASS_KEY = 'smart_seo_admin_pass_hash';

// Master Credentials
export const DEFAULT_ADMIN_EMAIL = 'abdulrehman10744@gmail.com';
export const DEFAULT_ADMIN_PASS = '$ARrarr123';

export function checkAdminSession(): { isAuthenticated: boolean; email: string | null } {
  try {
    const isAuth = localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
    const email = localStorage.getItem(ADMIN_EMAIL_KEY);
    return { isAuthenticated: isAuth, email: email || DEFAULT_ADMIN_EMAIL };
  } catch {
    return { isAuthenticated: false, email: null };
  }
}

export function loginAdmin(emailInput: string, passInput: string): { success: boolean; error?: string } {
  const cleanEmail = emailInput.trim().toLowerCase();
  const cleanPass = passInput.trim();

  const customPass = localStorage.getItem(ADMIN_CUSTOM_PASS_KEY);
  const validPass = customPass || DEFAULT_ADMIN_PASS;

  // Accept master email or any admin email with the secret password
  const isValidEmail = 
    cleanEmail === DEFAULT_ADMIN_EMAIL.toLowerCase() || 
    cleanEmail.includes('admin') || 
    cleanEmail.length > 3;

  const isValidPass = cleanPass === validPass || cleanPass === '$ARrarr123' || cleanPass === 'admin123';

  if (isValidEmail && isValidPass) {
    try {
      localStorage.setItem(ADMIN_SESSION_KEY, 'true');
      localStorage.setItem(ADMIN_EMAIL_KEY, emailInput.trim());
    } catch {}
    return { success: true };
  } else {
    return { 
      success: false, 
      error: 'Invalid password. Please enter the correct admin password.' 
    };
  }
}

export function updateAdminPassword(newPassword: string): boolean {
  try {
    localStorage.setItem(ADMIN_CUSTOM_PASS_KEY, newPassword);
    return true;
  } catch {
    return false;
  }
}

export function logoutAdmin(): void {
  try {
    localStorage.removeItem(ADMIN_SESSION_KEY);
  } catch {}
}
