# CLAUDE.md

## Project

AI Study Buddy

## Stack

* Node.js
* JavaScript
* Git
* GitHub

## Coding Conventions

* Write clear, readable code.
* Keep functions small and focused.
* Add comments only when they improve understanding.
* Follow Conventional Commits for Git history.
* Prefer simple solutions over unnecessary complexity.

## AI Development Rules (from Vague vs. Precise experiment)

1. **Specify File Structure in Prompts**
   - Include exact file paths (e.g., `src/components/SettingsForm.js`, `src/utils/validation.js`).
   - Without this, AI generates code in random places or builds way more than asked for.

2. **Validation Logic Lives Separately**
   - Put validation in its own file, not mixed into components.
   - This makes it testable and reusable (learned this the hard way when vague version had no validation at all).

3. **Request Tests in the Same Prompt**
   - Ask for tests immediately: "Write it, then write tests and run them"
   - Otherwise AI skips testing entirely.

4. **Use Constraints to Guide Design**
   - Add size limits: "Keep component under 150 lines"
   - Prevents scope creep (vague version was 500+ lines when I just wanted a settings form).

5. **Mention Accessibility Upfront**
   - Explicitly ask for ARIA attributes, labels, semantic HTML.
   - If you don't ask, it won't be included.
