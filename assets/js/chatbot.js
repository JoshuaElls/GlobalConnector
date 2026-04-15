(function () {

  // ============================================================
  //  GII CHAT BOT — ROUTING CONFIGURATION
  //  This is the only place you need to edit to update routing.
  //  Change emails here and they apply instantly across the site.
  // ============================================================
  var CONFIG = {
    autoOpenDelay: 1800, // milliseconds before chat opens automatically (0 to disable)
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


  var CSS = [
    '#gii-widget * { box-sizing: border-box; font-family: Inter, -apple-system, sans-serif; margin: 0; padding: 0; }',

    /* Bubble */
    '#gii-bubble {',
    '  position: fixed; bottom: 28px; right: 28px;',
    '  width: 60px; height: 60px; border-radius: 50%;',
    '  background: linear-gradient(135deg, #1a472a 0%, #2d6e47 100%);',
    '  display: flex; align-items: center; justify-content: center;',
    '  cursor: pointer; z-index: 9999;',
    '  box-shadow: 0 6px 24px rgba(26,71,42,0.45);',
    '  transition: transform 0.2s ease, box-shadow 0.2s ease;',
    '}',
    '#gii-bubble:hover { transform: scale(1.08); box-shadow: 0 8px 32px rgba(26,71,42,0.55); }',
    '#gii-bubble svg { width: 26px; height: 26px; fill: #fff; transition: opacity 0.2s; }',
    '#gii-bubble .icon-chat { opacity: 1; position: absolute; }',
    '#gii-bubble .icon-close { opacity: 0; position: absolute; }',
    '#gii-bubble.gii-open .icon-chat { opacity: 0; }',
    '#gii-bubble.gii-open .icon-close { opacity: 1; }',

    /* Dot */
    '#gii-dot {',
    '  position: absolute; top: 2px; right: 2px;',
    '  width: 14px; height: 14px; border-radius: 50%;',
    '  background: #8BC342; border: 2px solid #fff;',
    '  transition: opacity 0.3s;',
    '}',

    /* Panel */
    '#gii-panel {',
    '  position: fixed; bottom: 102px; right: 28px;',
    '  width: 340px;',
    '  background: #fff; border-radius: 20px;',
    '  box-shadow: 0 16px 56px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08);',
    '  display: flex; flex-direction: column;',
    '  overflow: hidden; z-index: 9998;',
    '  opacity: 0; pointer-events: none;',
    '  transform: translateY(16px) scale(0.97);',
    '  transform-origin: bottom right;',
    '  transition: opacity 0.25s ease, transform 0.25s ease;',
    '}',
    '#gii-panel.gii-open { opacity: 1; pointer-events: auto; transform: translateY(0) scale(1); }',

    /* Header */
    '#gii-header {',
    '  background: linear-gradient(135deg, #1a3d26 0%, #1a472a 100%);',
    '  padding: 16px 18px 14px;',
    '  display: flex; align-items: center; gap: 12px; flex-shrink: 0;',
    '}',
    '#gii-avatar {',
    '  width: 42px; height: 42px; border-radius: 50%;',
    '  background: linear-gradient(135deg, #8BC342, #6fa832);',
    '  display: flex; align-items: center; justify-content: center;',
    '  font-weight: 800; font-size: 16px; color: #fff; flex-shrink: 0;',
    '  box-shadow: 0 2px 8px rgba(0,0,0,0.2);',
    '}',
    '#gii-header-text { flex: 1; }',
    '#gii-header-text strong { display: block; font-size: 14px; font-weight: 700; color: #fff; letter-spacing: 0.01em; }',
    '#gii-header-status { display: flex; align-items: center; gap: 5px; margin-top: 2px; }',
    '#gii-header-status .status-dot { width: 7px; height: 7px; border-radius: 50%; background: #8BC342; flex-shrink: 0; }',
    '#gii-header-status span { font-size: 11.5px; color: rgba(255,255,255,0.7); }',
    '#gii-close {',
    '  background: rgba(255,255,255,0.12); border: none; color: #fff;',
    '  width: 28px; height: 28px; border-radius: 50%;',
    '  display: flex; align-items: center; justify-content: center;',
    '  font-size: 18px; line-height: 1; cursor: pointer;',
    '  transition: background 0.15s; flex-shrink: 0;',
    '}',
    '#gii-close:hover { background: rgba(255,255,255,0.22); }',

    /* Body */
    '#gii-body {',
    '  flex: 1; overflow-y: auto; padding: 18px 16px 14px;',
    '  display: flex; flex-direction: column; gap: 10px;',
    '  max-height: 380px;',
    '}',
    '#gii-body::-webkit-scrollbar { width: 4px; }',
    '#gii-body::-webkit-scrollbar-track { background: transparent; }',
    '#gii-body::-webkit-scrollbar-thumb { background: #ddd; border-radius: 4px; }',

    /* Messages */
    '.gii-msg {',
    '  max-width: 88%; padding: 10px 14px;',
    '  font-size: 13.5px; line-height: 1.6; border-radius: 18px;',
    '  animation: giiSlideIn 0.2s ease;',
    '}',
    '.gii-msg.bot  { background: #f2f4f2; color: #1c1c1c; border-bottom-left-radius: 5px; align-self: flex-start; }',
    '.gii-msg.user { background: linear-gradient(135deg, #1a472a, #2d6e47); color: #fff; border-bottom-right-radius: 5px; align-self: flex-end; }',

    '@keyframes giiSlideIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }',

    /* Typing indicator */
    '.gii-typing { display: flex; align-items: center; gap: 4px; padding: 12px 16px; background: #f2f4f2; border-radius: 18px; border-bottom-left-radius: 5px; align-self: flex-start; }',
    '.gii-typing span { width: 6px; height: 6px; border-radius: 50%; background: #999; display: inline-block; animation: giiDot 1.2s infinite ease-in-out; }',
    '.gii-typing span:nth-child(2) { animation-delay: 0.2s; }',
    '.gii-typing span:nth-child(3) { animation-delay: 0.4s; }',
    '@keyframes giiDot { 0%,80%,100% { transform: scale(0.7); opacity: 0.5; } 40% { transform: scale(1); opacity: 1; } }',

    /* Options */
    '.gii-options { display: flex; flex-direction: column; gap: 7px; margin-top: 2px; }',
    '.gii-opt {',
    '  background: #fff; border: 1.5px solid #e0e6e0; color: #1a472a;',
    '  border-radius: 12px; padding: 11px 12px 11px 20px;',
    '  font-size: 13px; font-weight: 500;',
    '  text-align: left; cursor: pointer;',
    '  transition: all 0.15s ease;',
    '  font-family: Inter, -apple-system, sans-serif;',
    '  display: flex; align-items: center; justify-content: space-between;',
    '  box-shadow: 0 1px 3px rgba(0,0,0,0.06);',
    '}',
    '.gii-opt:hover { background: #1a472a; color: #fff; border-color: #1a472a; box-shadow: 0 3px 10px rgba(26,71,42,0.2); transform: translateY(-1px); }',
    '.gii-opt span:first-child { flex: 1; min-width: 0; word-break: break-word; white-space: normal; line-height: 1.4; }',
    '.gii-opt .arrow { font-size: 16px; opacity: 0.4; transition: opacity 0.15s, transform 0.15s; flex-shrink: 0; margin-left: 8px; }',
    '.gii-opt:hover .arrow { opacity: 1; transform: translateX(3px); }',

    /* Actions */
    '.gii-actions { display: flex; flex-direction: column; gap: 8px; margin-top: 2px; }',
    '.gii-action {',
    '  display: block; border-radius: 12px;',
    '  padding: 11px 16px; font-size: 13px; font-weight: 600;',
    '  text-decoration: none; text-align: center;',
    '  transition: all 0.15s ease;',
    '  font-family: Inter, -apple-system, sans-serif;',
    '  box-shadow: 0 1px 3px rgba(0,0,0,0.08);',
    '}',
    '.gii-action.primary { background: linear-gradient(135deg, #8BC342, #7aad35); color: #fff; }',
    '.gii-action.primary:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(139,195,66,0.4); }',
    '.gii-action.secondary { background: #f2f4f2; color: #1a472a; border: 1.5px solid #e0e6e0; }',
    '.gii-action.secondary:hover { background: #e8ede8; }',

    /* Mobile */
    '@media (max-width: 400px) {',
    '  #gii-panel { right: 12px; left: 12px; width: auto; bottom: 90px; }',
    '  #gii-bubble { right: 16px; bottom: 16px; }',
    '}',
  ].join('\n');


  // ============================================================
  //  INIT
  // ============================================================
  function init() {

    var styleTag = document.createElement('style');
    styleTag.textContent = CSS;
    document.head.appendChild(styleTag);

    var widget = document.createElement('div');
    widget.id = 'gii-widget';
    widget.innerHTML =
      '<div id="gii-bubble" role="button" aria-label="Chat with us" tabindex="0">' +
        '<svg class="icon-chat" viewBox="0 0 24 24"><path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>' +
        '<svg class="icon-close" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>' +
        '<div id="gii-dot"></div>' +
      '</div>' +
      '<div id="gii-panel" role="dialog" aria-label="Chat with Gii">' +
        '<div id="gii-header">' +
          '<div id="gii-avatar">G</div>' +
          '<div id="gii-header-text">' +
            '<strong>Global Interconnect</strong>' +
            '<div id="gii-header-status">' +
              '<div class="status-dot"></div>' +
              '<span>Our team is available</span>' +
            '</div>' +
          '</div>' +
          '<button id="gii-close" aria-label="Close">\u00D7</button>' +
        '</div>' +
        '<div id="gii-body"></div>' +
      '</div>';

    document.body.appendChild(widget);

    var bubble   = document.getElementById('gii-bubble');
    var panel    = document.getElementById('gii-panel');
    var body     = document.getElementById('gii-body');
    var closeBtn = document.getElementById('gii-close');
    var dot      = document.getElementById('gii-dot');
    var started  = false;

    function scrollBottom() { body.scrollTop = body.scrollHeight; }

    function openPanel() {
      panel.classList.add('gii-open');
      bubble.classList.add('gii-open');
      dot.style.opacity = '0';
      if (!started) {
        started = true;
        setTimeout(showTyping, 300);
      }
    }

    function closePanel() {
      panel.classList.remove('gii-open');
      bubble.classList.remove('gii-open');
    }

    bubble.addEventListener('click', function () {
      panel.classList.contains('gii-open') ? closePanel() : openPanel();
    });
    bubble.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') openPanel();
    });
    closeBtn.addEventListener('click', closePanel);

    // Typing indicator then greeting
    function showTyping() {
      var t = document.createElement('div');
      t.className = 'gii-typing';
      t.innerHTML = '<span></span><span></span><span></span>';
      body.appendChild(t);
      scrollBottom();
      setTimeout(function () {
        t.remove();
        addBotMsg(CONFIG.greeting);
        setTimeout(showOptions, 500);
      }, 1000);
    }

    function addBotMsg(text) {
      var m = document.createElement('div');
      m.className = 'gii-msg bot';
      m.textContent = text;
      body.appendChild(m);
      scrollBottom();
    }

    function addUserMsg(text) {
      var m = document.createElement('div');
      m.className = 'gii-msg user';
      m.textContent = text;
      body.appendChild(m);
      scrollBottom();
    }

    function showOptions() {
      var wrap = document.createElement('div');
      wrap.className = 'gii-options';
      var choices = [
        { key: 'engineer',       label: "I'm an engineer evaluating suppliers" },
        { key: 'newProgram',     label: "I'm working on a new program / need a quote" },
        { key: 'existingClient', label: "I'm an existing client with a question" },
      ];
      choices.forEach(function (c) {
        var btn = document.createElement('button');
        btn.className = 'gii-opt';
        btn.innerHTML = '<span>' + c.label + '</span><span class="arrow">›</span>';
        btn.addEventListener('click', function () {
          wrap.remove();
          handleChoice(c.key, c.label);
        });
        wrap.appendChild(btn);
      });
      body.appendChild(wrap);
      scrollBottom();
    }

    function handleChoice(key, label) {
      addUserMsg(label);
      var route = CONFIG.routes[key];
      // Show typing then reply
      var t = document.createElement('div');
      t.className = 'gii-typing';
      t.innerHTML = '<span></span><span></span><span></span>';
      setTimeout(function () {
        body.appendChild(t);
        scrollBottom();
        setTimeout(function () {
          t.remove();
          addBotMsg(route.reply);
          setTimeout(function () { showActions(route); }, 400);
        }, 900);
      }, 400);
    }

    function showActions(route) {
      var wrap = document.createElement('div');
      wrap.className = 'gii-actions';
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
      scrollBottom();
    }

    // Auto-open after delay
    if (CONFIG.autoOpenDelay > 0) {
      setTimeout(openPanel, CONFIG.autoOpenDelay);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
