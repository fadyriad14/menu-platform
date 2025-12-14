"use client";
// ^ Required because we use React state and onClick handlers

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Import Supabase client
import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  // React state for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Message shown to user (errors / success)
  const [message, setMessage] = useState("");

  // Used to redirect after login
  const router = useRouter();

  // Sign up a new restaurant user
  const handleSignUp = async () => {
    setMessage("Creating account...");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Account created! You can now log in.");
  };

  // Log in an existing user
  const handleLogin = async () => {
    setMessage("Logging in...");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    // Successful login → go to dashboard
    router.push("/dashboard");
  };

  return (
    <main style={{ padding: 40, maxWidth: 400 }}>
      <h1>Restaurant Login</h1>

      {/* Email input */}
      <div style={{ marginTop: 16 }}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        />
      </div>

      {/* Password input */}
      <div style={{ marginTop: 12 }}>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        />
      </div>

      {/* Action buttons */}
      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={handleLogin}>Log In</button>
      </div>

      {/* Status / error message */}
      {message && <p style={{ marginTop: 12 }}>{message}</p>}

      {/* Navigation */}
      <div style={{ marginTop: 20 }}>
        <Link href="/" style={{ textDecoration: "underline" }}>
          Back to Home
        </Link>
      </div>
    </main>
  );
}
