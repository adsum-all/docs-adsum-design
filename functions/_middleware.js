// Cloudflare Pages — protection d'accès (HTTP Basic Auth) sur TOUT le site.
// Simple et efficace : le mot de passe est vérifié AU BORD (edge) avant de servir
// le moindre fichier. Rien n'est exposé tant que l'utilisateur n'est pas authentifié.
//
// IMPORTANT (regle I10 du Playbook : aucun secret en clair dans le depot) :
// le couple identifiant / mot de passe N'EST PAS ecrit ici. Il est lu depuis les
// variables d'environnement Cloudflare Pages :
//   Dashboard Cloudflare > Pages > (ton projet) > Settings > Environment variables
//     SITE_USER = adsum
//     SITE_PASS = (un mot de passe fort que tu choisis)
//   puis redeploie.
//
// Tant que les variables ne sont pas definies, le site reste ouvert (aucun blocage
// accidentel). Des qu'elles existent, l'authentification est active partout.

export async function onRequest(context) {
  const { request, env, next } = context;

  // Pas de variables configurees -> on ne bloque pas (evite de te verrouiller dehors).
  if (!env.SITE_USER || !env.SITE_PASS) {
    return next();
  }

  const header = request.headers.get("Authorization") || "";
  const expected = "Basic " + btoa(`${env.SITE_USER}:${env.SITE_PASS}`);

  // Comparaison a temps constant (evite les attaques temporelles).
  if (header.length === expected.length && timingSafeEqual(header, expected)) {
    return next();
  }

  return new Response("Acces restreint - ADSUM", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="ADSUM", charset="UTF-8"',
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

function timingSafeEqual(a, b) {
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}
