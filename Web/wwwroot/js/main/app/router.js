define(['knockout', 'rlite'], function (ko, RLite) {

    function Router() {
        var router = RLite(),
            self = this;

        self.previousRoute = '';
        self.currentRoute = {
            page: ko.observable(false),
            params: {}
        };
        self.navigate = function (hash) {
            location.hash = hash;
        };

        //The are added to react to hash changes
        //Loads page based on route
        router.add('', function (r) {
            self.currentRoute.page('inventory');
            self.currentRoute.params = r.params;
        });
        //loads the item component and passes the item parameter
        // to the component
        router.add('inventory/:inventoryId', function (r) {
            self.currentRoute.page('inventoryItem');
            self.currentRoute.params = r.params;
        });

        // ---- end routes -----------------------

        (function (namespace) { // Closure to protect local variable "var hash"
            if ('replaceState' in history) { // Yay, supported!
                namespace.replaceHash = function (newhash) {
                    if (('' + newhash).charAt(0) !== '#') newhash = '#' + newhash;
                    history.replaceState('', '', newhash);
                }
            } else {
                var hash = location.hash;
                namespace.replaceHash = function (newhash) {
                    if (location.hash !== hash) history.back();
                    location.hash = newhash;
                };
            }
        })(self);

        processHash();
        function processHash() {
            var hash = location.hash || '#';
            router.run(hash.slice(1));
            self.previousRoute = hash.slice(1);
        }
        window.addEventListener('hashchange', processHash);
    }
    return new Router();
});

