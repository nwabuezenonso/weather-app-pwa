//cache stand for the storage of the browser
const CACHE_NAME = "version-1";
//this variable represent the page when the app has no internet connection
const urlsToCache = [ 'index.html', 'offline.html']

//this refer to the service worker
const self = this;

// install sw
self.addEventListener('install', (event) => {
    //open the cache and add file to it
        event.waitUntil(
            //wait until the cache is open and add a name
            caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('opened cache')

                //return the file to the cache
                return cache.addAll(urlsToCache)
            })
        )
});

//listen for request
self.addEventListener('fetch', (event) => {
    //after listening to event we respond with
    event.respondWith(
        //match all the request that our page is saving
        caches.match(event.request)
            //returns a then
            .then(()=> {
                //fetch all the request that are matched
                return fetch(event.request)
                //if it cannot fetch all the request then we get the offline.html
                .catch(()=> caches.match('offline.html'))
            })
    )
});

//activate the sw
self.addEventListener('activate', (event) => {
    //here we are remove the previous cache and keep the new ones
    const cacheWhitelist = [];

    //push the things th we want to keep
    cacheWhitelist.push(CACHE_NAME)

    //wait until we key
    event.waitUntil(
        //return a promise.all
        caches.keys().then((cacheNames) => Promise.all(
        //loopp through the cache names
         cacheNames.map((cacheName) => {
             //if the cachewhitelist does not include cache name then delete that specific cacheName
            if(!cacheWhitelist.includes(cacheName)){
                return caches.delete(cacheName);
            }
         })
        ))
    )
});