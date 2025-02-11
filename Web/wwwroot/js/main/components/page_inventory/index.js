define(["knockout", "text!./index.html"], function (ko, template) {

    function ViewModel(params) {
        var self = this;
        self.root = params.root;
        self.router = params.router;
    }

    

    return { viewModel: ViewModel, template: template };
});