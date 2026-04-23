"use client";

import { useState } from "react";

export function ShareButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    let success = false;

    try {
      await navigator.clipboard.writeText(url);
      success = true;
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.setAttribute("readonly", "true");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      success = document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    if (!success) return;

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "링크 복사됨" : "링크 복사"}
      aria-live="polite"
      className="btn-ghost"
    >
      {copied ? "✓ 복사됨" : "링크 복사"}
    </button>
  );
}
