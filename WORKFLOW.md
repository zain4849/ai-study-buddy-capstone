# Workflow: Vague vs. Precise AI Prompts

## Experiment Setup

I built a settings form twice—once with a vague prompt, once with detailed specs—to see how prompt quality affects code quality.

- **Round 1 (Vague):** `feature/settings-vague` — Single prompt with minimal detail
- **Round 2 (Precise):** `feature/settings-precise` — Detailed prompt with file paths, validation rules, and test requirements

Both used GitHub Copilot to generate the same feature.

---

## What Actually Happened

### Code Organization

**Vague version:**
- Everything crammed into `main.jsx` (~500 lines)
- Icon component with 50+ inline SVG paths
- Toggle button helper mixed in
- Entire sidebar, profile section, help card—things I never asked for

**Precise version:**
- `SettingsForm.js` (113 lines, just the form)
- `validation.js` (22 lines for validation logic)
- Separate CSS files organized by concern
- Exactly what I asked for, nothing extra

The vague version generated a full app layout when I just wanted a settings form. The precise prompt's file structure and constraints prevented scope creep.

---

### Validation & Correctness

**Vague:** No validation at all. Form accepts any input, no error messages, no feedback. The `set()` function just updates state directly.

**Precise:** Has a `validateSettings()` function that checks fields before saving. Shows error messages. Disables the submit button until the form is valid. Validates again on form submit before actually saving to localStorage.

**Real mistake I caught:** The vague version couldn't prevent bad data from being saved. If someone somehow saved invalid settings, the app could crash on reload. The precise version anticipates this with explicit validation.

---

### Edge Cases

**Vague doesn't handle:**
- Clearing localStorage (form has no defaults)
- Rapid submit clicks
- Invalid options being selected

**Precise handles all of these:**
- Loads saved settings on mount, falls back to defaults
- "Changes saved" message prevents accidental double-clicks
- Only allows valid options through validation

---

### Accessibility

**Vague:** Labels exist but aren't connected to inputs. No aria attributes. Just bare form elements.

**Precise:** Proper `<label>` elements, `aria-invalid` attributes, semantic HTML. Actually usable for screen readers.

---

### Testing & Review

**Vague took 3 rounds:**
1. Got full sidebar/profile (too much)
2. Asked to remove stuff, focus on settings
3. Asked to add validation

**Precise took 1 round:**
- Prompt was specific enough that the AI got it right
- Just minor CSS tweaks needed
- Tests already included

The vague approach felt fast initially but needed constant feedback loops. Precise prompts save iteration time.

---

## Key Insight

The vague prompt didn't specify:
- Where files should go
- What validation should look like
- That I wanted tests
- What edge cases matter
- Accessibility requirements

Without these constraints, the AI made reasonable but wrong assumptions. It added features I never asked for. It skipped validation because I didn't mention it.

The precise prompt said exactly what to build, where to build it, and how to verify it works.

---

## What I'm Taking Away

1. **Always specify file structure** — Tell the AI exactly where to put code
2. **Validation is separate** — Never mix it into components
3. **Request tests immediately** — "Write it, then write tests" prevents untestable code
4. **Use constraints** — "Keep under 150 lines" forces better design than "make it good"
5. **Mention accessibility upfront** — If I don't ask for it, it doesn't happen

The AI didn't get smarter between rounds. I got clearer about what I wanted.
