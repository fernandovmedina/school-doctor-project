"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

/**
 * Root page – acts as AuthGate.
 * • Session exists  → /root/home
 * • No session      → /auth/welcome
 */
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data: { session } }) => {
      router.replace(session ? "/root/home" : "/auth/welcome");
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      router.replace(session ? "/root/home" : "/auth/welcome");
    });

    return () => sub.subscription.unsubscribe();
  }, [router]);

  return (
    <div className="mobile-shell" style={{ background: "var(--clr-red-900)", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 40, height: 40, border: "4px solid rgba(255,255,255,.3)", borderTop: "4px solid #fff", borderRadius: "50%", animation: "spin .7s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}