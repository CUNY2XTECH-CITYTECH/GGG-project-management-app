"use client";

import { useEffect, useState } from "react";

export default function AccountPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    fetch("/api/account")
      .then((res) => res.json())
      .then((data) => setUser(data[0])); // Assuming we return one user for now
  }, []);

  return (
    <div>
      <h1>Account Details</h1>
      {user ? (
        <p>
          Name: {user.name} <br />
          Email: {user.email}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
