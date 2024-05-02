var registration = null;
var pwa_services = null;

pwa_services = {
    clear_after_10m: async () => {
        let last_active = localStorage.getItem("last_active");
        const date1 = last_active ? new Date(last_active) : new Date();
        const date2 = new Date();
        const timeDifference = date2.getTime() - date1.getTime();
        const minutesDifference = timeDifference / (60 * 1000);
        localStorage.setItem("last_active", new Date().toLocaleString());

        let time_diff_min = 24*60;
        if (minutesDifference >= time_diff_min && navigator.onLine) {
            await caches.keys().then(function (cacheNames) {
                return Promise.all(
                    cacheNames.filter(function (cacheName) {
                        return cacheName;
                    }).map(function (cacheName) {
                        return caches.delete(cacheName);
                    })
                );
            });

            await navigator.serviceWorker.getRegistrations()
                .then(registrations => {
                    registrations.forEach(registration => {
                        registration.unregister();
                    })
                })

            window.location.reload();
        }
    },
    get_permission: async (query) => {
        let result = await navigator.permissions.query({ name: query });
        return result.state === "granted" ? true : false;
    },
    register_periodic_sync: async (sync_tag) => {
        await registration.periodicSync.register(sync_tag, {
            minInterval: 5000
        });
    },
    register_sync: async (sync_tag) => {
        await registration.sync.register(sync_tag);
        console.log('data store offline');
    },
    get_notification_permission: async () => {
        let result = await Notification.requestPermission();
        return result.state === "granted" ? true : false;
    },
    push_manager_setup: async () => {
        let subscription = await registration.pushManager.getSubscription()
        if (subscription) {
            return subscription;
        }
        const vapidPublicKey = "BBk3lGs8tjSTkK1wmxpn43wQ8xUy63lTJ1KjLLetGjk4VEp4MJH7C-_qkwKFE6lxj6LkkofCAsBGNcO_hZJR3vQ";
        return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
        });

        // Utility function for browser interoperability
        function urlBase64ToUint8Array(base64String) {
            var padding = '='.repeat((4 - base64String.length % 4) % 4);
            var base64 = (base64String + padding)
                .replace(/\-/g, '+')
                .replace(/_/g, '/');

            var rawData = window.atob(base64);
            var outputArray = new Uint8Array(rawData.length);

            for (var i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        }
    },
};

var deferredPrompt;
window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
});

function install_app() {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((chioceResult) => {
        if (chioceResult.outcome === 'accepted') {
            console.log('app installed');
        } else {
            console.log('user rejected to install');
        }
    })
}

window.onload = async () => {
    'use strict';

    if ('serviceWorker' in navigator) {
        registration = await navigator.serviceWorker.register('/sw.js');
        await pwa_services.clear_after_10m();

        let periodic_permission = await pwa_services.get_permission('periodic-background-sync');
        // if (periodic_permission) {
        //     await pwa_services.register_periodic_sync('get-daily-news');
        // }

        let get_notification_permission = await pwa_services.get_notification_permission();
        // if (get_notification_permission) {
        //     await pwa_services.push_manager_setup();
        // }
    } else {
        console.log('service worker not supported.');
    }
}


