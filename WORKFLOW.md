# Workflow: Vague vs. Precise AI Prompts

## The Experiment

Built a settings form twice to compare how prompt quality affects the code I get back.

- **Vague:** Single sentence request, accepted what AI generated
- **Precise:** Detailed spec with file paths, validation requirements, tests

Both used GitHub Copilot.

---

## What Happened

### Organization

**Vague:** Everything in one `main.jsx` file (52+ lines).
- Icon component with 50+ lines of inline SVG paths
- Toggle button helper mixed in
- Full sidebar, profile section, help card—stuff I never asked for
- Just `src/main.jsx` and `src/styles.css`

**Precise:** Clean structure.
- `main.jsx` (16 lines—just the entry point)
- `components/SettingsForm.js` (113 lines—the actual form)
- `utils/validation.js` (22 lines—validation logic)
- Separate test files for both
- Organized styles: `app.css` + `settings.css`

The vague version bloated up with features I didn't ask for. The precise prompt's file structure prevented scope creep.

---

### Correctness

**Vague:** No validation. Form accepts any input without checks. Just updates state directly.

**Precise:** Has `validateSettings()` function. Checks fields, shows error messages, disables submit if invalid. Validates again before saving to localStorage.

**Real mistake I caught:** If bad data got into localStorage in the vague version, the app could crash on reload. The precise version handles this.

---

### What's Missing in Vague

- No tests (precise has `.test.js` files)
- No validation module (validation mixed nowhere, doesn't exist)
- No error handling
- No default values
- Icons as massive inline SVGs (should be separate)

---

### Review Iterations

**Vague took 3 rounds:**
1. Got full sidebar/profile (too much)
2. Asked to remove stuff
3. Asked to add validation

**Precise took 1 round:**
- Prompt was specific enough
- Got mostly right code on first try
- Just tweaked CSS

---

## What I Realized

Without telling Copilot exactly where to put code, what to validate, and that I wanted tests—it made different assumptions. It added features. It skipped validation.

The precise prompt said: build SettingsForm.js here, validation.js there, write tests, validate these fields. It executed.

---

## Taking Away

1. **Specify file paths** — Tell AI where files go
2. **Validation is separate** — Don't let it live in components
3. **Ask for tests upfront** — "Write it, then write tests"
4. **Set constraints** — "Keep under 150 lines" forces better decisions
5. **Mention a11y** — If I don't ask for labels/aria, it won't be there

The AI didn't change. My prompts did.
