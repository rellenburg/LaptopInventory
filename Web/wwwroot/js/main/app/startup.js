define(['knockout', 'app/router', 'app/bindings'], function (ko, router) {

    var rootViewmodel,
        tokenKey = 'accessToken',
        waitTimer;

    // Components can be packaged as AMD modules, such as the following:
    ko.components.register('inventory', { require: 'components/page_inventory/index', synchronous: true });
    ko.components.register('inventoryItem', { require: 'components/page_inventoryItem/index', synchronous: true });
    //modal sections


    // ... or for template-only components, you can just point to a .html file directly:
    ko.components.register('safePlace', {
        template: { require: 'text!components/page_safePlace/index.html' }
    });

    // root viewmodel
    var rootViewmodel = function () {
        var self = this;

        self.isWaiting = ko.observable();
        self.waitMessage = ko.observable();

        self.confirmModal = {
            element: document.getElementById('confirmModal'),
            title: ko.observable(),
            message: ko.observable(),
            ok: ko.observable(),
            cancel: ko.observable(),
            show: function (title, message, ok, cancel, okCallback) {
                console.log(title, message, ok, cancel);
                self.confirmModal.title(title);
                self.confirmModal.message(message);
                self.confirmModal.ok(ok);
                self.confirmModal.cancel(cancel);
                self.confirmModal.okCallback = function () {
                    okCallback();
                    self.confirmModal.hide();
                };
                self.confirmModal.element.showModal();
            },
            hide: function () {
                self.confirmModal.element.close();
            }
        };

        self.alertModal = {
            element: document.getElementById('alertModal'),
            title: ko.observable(),
            message: ko.observable(),
            close: ko.observable(),
            show: function (title, message, close) {
                self.alertModal.title(title);
                self.alertModal.message(message);
                self.alertModal.close(close || 'OK');
                self.alertModal.element.showModal();
            },
            hide: function () {
                self.alertModal.element.close();
            }
        };
    };

    rootViewmodel.prototype.showWaitScreen = function (message, wait) {
        var self = this;
        console.log('wait', message, wait);
        clearTimeout(waitTimer);
        self.waitMessage(message || '');
        waitTimer = setTimeout(function () { self.isWaiting(true) }, wait || 1000);
    };

    rootViewmodel.prototype.hideWaitScreen = function () {
        var self = this;
        clearTimeout(waitTimer);
        self.isWaiting(false);
    };
    console.log(router);
    // Start the application
    ko.applyBindings({ router: router, root: new rootViewmodel() });

});