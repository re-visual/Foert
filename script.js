/* =========================================================
   FOERT — kleine stukjes interactie
   1) Het menu open/dicht laten klappen op gsm
   2) Een vriendelijke controle van het contactformulier
   3) Het jaartal in de voettekst automatisch juist zetten
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1) MOBIEL MENU ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      toggle.setAttribute("aria-label", isOpen ? "Menu sluiten" : "Menu openen");
    });

    // Menu weer sluiten zodra je op een link tikt
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 2) CONTACTFORMULIER ---------- */
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");

  if (form && note) {
    form.addEventListener("submit", function (e) {
      // Zolang het formulier nog niet gekoppeld is aan een echte dienst
      // (zie README), vangen we het hier op zodat de bezoeker een
      // nette bevestiging ziet in plaats van een lege pagina.
      var actie = form.getAttribute("action");
      var nietGekoppeld = !actie || actie === "#";

      var naam = form.naam.value.trim();
      var tel = form.tel.value.trim();

      if (!naam || !tel) {
        e.preventDefault();
        note.textContent = "Vul minstens je naam en telefoonnummer in, dan bellen we je terug.";
        note.className = "form-note error";
        return;
      }

      if (nietGekoppeld) {
        e.preventDefault();
        note.textContent = "Bedankt " + naam + "! Je aanvraag is genoteerd. (Tip aan de eigenaar: koppel het formulier, zie README.)";
        note.className = "form-note success";
        form.reset();
      }
      // Als 'action' wél is ingevuld, laten we het formulier
      // gewoon normaal versturen naar je gekozen dienst.
    });
  }

  /* ---------- 3) JAARTAL IN VOETTEKST ---------- */
  var jaar = document.getElementById("jaar");
  if (jaar) {
    jaar.textContent = new Date().getFullYear();
  }

  /* ---------- 4) SUBTIEL VERSCHIJNEN BIJ SCROLLEN ---------- */
  var wilBeweging = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (wilBeweging && "IntersectionObserver" in window) {
    // Welke elementen mooi mogen 'invliegen' wanneer ze in beeld komen.
    var selectie = ".section-head, .card, .step, .why-item, .who-text, .who-photo, " +
      ".region-text, .region-card, .reviews-new, .coming-soon, .faq, " +
      ".contact-intro, .contact-form, .value-note, .care-inner";
    var elementen = document.querySelectorAll(selectie);

    // Kleine, oplopende vertraging per groepje voor een verzorgd effect.
    elementen.forEach(function (el) {
      el.classList.add("reveal");
      var buren = el.parentElement ? el.parentElement.children : [el];
      var index = Array.prototype.indexOf.call(buren, el);
      var vertraging = Math.min(index, 4) * 80; // max 320ms
      el.style.transitionDelay = vertraging + "ms";
    });

    var waarnemer = new IntersectionObserver(function (items, obs) {
      items.forEach(function (item) {
        if (item.isIntersecting) {
          item.target.classList.add("reveal-in");
          obs.unobserve(item.target); // één keer is genoeg
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    elementen.forEach(function (el) { waarnemer.observe(el); });
  }
});
