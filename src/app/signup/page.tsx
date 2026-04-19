"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
          await signIn("credentials", {
            email,
            password,
            callbackUrl: "/dashboard"
          });
      } else {
        const data = await res.json();
        setError(data.error || "An error occurred");
      }
    } catch (_err) {
      setError("An error occurred");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-brand-background">
      <div className="w-full max-w-md space-y-8 rounded-none bg-brand-surface p-8 ">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">Create an account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <div className="space-y-4 rounded-none -sm">
             <div>
              <label className="sr-only" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                required
                className="block w-full rounded-none border border-brand-muted/30 px-3 py-2 placeholder-gray-500 focus:border-brand-accent focus:outline-none focus:ring-brand-accent sm:text-sm"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                required
                className="block w-full rounded-none border border-brand-muted/30 px-3 py-2 placeholder-gray-500 focus:border-brand-accent focus:outline-none focus:ring-brand-accent sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                required
                className="block w-full rounded-none border border-brand-muted/30 px-3 py-2 placeholder-gray-500 focus:border-brand-accent focus:outline-none focus:ring-brand-accent sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-none border border-transparent bg-brand-accent px-4 py-2 text-sm font-medium text-white hover:bg-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
            <Link href="/login" className="text-sm text-brand-accent hover:text-brand-accent">
                Already have an account? Sign in
            </Link>
        </div>
      </div>
    </div>
  );
}
