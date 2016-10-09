// Create an immediately invoked functional expression to wrap our code
(function() {

  // Define our constructor 
  this.manuAlert = function() 
  {
    // Create global element references
    this.closeButton = null;
    this.modal = null;
    this.overlay = null;
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
      content: "",
      maxWidth: 600,
      minWidth: 280,
      overlay: true
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

    this.modal.className   = this.modal.className.replace(" manu-opened", "");
    this.overlay.className = this.overlay.className.replace(" manu-opened", "");
    this.body.className = "";

    setTimeout(function() 
    {
        _.modal.parentNode.removeChild(_.modal);
        _.overlay.parentNode.removeChild(_.overlay);
    }, 450);

  }
  manuAlert.prototype.open = function() 
  {
    mpBuildOut.call(this);

    mpInitializeEvents.call(this);

    window.getComputedStyle(this.modal);

    this.modal.className = this.modal.className + (this.modal.offsetHeight > window.innerHeight ? " manu-opened manu-anchored" : " manu-opened");

    this.overlay.className = this.overlay.className + " manu-opened";

    this.body.className = "stop-scrolling";
  }

  // Private Methods
  function mpBuildOut() 
  {
    var lContent, 
        lContentHolder, 
        lDocumentFrag;
    /*
     * If content is an HTML string, append the HTML string.
     * If content is a domNode, append its content.
     */

    this.body = document.body;

    if (typeof this.options.content === "string") 
    {
      lContent = this.options.content;
    } 
    else 
    {
      lContent = this.options.content.innerHTML;
    }

    // Create a DocumentFragment to build with
    lDocumentFrag = document.createDocumentFragment();

    // Create modal element
    this.modal = document.createElement("div");
    this.modal.className = "manu-alert " + this.options.className;
    this.modal.style.minWidth = this.options.minWidth + "px";
    this.modal.style.maxWidth = this.options.maxWidth + "px";

    // If closeButton option is true, add a close button
    if (this.options.closeButton === true) 
    {
      this.closeButton = document.createElement("button");
      this.closeButton.className = "manu-close";
      this.closeButton.innerHTML = "&times;";
      this.modal.appendChild(this.closeButton);
    }

    // If overlay is true, add one
    if (this.options.overlay === true) 
    {
      this.overlay = document.createElement("div");
      this.overlay.className = "manu-overlay " + this.options.className;
      lDocumentFrag.appendChild(this.overlay);
    }

    // Create content area and append to modal
    lContentHolder = document.createElement("div");
    lContentHolder.className = "manu-content";
    lContentHolder.innerHTML = lContent;
    this.modal.appendChild(lContentHolder);

    // Append modal to DocumentFragment
    lDocumentFrag.appendChild(this.modal);

    // Append DocumentFragment to body
    document.body.appendChild(lDocumentFrag);
  }
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

    if (this.overlay) 
    {
      if (this.options.allowOutsideClick === true) 
      {
        this.overlay.addEventListener('click', this.close.bind(this));
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