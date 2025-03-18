"use client";

import { useState } from "react";
import { signUp } from "supertokens-web-js/recipe/emailpassword";
import "supertokens-web-js";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

    const handleSignUp = async (e:SubmitEvent) => {
    e.preventDefault();
    // Placeholder basic validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    //placeholder until API calls/authentication are implemented

    const response = await signUp({
        formFields: [{
            id: "email",
            value: email
        }, {
            id: "password",
            value: password
        }]
    })
    console.log(response)
  };

  return (
    
    <div className="container">
      <h1>Sign-Up</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={(e) => handleSignUp(e as unknown as SubmitEvent)}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign-Up</button>
      </form>
    </div>
  );
}