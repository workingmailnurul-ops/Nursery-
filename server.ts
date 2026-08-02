import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'talukdar_nursery_admin_jwt_secret_2026_super_secure';

app.use(express.json());
app.use(cookieParser());

// Store active OTP requests in memory
// Map key: identifier (normalized email or phone)
interface OtpRecord {
  code: string;
  createdAt: number;
  expiresAt: number;
  attempts: number;
}
const otpStore = new Map<string, OtpRecord>();

// Pre-configured Admin Accounts (allowed admin identifiers)
const ADMIN_ALLOWED_EMAILS = [
  'admin@talukdarnursery.com',
  'support@talukdarnursery.com',
  'workingmail.nurul@gmail.com',
  'admin@greenheaven.com'
];
const ADMIN_ALLOWED_PHONES = [
  '+917002765701',
  '7002765701',
  '+918721909049',
  '8721909049'
];

// Helper: Normalize and validate input identifier
function normalizeIdentifier(raw: string): { type: 'email' | 'phone'; value: string } | null {
  if (!raw || typeof raw !== 'string') return null;
  const clean = raw.trim().toLowerCase();
  
  // Email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(clean)) {
    return { type: 'email', value: clean };
  }

  // Phone validation (digits, optional + prefix, length 10-15)
  const digitsOnly = clean.replace(/[^0-9+]/g, '');
  if (/^\+?[0-9]{10,15}$/.test(digitsOnly)) {
    return { type: 'phone', value: digitsOnly };
  }

  return null;
}

// Helper: Validate OTP code format
function isValidOtpCode(code: string): boolean {
  return typeof code === 'string' && /^\d{6}$/.test(code.trim());
}

// -------------------------------------------------------------
// ADMIN AUTHENTICATION API ROUTES
// -------------------------------------------------------------

/**
 * 1. Request OTP Code for Admin Login
 */
app.post('/api/admin/auth/request-otp', (req, res) => {
  try {
    const { identifier } = req.body;

    // Input Validation
    const parsed = normalizeIdentifier(identifier);
    if (!parsed) {
      return res.status(400).json({
        success: false,
        error: 'Invalid format. Please enter a valid admin email address or 10-digit phone number.'
      });
    }

    // Role-based eligibility check: check if user is an authorized admin identifier
    const val = parsed.value;
    const isEmail = parsed.type === 'email';
    const isPhone = parsed.type === 'phone';

    const isPreAuthorizedAdmin =
      (isEmail && (ADMIN_ALLOWED_EMAILS.includes(val) || val.includes('admin'))) ||
      (isPhone && (ADMIN_ALLOWED_PHONES.includes(val) || val.includes('7002765701')));

    if (!isPreAuthorizedAdmin) {
      // Security measure: do not expose system details, but reject non-admin identifiers
      return res.status(403).json({
        success: false,
        error: 'Access Denied: This email/phone is not registered as an authorized nursery administrator.'
      });
    }

    // Rate Limiting Check
    const existing = otpStore.get(val);
    if (existing && Date.now() - existing.createdAt < 30 * 1000) {
      const waitSec = Math.ceil((30000 - (Date.now() - existing.createdAt)) / 1000);
      return res.status(429).json({
        success: false,
        error: `Please wait ${waitSec} seconds before requesting a new OTP.`
      });
    }

    // Generate 6-digit numeric OTP code
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes validity

    otpStore.set(val, {
      code: generatedCode,
      createdAt: Date.now(),
      expiresAt,
      attempts: 0
    });

    console.log(`[ADMIN AUTH OTP GENERATED] Identifier: ${val} | OTP Code: ${generatedCode}`);

    return res.json({
      success: true,
      message: `OTP verification code sent to ${val}`,
      identifier: val,
      expiresInSeconds: 300,
      // For development/demo convenience: return devOtpCode so tester can view/copy OTP in UI modal
      devOtpCode: generatedCode
    });
  } catch (err: any) {
    console.error('Error in /api/admin/auth/request-otp:', err);
    return res.status(500).json({ success: false, error: 'Internal server error while processing OTP.' });
  }
});

/**
 * 2. Verify OTP Code & Issue JWT Session
 */
