/* =========================================================
   FOERT — live verversen (HULP TIJDENS HET BOUWEN)
   ---------------------------------------------------------
   Dit bestandje is enkel handig terwijl je de site aan het
   maken bent. Het checkt elke paar seconden of de pagina
   gewijzigd is en herlaadt ze dan automatisch — zodat je
   je nieuwe aanpassingen vanzelf ziet verschijnen.

   KLAAR MET BOUWEN? Verwijder dan deze regel uit index.html:
       <script src="live-refresh.js"></script>
   (Zie ook de README.)
   ========================================================= */

(function () {
  var INTERVAL_MS = 6000; // hoe vaak er gecheckt wordt (6 seconden)
  var huidigeVersie = null;

  function checkVoorWijziging() {
    // Cache-buster (?t=...) zorgt dat we steeds de verse versie ophalen.
    fetch(window.location.href + "?t=" + Date.now(), {
      method: "HEAD",
      cache: "no-store",
    })
      .then(function (res) {
        // We gebruiken een 'vingerafdruk' van de pagina om wijzigingen te zien.
        var versie =
          res.headers.get("etag") ||
          res.headers.get("last-modified") ||
          res.headers.get("content-length");

        if (huidigeVersie === null) {
          huidigeVersie = versie; // eerste keer: gewoon onthouden
        } else if (versie && versie !== huidigeVersie) {
          // Er is iets veranderd → pagina opnieuw laden.
          window.location.reload();
        }
      })
      .catch(function () {
        /* Geen internet of even niet bereikbaar? Gewoon negeren en straks opnieuw proberen. */
      });
  }

  setInterval(checkVoorWijziging, INTERVAL_MS);
})();
