import { useRouter } from "next/router";
import { useCallback } from "react";

/**
 * Hook para navegação usando Next.js router
 * Substitui window.location.href evitando full page reload
 */
export default function useNavigate() {
  const router = useRouter();

  const navigate = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  const replace = useCallback(
    (path: string) => {
      router.replace(path);
    },
    [router]
  );

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  return { navigate, replace, goBack, router };
}
