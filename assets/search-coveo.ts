let $ = document.querySelector.bind(document);
let coveo = window.Coveo

function loadCustomSearchBox() {
  let element = $('#DocsSearch--input') || $('#SiteSearch--input');  
  const CustomSearchbox = (function(_super) {
    __extends(CustomSearchbox, coveo.Component);
    function CustomSearchbox(element, options, bindings) {
      _super.call(this, element, CustomSearchbox.ID, bindings);
      this.type = 'CustomSearchBox';
      coveo.Component.bindComponentToElement(element, this);
      this.element = element;
      this.options = coveo.ComponentOptions.initComponentOptions(element, CustomSearchbox, options);
      this.bindings = bindings;
      this.element.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }
    CustomSearchbox.prototype.handleKeyUp = function(e) {
      if (this.options.searchAsYouType) {
        this.executeNewQuery();
      } else if (e.key == 'Enter') {
        this.executeNewQuery();
      }
    }
    CustomSearchbox.prototype.executeNewQuery = function() {
      this.bindings.queryStateModel.set('q', this.element.value);
      //this.bindings.usageAnalytics.logSearchEvent({
      //  name: 'submitSearchbox',
      //  type: 'CustomSearchbox'
      //});
      this.bindings.queryController.executeQuery();
    }
    CustomSearchbox.options = {
      searchAsYouType: coveo.ComponentOptions.buildBooleanOption({ defaultValue: false })
    }
    CustomSearchbox.ID = "CustomSearchBox";
    coveo.Initialization.registerAutoCreateComponent(CustomSearchbox);
  })(coveo.Component);

  coveo.SearchEndpoint.configureCloudEndpoint('cloudflarenonproduction1bqz82hwh', 'xx59d99d0b-6982-495a-b1b9-ec1947377046');
  coveo.initSearchbox($('.CoveoSearchInterface'), "/search")

  addEventListener('keydown', ev => {
    if (ev.target === element) return;

    let key = ev.which;

    // is '/' or SHIFT+'s'
    if (key === 191 || (ev.shiftKey && key === 83)) {
      ev.preventDefault();
      window.scrollTo(0, 0);
      element.focus();
    }
  });
}

function loadSearchResults() {
  // The following line shows you how you could configure an endpoint against which to perform your search.
  coveo.SearchEndpoint.configureCloudEndpoint('cloudflarenonproduction1bqz82hwh', 'xx59d99d0b-6982-495a-b1b9-ec1947377046');

  // Initialize the framework by targeting the root in the interface.
  // It does not have to be the document body.
  coveo.init(document.getElementById('searchresults'));
}

// init
(function load() {
  if (window.location.pathname.startsWith("/search")) {
    loadSearchResults();
  } else {
    loadCustomSearchBox();
  }
})();
