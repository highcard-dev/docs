# Patch Notes - How to Add

This directory contains all weekly patch notes for Druid.gg.

## Creating a New Patch Note

1. **Copy the template:**
   ```bash
   cp ../../.templates/patch-notes-template.md docs/patch-notes/2026-MM-DD.md
   ```
   Replace `MM-DD` with the actual date (e.g., `2026-02-27.md`)

2. **Edit the file:**
   - Update the title and date in the frontmatter
   - Adjust `sidebar_position` (lower number = appears higher in list)
     - Start from 100 and count down: Feb 20=100, Feb 27=99, Mar 6=98, etc.
   - Fill in the sections with your updates
   - Remove any sections you don't need

3. **Commit and push:**
   ```bash
   git add docs/patch-notes/2026-MM-DD.md
   git commit -m "Add patch notes for MM/DD"
   git push
   ```

## Tips

- **Date format:** Always use `YYYY-MM-DD.md` for filenames (sorts correctly)
- **Emoji sections:** Use the standard emoji headers for consistency
  - 🎉 New Features
  - 🔧 Improvements
  - 🐛 Bug Fixes
  - 📚 Documentation
  - 🔮 Coming Soon
- **Links:** Reference other docs pages using relative paths like `/general/mana`
- **Keep it concise:** Users want highlights, not essays

## Sidebar Position Guide

To keep newest patches at the top:
- Feb 20, 2026: sidebar_position: 100
- Feb 27, 2026: sidebar_position: 99
- Mar 6, 2026: sidebar_position: 98
- Mar 13, 2026: sidebar_position: 97
- etc.

Lower numbers appear higher in the sidebar.
