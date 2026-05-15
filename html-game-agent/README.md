# HTML Game Maker Agent

This repository contains a TalentHub-ready agent for generating polished HTML mini games.

## Files

- `manifest.json` - TalentHub metadata.
- `IDENTITY.md` - Required core identity prompt.
- `USER.md` - User-facing usage guide.
- `SOUL.md` - Personality, principles, and boundaries.
- `AGENTS.md` - Collaboration guidance for multi-agent workflows.

## Publish

Install and log in to the TalentHub CLI first:

```bash
npm install -g @storyclaw/talenthub
talenthub login
```

Then publish from this directory:

```bash
talenthub agent publish html-game-maker --dir .
```

If you run the command from the parent repository:

```bash
talenthub agent publish html-game-maker --dir ./html-game-agent
```
