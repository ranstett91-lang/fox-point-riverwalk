self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: "window" }))
      .then((clients) => Promise.all(clients.map((client) =>
        // navigate() rejects for non-navigable / cross-origin clients.
        // Swallow per-client failures so one bad client doesn't fail
        // the whole activate() chain.
        client.navigate(client.url).catch(() => {})
      )))
  );
});
