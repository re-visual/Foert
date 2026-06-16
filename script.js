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
        note.textContent = "Bedankt " + naam + "! Je aanvraag is genoteerd. (Tip aan de eigenaar: koppel het formulier — zie README.)";
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
});
