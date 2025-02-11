define(["knockout", "jquery", "text!./index.html"], function (ko, $, template) {

    function ViewModel(params) {
        var self = this;
        self.root = params.root;
        self.router = params.router;

        self.laptop = {
            assetTag: ko.observable(self.router.currentRoute.params.assetTag),
            manufacturer: ko.observable(),
            serviceTag: ko.observable(),
            computerName: ko.observable()
        };

        function init() {
            self.root.showWaitScreen(null, 1);
            getLaptop(self.laptop.assetTag())
                .done(function (response) {
                    self.laptop.manufacturer(response.laptop.manufacturer);
                    self.laptop.serviceTag(response.laptop.serviceTag);
                    self.laptop.computerName(response.laptop.computerName);
                })
                .always(function () {
                    self.root.hideWaitScreen();
                });           
        }
        init();
    }

    //API calls
    // This is jQuery - can use Axios if you want
    function getLaptop(assetTag) {
        var url = location.origin + '/api/inventory/getLaptop',
            headers = {},
            params = assetTag;

        return $.ajax({
            type: 'POST',
            url: url,
            dataType: 'json',
            data: ko.toJSON(params),
            contentType: 'application/json',
            headers: headers
        });
    }    

    return { viewModel: ViewModel, template: template };
});