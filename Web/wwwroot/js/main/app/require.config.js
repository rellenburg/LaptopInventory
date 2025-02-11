var require = {
    baseUrl: "/js/main", // Set the base directory for modules
    urlArgs: "appVersion=2-10-2025",
    paths: {        
        'jquery' : '/js/jquery-3.7.1.min',
        "knockout": "/js/knockout.min",
        "text": "/js/require-text", // For loading HTML templates
        "rlite": "/js/rlite.min",
        "axios": "/js/axios.min"
    },
    // this is where you define dependencies for the above module.
    // Example: if library A depends on library B, we need to load B first,
    // so we define a dependency: 'libraryA': { deps: ['libraryB'] }. Library A and B 
    // will need to be defined in PATHS above
    shims: {

    }
};