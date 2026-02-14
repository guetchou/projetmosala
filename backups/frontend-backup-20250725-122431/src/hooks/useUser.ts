import { useEffect, useState } from "react";

export function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/mock-user.json")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
} 