# Working sources

This folder is reserved for temporary working copies of projects imported from other GitHub repositories.

Do not link portfolio cards directly to files in this folder. Adapt or build each source project first, then copy only the publishable static output into:

`projects/[slug]/`

Recommended layout:

```text
sources/
  client-project/
    # cloned/adapted source repo, ignored by git
projects/
  client-project/
    index.html
    meta.json
    v2.html
```

The `sources/*/` folders are ignored by git on purpose. Commit only the final portfolio output under `projects/`.

