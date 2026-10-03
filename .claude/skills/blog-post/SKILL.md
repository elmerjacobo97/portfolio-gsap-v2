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

1. Gather sources; decide slug, category, tags.
2. Write the ES version.
3. Run the prose through the **humanizer** skill (leave frontmatter and code untouched).
4. Translate to EN: same order, same code blocks, natural (not literal) English. Run humanizer on it too.
5. With the dev server running (`pnpm dev`), check that `/es/blog/<slug>` and `/en/blog/<slug>` return 200 and the post shows in the list with its category chip. If the frontmatter fails the schema, the post silently disappears.
6. Report in 3 lines: files created, category, which fact Elmer should double-check.
