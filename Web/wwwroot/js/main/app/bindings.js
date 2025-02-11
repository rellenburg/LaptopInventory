define(['knockout', 'jquery'], function (ko, $) {
    // Handles page transitions
    ko.bindingHandlers.transitionComponent = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = valueAccessor(),
                componentName = value.name,
                $mainContainer = $(element);
            $mainContainer.hide();
            // create a new observable so we can delay the moment ko's component 
            // binding builds the new component
            var actualComponentName = ko.observable(componentName());
            componentName.subscribe(function (newComponent) {
                console.log(newComponent);
                $mainContainer.fadeOut(100, function () {
                    actualComponentName(newComponent);
                });
            });
            ko.bindingHandlers.component.init(element, function () {
                $mainContainer.delay(400).fadeIn(400);
                return { name: actualComponentName, params: value.params };
            }, allBindings, viewModel, bindingContext);
        }
    };
});