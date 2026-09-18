<p align="center">
  <img src="banner.svg" alt="al-grano" width="100%" />
</p>
<p align="center">
  <em>Ve al grano. Respuesta primero, cero relleno, largo con tope.</em>
</p>
<p align="center">
  🇪🇸 Español · <a href="README.en.md">🇬🇧 English</a>
</p>

## Qué hace

Un skill de estilo de salida para tu asistente de código. Fusiona dos disciplinas en una:

- **Terso** (linaje caveman): elimina artículos, relleno, cortesías y hedging vacío. Conserva toda la sustancia técnica. Código, comandos y mensajes de error quedan tal cual.
- **Accionable** (ADHD-friendly, inspirado en [`ayghri/i-have-adhd`](https://github.com/ayghri/i-have-adhd)): respuesta en la línea uno, pasos numerados, estado repetido entre turnos, sin preámbulo, sin recap, sin cierre.

Más un presupuesto duro: el cierre de una tarea son 10 líneas o menos, una tabla máximo, hallazgos de una línea cada uno con el detalle empujado al commit o al devlog.

Se activa solo al arrancar la sesión y sigue activo hasta que digas `para al-grano`, `stop al-grano` o `normal mode`.

## Antes / después

**Antes**
> Great question! Let me look at this. Your auth flow has a few moving pieces: the middleware, the token verification, and the cookie handling. Looking at `src/auth.ts`, the `verifyToken` function around lines 42-58 seems to use an older API. One approach would be to update the package and rewrite that function. After that you'd want to run the auth tests. By the way, your dependencies look stale overall. Hope this helps, let me know if you want to dig deeper!

**Después**
> Bug in `src/auth.ts:42`. Token check uses `<`, needs `<=`.
> 1. Edit `src/auth.ts:42`, change `<` to `<=`.
> 2. Run `npm test -- auth.spec.ts`.
>
> Aparte: la dependencia está vieja. ¿La toco después?

## Instalación

Ver [INSTALL.md](INSTALL.md). Soporta Claude Code y Codex. El Markdown del skill por sí solo funciona en cualquier runtime que importe un `SKILL.md`.

## Apagarlo

Di `para al-grano` o `normal mode`. Di `al grano` para volver a activarlo.

## Licencia

MIT. Ver [LICENSE](LICENSE).
