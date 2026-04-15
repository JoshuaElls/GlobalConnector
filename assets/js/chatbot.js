(function () {

  // ============================================================
  //  GII CHAT BOT — ROUTING CONFIGURATION
  //  This is the only place you need to edit to update routing.
  //  Change emails here and they apply instantly across the site.
  // ============================================================
  var CONFIG = {
    routes: {
      engineer: {
        email:   'jbates@globalinterconnect.com',
        subject: 'Engineering Inquiry — via Gii Website',
        reply:   "Great — our engineering team loves a good technical challenge. Send us your specs or current connector setup and we'll show you exactly where the savings are.",
        actions: [
          { label: 'Email Our Engineering Team', primary: true,  type: 'email' },
          { label: 'View Capabilities',          primary: false, href: 'capabilities.html' },
        ]
      },
      newProgram: {
        email:   'jbates@globalinterconnect.com',
        subject: 'New Program Inquiry — via Gii Website',
        reply:   "Let's get you connected with the right person. We can usually turn around a preliminary assessment within 48 hours.",
        actions: [
          { label: 'Start the Conversation', primary: true,  type: 'email' },
          { label: 'See Our Work',           primary: false, href: 'insights.html' },
        ]
      },
      existingClient: {
        email:   'jbates@globalinterconnect.com',
        subject: 'Client Support Request — via Gii Website',
        reply:   "Of course — let's get you to the right person quickly.",
        actions: [
          { label: 'Contact Your Rep', primary: true, type: 'email' },
        ]
      }
    },
    greeting: "Hi there \uD83D\uDC4B What brings you to Gii today?",
  };
  // ============================================================


  // ============================================================
  //  STYLES — injected automatically, no separate CSS file needed
  // ============================================================
  var CSS = [
    '#gii-widget * { box-sizing: border-box; font-family: Inter, sans-serif; margin: 0; padding: 0; }',

    /* Bubble */
    '#gii-bubble {',
    '  position: fixed; bottom: 28px; right: 28px;',
    '  width: 58px; height: 58px; border-radius: 50%;',
    '  background: #1a472a;',
    '  display: flex; align-items: center; justify-content: center;',
    '  cursor: pointer; z-index: 9999;',
    '  box-shadow: 0 4px 20px rgba(0,0,0,0.28);',
    '  transition: transform 0.2s, background 0.2s;',
    '}',
    '#gii-bubble:hover { background: #2d6e47; transform: scale(1.07); }',
    '#gii-bubble svg { width: 27px; height: 27px; fill: #fff; }',

    /* Notification dot */
    '#gii-dot {',
    '  position: absolute; top: 3px; right: 3px;',
    '  width: 12px; height: 12px; border-radius: 50%;',
    '  background: #8BC342; border: 2px solid #fff;',
    '}',

    /* Panel */
    '#gii-panel {',
    '  position: fixed; bottom: 100px; right: 28px;',
    '  width: 320px; max-height: 500px;',
    '  background: #fff; border-radius: 18px;',
    '  box-shadow: 0 10px 48px rgba(0,0,0,0.18);',
    '  display: flex; flex-direction: column;',
    '  overflow: hidden; z-index: 9998;',
    '  opacity: 0; pointer-events: none;',
    '  transform: translateY(12px);',
    '  transition: opacity 0.22s ease, transform 0.22s ease;',
    '}',
    '#gii-panel.gii-open { opacity: 1; pointer-events: auto; transform: translateY(0); }',

    /* Header */
    '#gii-header {',
    '  background: #1a472a; color: #fff;',
    '  padding: 14px 16px;',
    '  display: flex; align-items: center; gap: 10px; flex-shrink: 0;',
    '}',
    '#gii-avatar {',
    '  width: 38px; height: 38px; border-radius: 50%;',
    '  background: #8BC342;',
    '  display: flex; align-items: center; justify-content: center;',
    '  font-weight: 700; font-size: 15px; color: #fff; flex-shrink: 0;',
    '}',
    '#gii-header-text { flex: 1; }',
    '#gii-header-text strong { display: block; font-size: 14px; }',
    '#gii-header-text span { font-size: 12px; opacity: 0.75; }',
    '#gii-close {',
    '  background: none; border: none; color: #fff;',
    '  font-size: 22px; line-height: 1; cursor: pointer; opacity: 0.65;',
    '  transition: opacity 0.15s;',
    '}',
    '#gii-close:hover { opacity: 1; }',

    /* Message area */
    '#gii-body {',
    '  flex: 1; overflow-y: auto; padding: 16px;',
    '  display: flex; flex-direction: column; gap: 10px;',
    '}',

    /* Messages */
    '.gii-msg {',
    '  max-width: 88%; padding: 10px 14px;',
    '  border-radius: 16px; font-size: 13.5px; line-height: 1.55;',
    '}',
    '.gii-msg.bot  { background: #f1f4f1; color: #1a1a1a; border-bottom-left-radius: 4px; align-self: flex-start; }',
    '.gii-msg.user { background: #1a472a; color: #fff;    border-bottom-right-radius: 4px; align-self: flex-end; }',

    /* Option buttons */
    '.gii-options { display: flex; flex-direction: column; gap: 7px; }',
    '.gii-opt {',
    '  background: #fff; border: 1.5px solid #1a472a; color: #1a472a;',
    '  border-radius: 20px; padding: 8px 14px; font-size: 13px;',
    '  text-align: left; cursor: pointer; transition: background 0.15s, color 0.15s;',
    '  font-family: Inter, sans-serif;',
    '}',
    '.gii-opt:hover { background: #1a472a; color: #fff; }',

    /* Action buttons */
    '.gii-actions { display: flex; flex-wrap: wrap; gap: 8px; }',
    '.gii-action {',
    '  display: inline-block; border-radius: 20px;',
    '  padding: 9px 16px; font-size: 13px; font-weight: 600;',
    '  text-decoration: none; cursor: pointer; border: 1.5px solid transparent;',
    '  transition: background 0.15s, color 0.15s;',
    '  font-family: Inter, sans-serif;',
    '}',
    '.gii-action.primary { background: #8BC342; color: #fff; border-color: #8BC342; }',
    '.gii-action.primary:hover { background: #7aad35; border-color: #7aad35; }',
    '.gii-action.secondary { background: #fff; color: #1a472a; border-color: #1a472a; }',
    '.gii-action.secondary:hover { background: #f1f4f1; }',

    /* Mobile */
    '@media (max-width: 400px) {',
    '  #gii-panel { right: 12px; left: 12px; width: auto; bottom: 88px; }',
    '  #gii-bubble { right: 16px; bottom: 16px; }',
    '}',
  ].join('\n');


  // ============================================================
  //  HELPERS
  // ============================================================
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  function scrollBottom(container) {
    container.scrollTop = container.scrollHeight;
  }


  // ============================================================
  //  INIT
  // ============================================================
  function init() {

    // Inject CSS
    var styleTag = document.createElement('style');
    styleTag.textContent = CSS;
    document.head.appendChild(styleTag);

    // Build widget HTML
    var widget = el('div');
    widget.id = 'gii-widget';
    widget.innerHTML =
      '<div id="gii-bubble" role="button" aria-label="Chat with us" tabindex="0">' +
        '<svg viewBox="0 0 24 24"><path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>' +
        '<div id="gii-dot"></div>' +
      '</div>' +
      '<div id="gii-panel" role="dialog" aria-label="Chat">' +
        '<div id="gii-header">' +
          '<div id="gii-avatar">G</div>' +
          '<div id="gii-header-text">' +
            '<strong>Global Interconnect</strong>' +
            '<span>Typically replies within the hour</span>' +
          '</div>' +
          '<button id="gii-close" aria-label="Close chat">\u00D7</button>' +
        '</div>' +
        '<div id="gii-body"></div>' +
      '</div>';

    document.body.appendChild(widget);

    var bubble  = document.getElementById('gii-bubble');
    var panel   = document.getElementById('gii-panel');
    var body    = document.getElementById('gii-body');
    var closeBtn = document.getElementById('gii-close');
    var dot     = document.getElementById('gii-dot');
    var started = false;

    // --- open / close ---
    function openPanel() {
      panel.classList.add('gii-open');
      dot.style.display = 'none';
      if (!started) {
        started = true;
        setTimeout(function () { addBotMsg(CONFIG.greeting); }, 250);
        setTimeout(showOptions, 950);
      }
    }

    function closePanel() {
      panel.classList.remove('gii-open');
    }

    bubble.addEventListener('click', function () {
      panel.classList.contains('gii-open') ? closePanel() : openPanel();
    });
    bubble.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') openPanel();
    });
    closeBtn.addEventListener('click', closePanel);

    // --- messages ---
    function addBotMsg(text) {
      var m = el('div', 'gii-msg bot', text);
      body.appendChild(m);
      scrollBottom(body);
    }

    function addUserMsg(text) {
      var m = el('div', 'gii-msg user', text);
      body.appendChild(m);
      scrollBottom(body);
    }

    // --- option buttons ---
    function showOptions() {
      var wrap = el('div', 'gii-options');
      var choices = [
        { key: 'engineer',       label: "I'm an engineer evaluating suppliers" },
        { key: 'newProgram',     label: "I'm working on a new program / need a quote" },
        { key: 'existingClient', label: "I'm an existing client with a question" },
      ];
      choices.forEach(function (c) {
        var btn = el('button', 'gii-opt', c.label);
        btn.addEventListener('click', function () {
          wrap.remove();
          handleChoice(c.key, c.label);
        });
        wrap.appendChild(btn);
      });
      body.appendChild(wrap);
      scrollBottom(body);
    }

    // --- handle a choice ---
    function handleChoice(key, label) {
      addUserMsg(label);
      var route = CONFIG.routes[key];
      setTimeout(function () {
        addBotMsg(route.reply);
        setTimeout(function () {
          showActions(route);
        }, 400);
      }, 650);
    }

    // --- action buttons ---
    function showActions(route) {
      var wrap = el('div', 'gii-actions');
      route.actions.forEach(function (action) {
        var a = document.createElement('a');
        a.className = 'gii-action ' + (action.primary ? 'primary' : 'secondary');
        a.textContent = action.label;
        if (action.type === 'email') {
          a.href = 'mailto:' + route.email + '?subject=' + encodeURIComponent(route.subject);
        } else {
          a.href = action.href;
        }
        wrap.appendChild(a);
      });
      body.appendChild(wrap);
      scrollBottom(body);
    }

  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
