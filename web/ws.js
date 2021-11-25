self.addEventListener("fetch", (event) => {
    console.log(`Fetching : ${event.request.url}, Mode : ${event.request.mode}`)
    if (event.request.mode == 'navigate') {
        event.respondWith((async () => {
            return new Response("Bonjour les gens");
        })());
    }
});
