(function () {
  "use strict";
  var S = window.SITE, P = window.PROJECTS || [];
  var CATS = ["All", "Web Applications", "E-commerce", "Business Systems", "Mobile Applications", "Desktop Applications"];

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }
  function wa(msg) { return "https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(msg); }
  function mail(subject, body) {
    return "mailto:" + S.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  // Contact links
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = wa("Hello Asad Tech Concepts, I would like to make an enquiry.");
  });
  document.querySelectorAll("[data-mail]").forEach(function (a) {
    a.href = mail("Enquiry", "Hello Asad Tech Concepts,\n\n");
  });
  document.querySelectorAll("[data-email-text]").forEach(function (n) { n.textContent = S.email; });
  document.querySelectorAll("[data-phone-text]").forEach(function (n) { n.textContent = S.phoneDisplay; });
  document.querySelectorAll("[data-location-text]").forEach(function (n) { n.textContent = S.location; });
  document.getElementById("year").textContent = new Date().getFullYear();

  // Mobile nav
  var toggle = document.getElementById("nav-toggle"), nav = document.getElementById("nav");
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
  });

  // Catalogue
  var grid = document.getElementById("project-grid"), filters = document.getElementById("filters");
  var dialog = document.getElementById("detail"), detailBody = document.getElementById("detail-body");
  var featured = document.getElementById("featured-grid");

  function statusClass(s) { return "status s-" + s.toLowerCase().replace(/[^a-z]+/g, "-"); }

  function card(p) {
    var c = el("article", "card");
    if (p.screenshot) {
      var img = el("img", "shot"); img.src = p.screenshot; img.alt = p.name + " preview"; img.loading = "lazy"; c.appendChild(img);
    }
    var top = el("div", "card-top");
    top.appendChild(el("span", statusClass(p.status), p.status));
    top.appendChild(el("span", "tag", p.platform));
    c.appendChild(top);
    c.appendChild(el("h3", "", p.name));
    c.appendChild(el("p", "muted", p.summary));
    c.appendChild(el("p", "tag", p.category));
    var ul = el("ul", "features");
    p.features.slice(0, 4).forEach(function (f) { ul.appendChild(el("li", "", f)); });
    c.appendChild(ul);
    var actions = el("div", "actions");
    var d = el("button", "btn small", "View Details"); d.type = "button";
    d.addEventListener("click", function () { openDetail(p); });
    actions.appendChild(d);
    if (p.demoUrl) {
      var a = el("a", "btn small ghost", "Live Demo"); a.href = p.demoUrl; a.target = "_blank"; a.rel = "noopener";
      actions.appendChild(a);
    }
    c.appendChild(actions);
    return c;
  }

  function render(cat) {
    grid.replaceChildren();
    var list = P.filter(function (p) { return cat === "All" || p.category === cat; });
    if (!list.length) grid.appendChild(el("p", "muted", "No projects in this category yet."));
    list.forEach(function (p) { grid.appendChild(card(p)); });
  }

  CATS.forEach(function (c, i) {
    var b = el("button", "chip" + (i === 0 ? " active" : ""), c);
    b.type = "button"; b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
    b.addEventListener("click", function () {
      filters.querySelectorAll(".chip").forEach(function (x) { x.classList.remove("active"); x.setAttribute("aria-pressed", "false"); });
      b.classList.add("active"); b.setAttribute("aria-pressed", "true"); render(c);
    });
    filters.appendChild(b);
  });
  render("All");
  P.slice(0, 3).forEach(function (p) { featured.appendChild(card(p)); });

  function section(title, node) {
    var s = el("section", "d-sec"); s.appendChild(el("h4", "", title)); s.appendChild(node); return s;
  }
  function openDetail(p) {
    detailBody.replaceChildren();
    detailBody.appendChild(el("h2", "", p.name));
    var meta = el("div", "card-top");
    meta.appendChild(el("span", statusClass(p.status), p.status));
    meta.appendChild(el("span", "tag", p.platform));
    meta.appendChild(el("span", "tag", p.category));
    detailBody.appendChild(meta);
    detailBody.appendChild(section("Problem addressed", el("p", "", p.problem)));
    detailBody.appendChild(section("Proposed solution", el("p", "", p.solution)));
    var ul = el("ul", "features"); p.features.forEach(function (f) { ul.appendChild(el("li", "", f)); });
    detailBody.appendChild(section("Main features", ul));
    detailBody.appendChild(section("Customization", el("p", "", p.customization)));
    detailBody.appendChild(section("Purchase or licensing",
      el("p", "", "Terms are not fixed. Send an enquiry and the quotation will define scope, deliverables, cost, timeline, hosting and maintenance.")));
    var actions = el("div", "actions");
    var q = el("a", "btn small", "Enquire About This Product");
    q.href = wa("Hello Asad Tech Concepts, I would like to enquire about " + p.name + " (purchase, licensing or customization).");
    q.target = "_blank"; q.rel = "noopener"; actions.appendChild(q);
    if (p.demoUrl) {
      var d = el("a", "btn small ghost", "Live Demo"); d.href = p.demoUrl; d.target = "_blank"; d.rel = "noopener"; actions.appendChild(d);
    }
    detailBody.appendChild(actions);
    if (dialog.showModal) dialog.showModal(); else dialog.setAttribute("open", "");
  }
  document.getElementById("detail-close").addEventListener("click", function () {
    if (dialog.close) dialog.close(); else dialog.removeAttribute("open");
  });
  dialog.addEventListener("click", function (e) { if (e.target === dialog && dialog.close) dialog.close(); });

  // Enquiry form: builds an encoded WhatsApp message or email draft. Nothing is stored on a server.
  var form = document.getElementById("enquiry"), err = document.getElementById("form-error");
  function build() {
    var f = form.elements;
    var name = f.name.value.trim(), email = f.email.value.trim(), desc = f.description.value.trim();
    if (!name || !email || !desc) { err.textContent = "Please enter your name, email and project description."; return null; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = "Please enter a valid email address."; return null; }
    err.textContent = "";
    var lines = [
      "New project enquiry",
      "Name: " + name,
      "Organization: " + (f.org.value.trim() || "-"),
      "Email: " + email,
      "WhatsApp: " + (f.phone.value.trim() || "-"),
      "Project type: " + f.type.value,
      "Platform: " + f.platform.value,
      "Budget: " + (f.budget.value || "-"),
      "Timeline: " + (f.timeline.value || "-"),
      "",
      "Description:",
      desc
    ];
    return lines.join("\n");
  }
  document.getElementById("send-wa").addEventListener("click", function () {
    var m = build(); if (m) window.open(wa(m), "_blank", "noopener");
  });
  document.getElementById("send-mail").addEventListener("click", function () {
    var m = build(); if (m) window.location.href = mail("Project enquiry from " + form.elements.name.value.trim(), m);
  });
  form.addEventListener("submit", function (e) { e.preventDefault(); });
})();
