"use client";

import { useState } from "react";

export default function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);

    async function subscribe(e: any) {
        e.preventDefault();
        setSuccess(false);

        const res = await fetch("/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        if (res.ok) {
            setSuccess(true);
            setEmail("");
        }
    }

    return (
        <form onSubmit={subscribe} className="space-y-3">
            {/* Label adapts to dark mode */}
            <label className="block text-black dark:text-white font-semibold">
                Subscribe to Newsletter
            </label>

            {/* Input adapts to dark mode too */}
            <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full p-2 rounded border bg-white dark:bg-[#222]
                           text-black dark:text-white dark:border-gray-600"
            />

            <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white rounded"
            >
                Subscribe
            </button>

            {success && (
                <p className="text-green-600 dark:text-green-400">
                    Thank you for subscribing!
                </p>
            )}
        </form>
    );
}
