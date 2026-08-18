// ============================================================
// VERSIONE DELL'APP
// ------------------------------------------------------------
// Versione semver (x.y.z) dell'applicazione, iniettata a
// build-time da Vite in `import.meta.env.VITE_APP_VERSION`
// (vedi `define` in vite.config.js):
//   - in CI (GitHub Actions) viene impostata VITE_APP_VERSION
//     dopo l'incremento automatico della patch (npm version patch);
//   - in locale si usa la versione di package.json.
// ============================================================

export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '0.0.0-dev';
