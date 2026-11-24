/* Pont pour la version installable (PWA). Fournit window.muscuNative comme l'appli Android :
   l'appli garde alors tout sur l'appareil, rappelle l'export tous les 14 jours et fige les titres. */
(function () {
  var dl = function (name, text) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
    a.download = name; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  };
  window.muscuNative = {
    bars: function () {},   // couleur de la barre d'état : fixée à l'installation sur iPhone
    exit: function () {},   // pas de bouton retour à fermer sur iPhone
    // feuille de partage de l'iPhone (Fichiers, AirDrop, mail...) ; à défaut, téléchargement du fichier
    shareJson: async function (name, text) {
      for (var type of ['application/json', 'text/plain']) {
        var f = new File([text], name, { type: type });
        if (navigator.canShare && navigator.canShare({ files: [f] })) { await navigator.share({ files: [f], title: name }); return; }
      }
      dl(name, text);
    }
  };
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) {}
  if ('serviceWorker' in navigator) addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
})();
