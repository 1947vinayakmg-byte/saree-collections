import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Store, Sparkles, KeyRound } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import Input from "../components/Input";
import Button from "../components/Button";

export default function LoginPage() {
  const { login, isAuthenticated, isLoggingIn } = useAdmin();
  const navigate = useNavigate();

  // Redirect to Dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const [email, setEmail] = useState("admin@gmail.com"); // Pre-filled for immediate developer convenience
  const [password, setPassword] = useState("123456");
  const [errorList, setErrorList] = useState<{ [key: string]: string }>({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    const tempErrors: { [key: string]: string } = {};
    if (!email.trim()) {
      tempErrors.email = "Please specify Admin Email.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Please specify a valid email format.";
    }

    if (!password) {
      tempErrors.password = "Please enter password.";
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrorList(tempErrors);
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans overflow-hidden">
      {/* Visual Saree/Brand Showcase Half */}
      <div className="hidden md:flex flex-col justify-between w-1/2 bg-slate-900 text-white p-12 relative overflow-hidden">
        {/* Absolute Background Pattern Accent */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top_right,var(--color-amber-500),transparent_50%)]" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-600/10 blur-3xl" />

        <div className="flex items-center gap-3 relative z-10 z-[1]">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
            <Store className="w-5.5 h-5.5" />
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-wider uppercase">
              demo saree
            </h1>
            <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">
              Apparel Management System
            </p>
          </div>
        </div>

        <div className="space-y-4 max-w-md relative z-10 z-[1] my-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-bold text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Beginner-Friendly Admin Panel</span>
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Curate Beautiful Indian Textiles & Fashion.
          </h2>
          <p className="text-sm font-medium text-gray-400 leading-relaxed">
            Welcome to your master store cabinet! Log in on the right to sync catalogs, track low stock levels, update WhatsApp support links, and edit custom silk sarees.
          </p>
        </div>

        <p className="text-xs text-gray-500 relative z-10 z-[1]">
          &copy; 2026 Vastra Saree Inc. All Rights Reserved. Standalone Secure Platform.
        </p>
      </div>

      {/* Actual Sign-In Portal Form Half */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-sm flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="space-y-2">
            {/* Store title on mobile */}
            <div className="md:hidden flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                <Store className="w-4.5 h-4.5" />
              </div>
              <span className="text-sm font-bold tracking-wider uppercase text-slate-900">
                Vastra demo-web
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              demo-web Login
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Please declare your registered credentials to access the inventory.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Address */}
            <Input
              type="email"
              label="Email Address"
              placeholder="e.g., storeowner@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorList.email) setErrorList((prev) => ({ ...prev, email: "" }));
              }}
              error={errorList.email}
              icon={<Mail className="w-4.5 h-4.5 text-gray-400" />}
              disabled={isLoggingIn}
            />

            {/* Password input */}
            <div className="space-y-1">
              <Input
                type="password"
                label="Admin Password"
                placeholder="******"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorList.password) setErrorList((prev) => ({ ...prev, password: "" }));
                }}
                error={errorList.password}
                icon={<Lock className="w-4.5 h-4.5 text-gray-400" />}
                disabled={isLoggingIn}
              />
            </div>

            {/* Login Trigger Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full py-2.5 mt-2"
              isLoading={isLoggingIn}
            >
              Sign In to Store
            </Button>
          </form>

          {/* Dummy Credentials Alert Box (Extreme Helpfulness!) */}
          <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/40 p-4 space-y-2.5 text-xs text-amber-900">
            <h5 className="font-bold flex items-center gap-1.5 uppercase tracking-wide">
              <KeyRound className="w-4.5 h-4.5 text-amber-600 flex-shrink-0" />
              <span>Demo Login Key Credentials</span>
            </h5>
            <div className="space-y-1 bg-white border border-amber-100 p-2.5 rounded-lg font-mono">
              <p className="flex justify-between">
                <span className="text-amber-700">Email:</span>
                <span className="font-bold">admin@gmail.com</span>
              </p>
              <p className="flex justify-between">
                <span className="text-amber-700">Password:</span>
                <span className="font-bold">123456</span>
              </p>
            </div>
            <p className="text-[10px] text-amber-700/80 leading-snug">
              *Designed specifically for demo-web shops. Easily sync and test CRUD actions immediately on login!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
