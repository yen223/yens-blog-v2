/**
 * Track page views using Plausible.io
 * @param request - The incoming request
 */
export async function trackPageView(request: Request) {
  const url = new URL(request.url);
  const userAgent = request.headers.get("user-agent") || "";
  const referrer = request.headers.get("referer") || "";

  try {
    await fetch("https://plausible.io/api/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": userAgent,
        // cf-connecting-ip is cloudflare-specific
        "X-Forwarded-For": request.headers.get("cf-connecting-ip") || "",
      },
      body: JSON.stringify({
        name: "pageview",
        url: url.href,
        domain: url.hostname,
        referrer: referrer,
      }),
    });
  } catch (error) {
    // Fail silently - analytics should not break the app
    console.error("Failed to track pageview:", error);
  }
}
