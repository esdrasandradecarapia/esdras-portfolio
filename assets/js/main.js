/*
 * Preenche os links de contato (WhatsApp, LinkedIn, GitHub, e-mail) a partir de window.CONFIG.
 * Os links ficam centralizados aqui para não repetir URLs no HTML.
 */
(function(){
  const wa = "https://wa.me/" + window.CONFIG.whatsapp + "?text=" + encodeURIComponent(window.CONFIG.whatsappMsg);
  const li = "https://www.linkedin.com/in/" + window.CONFIG.linkedin;
  const gh = "https://github.com/" + window.CONFIG.github;
  const set = (sel, href) => document.querySelectorAll(sel).forEach(a => a.href = href);
  set(".js-wa", wa); set(".js-li", li); set(".js-gh", gh);
  set(".js-gh-repo", gh + "/" + window.CONFIG.repo);
  set(".js-mail", "mailto:" + window.CONFIG.email);
  document.querySelectorAll(".js-mail-label").forEach(e => e.textContent = window.CONFIG.email);
  const n = window.CONFIG.whatsapp;
  const fmt = n.length >= 12 ? `+${n.slice(0,2)} (${n.slice(2,4)}) ${n.slice(4,-4)}-${n.slice(-4)}` : "+" + n;
  document.querySelectorAll(".js-wa-label").forEach(e => e.textContent = fmt);
  document.querySelectorAll(".js-li-label").forEach(e => e.textContent = "linkedin.com/in/" + window.CONFIG.linkedin);
  document.querySelectorAll(".js-gh-label").forEach(e => e.textContent = "github.com/" + window.CONFIG.github);
})();
