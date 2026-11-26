/* "or" divider + "Or log in with other services" + provider icons. */
export function SocialLogin({ className = "" }) {
  return (
    <div className={className}>
      <div className="mx-[24px] flex items-center gap-[18px]">
        <span className="h-px flex-1 bg-[#E4E4E7]" />
        <span className="text-[15px] leading-[22px] text-black">or</span>
        <span className="h-px flex-1 bg-[#E4E4E7]" />
      </div>

      <p className="mt-[22px] text-center text-[12px] leading-[16px] text-[#FF0000]">
        Or&nbsp; log in with other services
      </p>

      {/* TODO: wire these to the OAuth providers */}
      <div className="mt-[16px] flex items-center justify-center gap-[17px]">
        <button type="button" aria-label="Continue with Apple"><AppleIcon /></button>
        <button type="button" aria-label="Continue with Outlook"><OutlookIcon /></button>
        <button type="button" aria-label="Continue with Google"><GoogleIcon /></button>
      </div>
    </div>
  );
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#000">
      <path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.7-4.1ZM13.9 4.9c.7-.9 1.2-2 1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5Z" />
    </svg>
  );
}

function OutlookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <rect x="9" y="4" width="13" height="16" rx="1.5" fill="#28A8EA" />
      <path d="M9 11l6.5 4L22 11v7.5c0 .8-.7 1.5-1.5 1.5H10.5c-.8 0-1.5-.7-1.5-1.5Z" fill="#0078D4" />
      <rect x="2" y="6" width="12" height="12" rx="1.5" fill="#0364B8" />
      <ellipse cx="8" cy="12" rx="2.6" ry="3.2" fill="none" stroke="#fff" strokeWidth="1.6" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2-1.9 3.3-4.7 3.3-8Z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.8c-1 .7-2.2 1-3.7 1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.9A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.8 14a6.6 6.6 0 0 1 0-4.2V7H2.1a11 11 0 0 0 0 9.9L5.8 14Z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7l3.7 2.9C6.7 7.3 9.1 5.4 12 5.4Z" />
    </svg>
  );
}
