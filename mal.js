
(() => {
  "use strict";

  const CLIENT = CLIENT_ID;
  const REDIRECT = MAL_REDIRECT_URI;

  const AUTH_URL =
    "https://myanimelist.net/v1/oauth2/authorize";

  const TOKEN_URL =
    "https://myanimelist.net/v1/oauth2/token";

  const API = "https://api.myanimelist.net/v2";

  const SESSION_KEY = "KATRO_MAL_SESSION";
  const FLOW_KEY = "KATRO_MAL_FLOW";

  const style = document.createElement("style");

  style.textContent = `
    .mal-panel {
      width:92%;
      max-width:1100px;
      margin:20px auto;
      padding:20px;
      background:#0d111c;
      border:1px solid #1b2638;
      border-radius:14px;
      color:white;
    }

    .mal-panel h2 {
      color:#00b7ff;
      margin-bottom:15px;
    }

    .mal-btn {
      border:0;
      padding:12px 18px;
      border-radius:9px;
      background:#087fc4;
      color:white;
      cursor:pointer;
      font-weight:bold;
    }

    .mal-secondary {
      background:#26364d;
    }

    .mal-message {
      color:#aabbd0;
      margin:12px 0;
      line-height:1.8;
    }

    .mal-error {
      color:#ff8c8c;
    }

    .mal-profile {
      display:flex;
      align-items:center;
      gap:12px;
      margin:15px 0;
    }

    .mal-avatar {
      width:55px;
      height:55px;
      border-radius:50%;
      object-fit:cover;
    }

    .mal-grid {
      display:grid;
      grid-template-columns:repeat(
        auto-fill,
        minmax(190px,1fr)
      );
      gap:12px;
      margin-top:15px;
    }

    .mal-item {
      background:#111827;
      border:1px solid #26364d;
      padding:12px;
      border-radius:10px;
    }

    .mal-item strong {
      display:block;
      margin-bottom:8px;
    }

    .mal-item small {
      color:#aabbd0;
    }
  `;

  document.head.appendChild(style);

  function createElement(tag, className, value) {
    const element = document.createElement(tag);

    if (className) {
      element.className = className;
    }

    if (value !== undefined) {
      element.textContent = value;
    }

    return element;
  }

  function getSession() {
    try {
      return JSON.parse(
        localStorage.getItem(SESSION_KEY) || "null"
      );
    } catch {
      return null;
    }
  }

  function saveSession(session) {
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(session)
    );
  }

  function generateVerifier() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";

    const bytes = new Uint8Array(64);

    crypto.getRandomValues(bytes);

    return Array.from(
      bytes,
      byte => chars[byte % chars.length]
    ).join("");
  }

  function getPanel() {
    let panel = document.getElementById("malPanel");

    if (panel) return panel;

    panel = createElement("section", "mal-panel");
    panel.id = "malPanel";

    const hero = document.querySelector(".hero");

    if (hero) {
      hero.after(panel);
    } else {
      document.body.prepend(panel);
    }

    return panel;
  }

  function showMessage(panel, text, error = false) {
    let message = panel.querySelector(".mal-message");

    if (!message) {
      message = createElement("p", "mal-message");
      panel.appendChild(message);
    }

    message.className =
      "mal-message" + (error ? " mal-error" : "");

    message.textContent = text;
  }

  async function exchangeCode(code, verifier) {
    const body = new URLSearchParams({
      client_id: CLIENT,
      grant_type: "authorization_code",
      code: code,
      code_verifier: verifier,
      redirect_uri: REDIRECT
    });

    const response = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded"
      },
      body: body
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "فشل تسجيل الدخول."
      );
    }

    return data;
  }

  async function refreshToken(session) {
    const body = new URLSearchParams({
      client_id: CLIENT,
      grant_type: "refresh_token",
      refresh_token: session.refresh_token
    });

    const response = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded"
      },
      body: body
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("انتهت جلسة MyAnimeList.");
    }

    const updated = {
      ...session,
      ...data,
      expires_at:
        Date.now() + Number(data.expires_in) * 1000
    };

    saveSession(updated);

    return updated;
  }

  async function apiRequest(path, session) {
    let active = session;

    if (
      active.expires_at &&
      Date.now() > active.expires_at - 60000
    ) {
      active = await refreshToken(active);
    }

    let response = await fetch(API + path, {
      headers: {
        Authorization:
          "Bearer " + active.access_token
      }
    });

    if (response.status === 401) {
      active = await refreshToken(active);

      response = await fetch(API + path, {
        headers: {
          Authorization:
            "Bearer " + active.access_token
        }
      });
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "تعذر جلب بيانات الحساب."
      );
    }

    return {
      data,
      session: active
    };
  }

  function login(panel) {
    if (!CLIENT) {
      showMessage(
        panel,
        "Client ID غير موجود.",
        true
      );
      return;
    }

    const verifier = generateVerifier();
    const state = generateVerifier().slice(0, 32);

    localStorage.setItem(
      FLOW_KEY,
      JSON.stringify({
        verifier,
        state,
        created: Date.now()
      })
    );

    const url = new URL(AUTH_URL);

    url.search = new URLSearchParams({
      response_type: "code",
      client_id: CLIENT,
      code_challenge: verifier,
      code_challenge_method: "plain",
      state,
      redirect_uri: REDIRECT
    }).toString();

    location.href = url.toString();
  }

  function renderAnimeList(panel, items) {
    const old = panel.querySelector(".mal-grid");

    if (old) old.remove();

    const grid = createElement("div", "mal-grid");

    if (!items.length) {
      grid.appendChild(
        createElement(
          "p",
          "mal-message",
          "قائمة الأنمي فارغة."
        )
      );
    }

    items.forEach(item => {
      const card = createElement("div", "mal-item");

      card.appendChild(
        createElement(
          "strong",
          "",
          item.node.title || "Unknown Anime"
        )
      );

      const status = item.list_status || {};

      card.appendChild(
        createElement(
          "small",
          "",
          "الحالة: " + (status.status || "غير محدد") +
          " | الحلقات: " +
          (status.num_episodes_watched || 0) +
          " | التقييم: " +
          (status.score || 0) + "/10"
        )
      );

      grid.appendChild(card);
    });

    panel.appendChild(grid);
  }

  async function showAccount(panel) {
    const session = getSession();

    if (!session || !session.access_token) {
      const button = createElement(
        "button",
        "mal-btn",
        "تسجيل الدخول بحساب MyAnimeList"
      );

      button.onclick = () => login(panel);

      panel.appendChild(button);

      showMessage(
        panel,
        "اربط حسابك لعرض ملفك الشخصي وقائمة الأنمي."
      );

      return;
    }

    const logout = createElement(
      "button",
      "mal-btn mal-secondary",
      "تسجيل الخروج"
    );

    logout.onclick = () => {
      localStorage.removeItem(SESSION_KEY);
      location.reload();
    };

    panel.appendChild(logout);

    try {
      const profile = await apiRequest(
        "/users/@me?fields=picture",
        session
      );

      saveSession(profile.session);

      const profileBox = createElement(
        "div",
        "mal-profile"
      );

      if (profile.data.picture) {
        const avatar = createElement(
          "img",
          "mal-avatar"
        );

        avatar.src = profile.data.picture;
        avatar.alt = "Profile";

        profileBox.appendChild(avatar);
      }

      profileBox.appendChild(
        createElement(
          "strong",
          "",
          profile.data.name
        )
      );

      panel.appendChild(profileBox);

      showMessage(
        panel,
        "تم ربط حسابك بنجاح. قائمة الأنمي:"
      );

      const result = await apiRequest(
        "/users/@me/animelist?fields=list_status&limit=100",
        profile.session
      );

      saveSession(result.session);

      renderAnimeList(
        panel,
        result.data.data || []
      );

      if (result.data.paging?.next) {
        showMessage(
          panel,
          "يتم عرض أول 100 عنصر من قائمتك حالياً."
        );
      }

    } catch (error) {
      showMessage(
        panel,
        error.message,
        true
      );
    }
  }

  async function init() {
    const panel = getPanel();

    panel.appendChild(
      createElement("h2", "", "MyAnimeList")
    );

    const params = new URLSearchParams(
      location.search
    );

    const code = params.get("code");
    const state = params.get("state");

    if (code) {
      try {
        const flow = JSON.parse(
          localStorage.getItem(FLOW_KEY) || "null"
        );

        if (
          !flow ||
          !state ||
          state !== flow.state ||
          Date.now() - flow.created > 600000
        ) {
          throw new Error(
            "تعذر التحقق من تسجيل الدخول. أعد المحاولة."
          );
        }

        const token = await exchangeCode(
          code,
          flow.verifier
        );

        saveSession({
          ...token,
          expires_at:
            Date.now() +
            Number(token.expires_in || 3600) * 1000
        });

        localStorage.removeItem(FLOW_KEY);

        history.replaceState(
          {},
          document.title,
          REDIRECT
        );

      } catch (error) {
        showMessage(panel, error.message, true);

        const retry = createElement(
          "button",
          "mal-btn",
          "إعادة المحاولة"
        );

        retry.onclick = () => login(panel);

        panel.appendChild(retry);

        return;
      }
    }

    await showAccount(panel);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      init
    );
  } else {
    init();
  }

})();
