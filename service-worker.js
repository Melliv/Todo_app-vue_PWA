importScripts("/Todo_app-vue_PWA/precache-manifest.3698b4d1b51ee15573e6ea07a754321f.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.__precacheManifest = [].concat(self.__precacheManifest || []);
// eslint-disable-next-line no-undef
workbox.precaching.suppressWarnings();
// eslint-disable-next-line no-undef
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
// eslint-disable-next-line no-undef
workbox.routing.registerRoute('https://taltech.akaver.com/api/v1/TodoTasks', ({url, event, params}) => {
    return fetch(event.request)
        .then(response => {
            let clonedResponse = response.clone();
            clonedResponse.json().then( body => {
                self.idb.openDb('VueApp', 1).then(db => {
                    db.transaction('todos', "readwrite")
                        .objectStore('todos').put(body);
                });
            });
            return response;
        }).catch(err => {
            return self.idb.openDb('VueApp', 1).then(db => {
                return db.transaction('todos')
                    .objectStore('todos').getAll()
                    .then(values =>
                        new Response(JSON.stringify(values),
                            { "status" : 200 ,
                                "statusText" : "Error!" }));
            });
        });
});

// eslint-disable-next-line no-undef
workbox.routing.registerRoute('https://taltech.akaver.com/api/v1/TodoCategories', ({url, event, params}) => {
    return fetch(event.request)
        .then(response => {
            let clonedResponse = response.clone();
            clonedResponse.json().then( body => {
                self.idb.openDb('VueApp', 1).then(db => {
                    db.transaction('categories', "readwrite")
                        .objectStore('category').put(body);
                });
            });
            return response;
        }).catch(err => {
            return self.idb.openDb('VueApp', 1).then(db => {
                return db.transaction('categories')
                    .objectStore('categories').getAll()
                    .then(values =>
                        new Response(JSON.stringify(values),
                            { "status" : 200 ,
                                "statusText" : "Error!" }));
            });
        });
});
