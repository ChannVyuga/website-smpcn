
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const IDLE_MS = 15 * 60 * 1000;
const REFRESH_MS = 60 * 1000;

export default function SessionGuard() {
  const router = useRouter();

  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout>;
    let refreshTimer: ReturnType<typeof setInterval>;
    let lastActivity = Date.now();
    let busy = false;
    let stopped = false;

    async function logout() {
      if (stopped) return;
      stopped = true;

      clearTimeout(idleTimer);
      clearInterval(refreshTimer);

      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          credentials: 'same-origin',
        });
      } finally {
        router.replace('/admin/login?reason=timeout');
        router.refresh();
      }
    }

    function resetIdleTimer() {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        void logout();
      }, IDLE_MS);
    }

    async function refreshSession() {
      if (busy || stopped) return;

      if (Date.now() - lastActivity >= IDLE_MS) {
        await logout();
        return;
      }

      busy = true;

      try {
        const response = await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'same-origin',
          cache: 'no-store',
        });

        if (response.status === 401) {
          await logout();
        }
      } catch {
        // Gangguan jaringan sementara tidak otomatis menghapus sesi.
        // Server tetap menolak token saat token benar-benar kedaluwarsa.
      } finally {
        busy = false;
      }
    }

    function handleActivity() {
      if (stopped) return;

      lastActivity = Date.now();
      resetIdleTimer();
    }

    const events = [
      'pointerdown',
      'keydown',
      'mousemove',
      'scroll',
      'touchstart',
    ];

    events.forEach((event) => {
      window.addEventListener(event, handleActivity, {
        passive: true,
      });
    });

    resetIdleTimer();
    refreshTimer = setInterval(() => {
      void refreshSession();
    }, REFRESH_MS);

    return () => {
      stopped = true;
      clearTimeout(idleTimer);
      clearInterval(refreshTimer);

      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [router]);

  return null;
}