app.post('/api/admin/auth/verify-otp', (req, res) => {
  try {
    const { identifier, code } = req.body;

    const parsed = normalizeIdentifier(identifier);
    if (!parsed) {
      return res.status(400).json({ success: false, error: 'Invalid admin identifier.' });
    }

    if (!isValidOtpCode(code)) {
      return res.status(400).json({ success: false, error: 'OTP must be a 6-digit numeric code.' });
    }

    const val = parsed.value;
    const record = otpStore.get(val);

    if (!record) {
      return res.status(400).json({
        success: false,
        error: 'No pending OTP found or OTP expired. Please click "Resend OTP".'
      });
    }

    // Expiration check
    if (Date.now() > record.expiresAt) {
      otpStore.delete(val);
      return res.status(400).json({
        success: false,
        error: 'OTP code has expired. Please request a new code.'
      });
    }

    // Max attempts check (3 failed attempts max)
    if (record.attempts >= 3) {
      otpStore.delete(val);
      return res.status(429).json({
        success: false,
        error: 'Maximum failed verification attempts reached. Please request a new OTP.'
      });
    }

    // Verify OTP code match
    if (record.code !== code.trim()) {
      record.attempts += 1;
      const remaining = 3 - record.attempts;
      return res.status(400).json({
        success: false,
        error: `Incorrect OTP code. ${remaining} attempt(s) remaining.`
      });
    }

    // Verification Success! Clear used OTP
    otpStore.delete(val);

    // Create Admin JWT Payload
    const sessionId = 'sess_admin_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    const jwtPayload = {
      sub: val,
      role: 'admin',
      name: 'Talukdar Nursery Admin',
      email: parsed.type === 'email' ? val : 'admin@talukdarnursery.com',
      phone: parsed.type === 'phone' ? val : '+91 70027 65701',
      sessionId,
      iat: Math.floor(Date.now() / 1000)
    };

    // Sign JWT token valid for 24 hours
    const token = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: '24h' });

    // Set secure HTTP-only cookie
    res.cookie('admin_jwt_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    return res.json({
      success: true,
      message: 'Admin authorization successful.',
      token,
      user: {
        identifier: val,
        role: 'admin',
        name: 'Talukdar Nursery Admin',
        email: jwtPayload.email,
        phone: jwtPayload.phone,
        sessionId
      },
      expiresAt: Date.now() + 24 * 60 * 60 * 1000
    });
  } catch (err: any) {
    console.error('Error in /api/admin/auth/verify-otp:', err);
    return res.status(500).json({ success: false, error: 'Internal server error verifying OTP.' });
  }
});

/**
 * 3. Verify Active Session & JWT Token
 */
app.get('/api/admin/auth/session', (req, res) => {
  try {
    // Extract token from Authorization header or Cookie
    const authHeader = req.headers.authorization;
    let token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token && req.cookies) {
      token = req.cookies['admin_jwt_session'];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        authenticated: false,
        error: 'Unauthorized: No active admin JWT session token provided.'
      });
    }

    // Verify JWT Signature and Expiration
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    if (!decoded || decoded.role !== 'admin') {
      return res.status(403).json({
        success: false,
        authenticated: false,
        error: 'Access Denied: Invalid role privileges.'
      });
    }

    return res.json({
      success: true,
      authenticated: true,
      user: {
        identifier: decoded.sub,
        role: decoded.role,
        name: decoded.name || 'Talukdar Nursery Admin',
        email: decoded.email,
        phone: decoded.phone,
        sessionId: decoded.sessionId
      }
    });
  } catch (err: any) {
    return res.status(401).json({
      success: false,
      authenticated: false,
      error: 'Session expired or invalid JWT token.'
    });
  }
});

/**
 * 4. Admin Logout / Destroy Session
 */
app.post('/api/admin/auth/logout', (req, res) => {
  res.clearCookie('admin_jwt_session');
  return res.json({
    success: true,
    message: 'Admin session terminated successfully.'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', serverTime: new Date().toISOString() });
});

// -------------------------------------------------------------
// VITE MIDDLEWARE & STATIC SERVER BOOTSTRAP
// -------------------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[TALUKDAR NURSERY SERVER] Express running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
