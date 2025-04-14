self.importScripts('/js/localforage.min.js');

var asset_cache = 'asset_cache';
var precachedAssets = [
    '/contents/admin/assets/css/bootstrap.css',
    '/contents/admin/assets/css/custom.css',
    '/contents/admin/assets/css/fontawesome.css',
    '/contents/admin/assets/css/icofont.css',
    '/contents/admin/assets/css/responsive.css',
    '/contents/admin/assets/css/style.css',
    '/contents/admin/assets/css/themify.css',

    '/contents/admin/assets/fonts/font-awesome/fontawesome-webfont.woff2?v=4.7.0',
    '/contents/admin/assets/fonts/ico/icofont.ttf?v=1.0.0-beta',
    '/contents/admin/assets/fonts/themify/themify.woff?-fvbane',

    '/contents/admin/assets/images/dashboard/browser.png',
    '/contents/admin/assets/images/dashboard/notification.png',
    '/contents/admin/assets/images/dashboard/user.png',

    '/contents/admin/assets/js/bootstrap/bootstrap.bundle.min.js',
    '/contents/admin/assets/js/jquery-3.2.1.min.js',
    '/contents/admin/assets/js/script.js',

    '/contents/admin/report/bangla.ttf',

    '/js/localforage.min.js',
    '/js/sweet_alert.js',
    '/logo.png',
    '/logo_white.png',
    '/favicon.ico',
];

var pwa_assets = [
    '/manifest.json',
    // '/main.js',
    '/sw.js',
    '/pwa.js',

    '/contents/admin/report/ReportBody.css',
    '/contents/admin/report/monthlyPlan.css',
    '/js/vue_report_management.js',
];

var api_caches = [
    "/",
    // "/api/v1/report/get-daily-report",
    "/api/v1/user/check-auth",
    "/api/v1/user/user_info",
    "/api/v1/report/get-report-column-values",
    "/api/v1/report/get-report-columns",
];


/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(asset_cache).then(async function (cache) {
            return cache.addAll(precachedAssets);
        })
    );
    self.skipWaiting();
});


self.addEventListener('fetch', function (e) {
    const url = new URL(e.request.url);
    const path = url.pathname + url.search;
    const isPrecachedRequest = precachedAssets.includes(path);
    const destination = e.request.destination;

    if (isPrecachedRequest) {
        return get_pre_cached(e);
    }

    switch (destination) {
        case "image":
            return response_and_store_cache(e, "image_cache", "stale_while_revalidate");
        case "font":
            return response_and_store_cache(e, "font_cache", "stale_while_revalidate");
        default:
            if (api_caches.includes(url.pathname)) {
                return response_and_store_cache(e, "api_cache", "stale_while_revalidate");
            }else if(pwa_assets.includes(url.pathname)){
                return response_and_store_cache(e, "pwa_cache", "stale_while_revalidate");
            }
    }
});

function get_pre_cached(e) {
    e.respondWith(caches.open(asset_cache)
        .then((cache) => {
            return cache.match(e.request.url);
        })
    );
}

const response_and_store_cache = (e, cache_name, strategy) => {
    e.respondWith(caches.open(cache_name)
        .then((cache) => cache.match(e.request)
            .then((cachedResponse) => {

                function PreFetchedResponse(e) {
                    return fetch(e.request)
                        .then(async (fetchedResponse) => {
                            // if in same url then cache
                            let url = new URL(e.request.url);
                            if (url.origin === location.origin && e.request.method === "GET") {
                                await cache.put(e.request, fetchedResponse.clone());
                            } else {
                                // if (api_caches.includes(url.pathname)){
                                //     cache.put(e.request, fetchedResponse.clone());
                                // }
                            }
                            return fetchedResponse;
                        });
                }

                if (strategy === "stale_while_revalidate" && navigator.onLine) {
                    var pre_response = PreFetchedResponse(e);
                    return cachedResponse || pre_response;
                }

                if (cachedResponse) {
                    return cachedResponse;
                }

                return PreFetchedResponse(e);
            }))
    );
    return
}

async function post_data() {
    var offline_cell_data = JSON.parse(await localforage.getItem("offline_cell_data"));
    var token = await localforage.getItem("token");

    offline_cell_data.forEach(async function(data) {
        let res = await fetch('/api/v1/report/set-report-col-data', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer "+token,
            },
            body: JSON.stringify(data),
        })

        let resdata = await res.json();
        console.log(resdata);
    });
}

self.addEventListener('sync', event => {

    let report_saved_offline = "report_saved_offline"
    if (event.tag === report_saved_offline) {
        event.waitUntil((async () => {
            await post_data();
            await localforage.removeItem("offline_cell_data");

            // Let the user know, if they granted permissions before.
            self.registration.showNotification(`Your data is submitted`, {
                icon: '/logo.png',
                body: 'You can access the data in the app',
                actions: [
                    {
                        action: 'view-results',
                        title: 'Open app'
                    }
                ]
            });
        })());
    }
});


// Respond to a server push with a user notification.
self.addEventListener('push', function (event) {
    if (Notification.permission === "granted") {
        const notificationText = event.data.text();
        const showNotification = self.registration.showNotification('Sample PWA', {
            body: notificationText,
            icon: '/logo.png'
        });
        // Make sure the toast notification is displayed.
        event.waitUntil(showNotification);
    }
});

// Respond to the user selecting the toast notification.
self.addEventListener('notificationclick', function (event) {
    console.log('On notification click: ', event.notification.tag);
    event.notification.close();

    // Display the current notification if it is already open, and then put focus on it.
    event.waitUntil(clients.matchAll({
        type: 'window'
    }).then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == 'http://127.0.0.1:8000/' && 'focus' in client)
                return client.focus();
        }
        if (clients.openWindow)
            return clients.openWindow('/');
    }));
});

async function getDemoData() {
    let res = await fetch("/api/demodata");
    let data = await res.json();
    console.log(data);
    let saved_data = await localforage.getItem('periodic_demo_data');
    if (!saved_data) {
        saved_data = [];
    } else {
        saved_data = JSON.parse(saved_data);
    }
    saved_data.push(data);
    await localforage.setItem("periodic_demo_data", JSON.stringify(saved_data));

    const cache = await caches.open('periodic_demo_data');
    await cache.put('/api/demodata', new Response(JSON.stringify(data)));
}

self.addEventListener('periodicsync', event => {
    console.log(event.tag);
    if (event.tag === 'get-daily-news') {
        event.waitUntil(getDemoData());
    }
});
