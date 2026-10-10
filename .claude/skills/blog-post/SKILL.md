---
name: blog-post
description: Write a blog article (ES + EN) for this portfolio from a topic, in Elmer's voice and run through humanizer. Use when the user asks to "write a post", "create an article", or passes a topic, a Notion page from the TikTok content calendar, or a repo to turn into an article.
---

# blog-post

Creates `content/blog/es/<slug>.mdx` and `content/blog/en/<slug>.mdx`. Does not commit.

## Input

- **Topic** (required): one sentence.
- Optional: Notion URL, repo/reference URL, keyword, angle, notes.

If a real fact is missing and the sources don't provide it, ask ONE short question. Never invent numbers, commands, results, or experiences.

## Sources

1. **Notion** (TikTok content calendar): `notion-fetch`. The page holds the topic, keyword, and slide texts. Use them as the outline, not the final content: the article is the deep version of the carousel. Check every detail against the real project.
2. **Elmer's own project**: read its repo/README (`gh repo view`, `gh api`) and `src/features/portfolio/data/projects.ts` before writing.
3. **Libraries or tools**: confirm syntax and versions with `ctx7` (see `~/.claude/rules/context7.md`).

## Frontmatter

Validated by zod in `src/features/blog/services/posts.ts`:

```yaml
---
title: ...
description: >-
  1-2 sentences, concrete, no empty promises.
date: 'YYYY-MM-DD'      # today
category: <from the table>
tags:                   # 3-6, do not repeat the category
  - ...
---
```

- `slug` = file name, kebab-case (`^[a-z0-9]+(?:-[a-z0-9]+)*$`), **identical in es and en**. Check it does not exist yet.
- Do not set `draft` unless the user asks.
- Do not add `tiktok:` (not in the schema yet).

## Categories (use only these)

| es | en |
|---|---|
| IA y Agentes | AI & Agents |
| Next.js y Arquitectura | Next.js & Architecture |
| React y Tooling | React & Tooling |
| Mobile | Mobile |
| Backend y DevOps | Backend & DevOps |
| Producto | Product |

If the topic fits none, ask before creating another.

## Voice and structure

Read 2 existing posts before writing (`deploy-google-cloud-claude-code-agent.mdx`, `feature-based-architecture-nextjs.mdx`).

- First person, natural and direct. Open with the real problem or situation, not a definition.
- No `# H1` (the title comes from frontmatter). `##` sections, short paragraphs, 700-1200 words.
- Fenced code blocks with a language; only code that works or comes from the real source.
- Inline links to docs or repos. `<Callout type="info" title="...">` only when it adds something.
- End with what is useful: what to do now or where to see the project. No summary, no sign-off line.

## Steps

0. Gate: write the article only if at least two are true: someone would search it in 6 months, it needs more than 6 slides to explain well, it works as proof for clients. Otherwise say so and stop. Rows with goal "Clientes" use the contact CTA, not a blog link.
1. Gather sources; decide slug, category, tags.
2. Write the ES version.
3. Run the prose through the **humanizer** skill (leave frontmatter and code untouched).
4. Translate to EN: same order, same code blocks, natural (not literal) English. Run humanizer on it too.
5. Run `pnpm lint && pnpm exec tsc --noEmit && pnpm build` and check that `/es/blog/<slug>` and `/en/blog/<slug>` appear in the build output. Do not start `pnpm dev`. If the frontmatter fails the schema, the post silently disappears.
6. If the topic came from a Notion calendar row, update that row's captions: TikTok and Instagram get "Guía completa con ejemplos en elmerjacobo.dev (sección Blog) 🔗" (Instagram: "en el link de mi bio"), Facebook gets `https://elmerjacobo.dev/es/blog/<slug>`. Add a "Antes de publicar: despliega el artículo" note at the top of the row.
7. Report in 3 lines: files created, category, which fact Elmer should double-check.
