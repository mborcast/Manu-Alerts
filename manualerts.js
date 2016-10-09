// Create an immediately invoked functional expression to wrap our code
(function() {

  // Define our constructor 
  this.manuAlert = function() 
  {
    // Create global element references
    this.closeButton = null;
    this.alertModal = null;
    this.title = null;
    this.text = null;
    this.alertOverlay = null;
    this.body = null;

    // Determine proper prefix
    this.transitionEnd = mfTransitionSelect();

    // Define option defaults 
    var defaults = 
    {
      autoOpen: false,
      allowOutsideClick: false,
      className: 'fade-and-pop',
      closeButton: true,
      maxWidth: 600,
      minWidth: 280,
      text: "",
      title: ""
    }

    // Create options by extending defaults with the passed in arugments
    if (arguments[0] && typeof arguments[0] === "object") 
      this.options = mfExtendDefaults(defaults, arguments[0]);

    if(this.options.autoOpen === true) 
      this.open();

  }

  // Public Methods
  manuAlert.prototype.close = function() 
  {
    var _ = this;

    this.alertModal.className   = this.alertModal.className.replace(" manu-opened", "");
    this.alertOverlay.className = this.alertOverlay.className.replace(" manu-opened", "");
    this.body.className = "";

    setTimeout(function() 
    {
        _.alertModal.parentNode.removeChild(_.alertModal);
        _.alertOverlay.parentNode.removeChild(_.alertOverlay);
    }, 450);
  }

  manuAlert.prototype.open = function() 
  {
    mpBuildOut.call(this);

    mpInitializeEvents.call(this);

    window.getComputedStyle(this.alertModal);

    this.alertModal.className = this.alertModal.className + (this.alertModal.offsetHeight > window.innerHeight ? " manu-opened manu-anchored" : " manu-opened");

    this.alertOverlay.className = this.alertOverlay.className + " manu-opened";

    this.body.className = "stop-scrolling";
  }

  // Private Methods
  function mpBuildOut() 
  {
    var lContentHolder, 
        lDocumentFrag;

    this.body = document.body;

    // Create a DocumentFragment to build with
    lDocumentFrag = document.createDocumentFragment();

    // Create alert modal div
    this.alertModal = document.createElement("div");

    this.alertModal.className = "manu-alert " + this.options.className;
    this.alertModal.style.minWidth = this.options.minWidth + "px";
    this.alertModal.style.maxWidth = this.options.maxWidth + "px";

    // Create overlay div
    this.alertOverlay = document.createElement("div");
    this.alertOverlay.className = "manu-overlay " + this.options.className;

    lDocumentFrag.appendChild(this.alertOverlay);

    // Create closeButton
    if (this.options.closeButton === true) 
    {
      this.closeButton = document.createElement("button");
      this.closeButton.className = "manu-close";
      this.closeButton.innerHTML = "&times;";

      this.alertModal.appendChild(this.closeButton);
    }

    // Create content area
    lContentHolder = document.createElement("div");
    lContentHolder.className = "manu-content";

    if (this.options.title)
    {
      this.title = document.createElement("h2");

      this.title.className = "manu-title";
      this.title.innerHTML = mfEscapeHtml(this.options.title);

      lContentHolder.appendChild(this.title);
    }

    if (this.options.text)
    {
      this.text = document.createElement("p");

      this.text.className = "manu-text";
      this.text.innerHTML = mfEscapeHtml(this.options.text);

      lContentHolder.appendChild(this.text);
    }

    this.alertModal.appendChild(lContentHolder);

    // Append modal to DocumentFragment
    lDocumentFrag.appendChild(this.alertModal);

    // Append DocumentFragment to body
    document.body.appendChild(lDocumentFrag);
  }

  function mfEscapeHtml(pString) 
  {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(pString));
    return div.innerHTML;
  };
  function mfExtendDefaults(source, properties) 
  {
    var property;
    for (property in properties)
    {
      if (properties.hasOwnProperty(property)) 
      {
        source[property] = properties[property];
      }
    }
    return source;
  }
  function mpInitializeEvents() 
  {
    if (this.closeButton) 
    {
      this.closeButton.addEventListener('click', this.close.bind(this));
    }

    if (this.alertOverlay) 
    {
      if (this.options.allowOutsideClick === true) 
      {
        this.alertOverlay.addEventListener('click', this.close.bind(this));
      }
    }
  }
  function mfTransitionSelect() 
  {
    var el = document.createElement("div");
    if (el.style.WebkitTransition) return "webkitTransitionEnd";
    if (el.style.OTransition) return "oTransitionEnd";
    return 'transitionend';
  }

}());