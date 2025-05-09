export type Administration = {
    id: number;
    username: string;
    name: string;
    email: string;
    phone: string;
    otp: "Google Authenticator" | "Authy Authenticator"; // Union type for OTP options
    permissions: number;
    lastLogin: string;
    ip: string;
  };
  