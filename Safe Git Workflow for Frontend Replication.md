# Safe GitHub Workflow for Production Changes — Jarurat Care Website

This guide explains how to create a separate feature branch, make changes safely, test them, and submit them for review without accidentally modifying the production branch.

**Production branch:** `deploy`

**Golden rule:** Never commit or push your unfinished changes directly to `deploy`. Work on a separate feature branch and use a Pull Request (PR).

---

## 1. Check Your Current Git Status

Open the project folder in VS Code and run:

```bash
git status
git branch --show-current
```

- `git status` shows modified files and uncommitted changes.
- `git branch --show-current` displays your current branch.

If you have uncommitted changes, save or commit them appropriately before switching branches. Do not discard changes blindly.

## 2. Fetch the Latest Repository Updates

```bash
git fetch origin
```

This downloads the latest remote branch information without automatically changing your working files.

If you need to update your local `deploy` branch, first ensure your working tree is clean or your changes are safely stored.

```bash
git switch deploy
git pull --ff-only origin deploy
```

If the local `deploy` branch does not exist, inspect the available remote branches and create a local tracking branch:

```bash
git switch --track origin/deploy
```

Run that last command only if you do not already have a local `deploy` branch.

## 3. Create a Separate Feature Branch

Create your feature branch from the latest `deploy` branch.

Example for a Contact Us page change:

```bash
git switch -c contact-us
```

Other example branch names:

- `home-page`
- `volunteer-page`
- `privacy-policy`
- `doctor-registration`

If you already have a feature branch, switch to it instead of creating it again:

```bash
git switch contact-us
```

Verify the current branch:

```bash
git branch --show-current
git status
```

Make sure you are working on your feature branch, not `deploy`.

## 4. Make Your Changes and Test Locally

Make the required frontend changes.

Install dependencies if this is your first setup:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, commonly:

```text
http://localhost:5173
```

Test the following:

- The updated page displays correctly.
- Navigation and links work.
- Forms and buttons behave as expected.
- The layout works on desktop and mobile.
- Existing pages have not been unintentionally affected.

Run the project's available checks:

```bash
npm run check
npm run build
```

Resolve relevant errors before submitting your changes.

## 5. Review, Commit, and Push Your Feature Branch

Review your changes:

```bash
git status
git diff
```

Stage only the files related to your task. For example:

```bash
git add src/routes/contact-us/
```

Replace the example path with the actual files you changed.

Commit your changes:

```bash
git commit -m "Update Contact Us page"
```

Push your feature branch to GitHub:

```bash
git push -u origin contact-us
```

Replace `contact-us` with your actual feature branch name.

Your changes are now stored on your feature branch. They are not automatically live merely because you pushed them.

## 6. Open a Pull Request

On GitHub:

1. Open the Jarurat Care repository.
2. Select your feature branch.
3. Create a Pull Request.
4. Set the **base branch** to `deploy`.
5. Set the **compare branch** to your feature branch.
6. Describe the changes and tests you performed.
7. Request review from the appropriate team member or project maintainer.

Before merging, verify that the Pull Request contains only the changes intended for your task.

Do not merge until the required review and checks are complete.

## 7. Handle Merge Conflicts Safely

If GitHub reports a merge conflict, do not force-push or overwrite production code.

First, fetch the latest updates:

```bash
git fetch origin
```

Switch to your feature branch:

```bash
git switch contact-us
```

Merge the latest production branch into your feature branch:

```bash
git merge origin/deploy
```

If conflicts occur:

1. Open the conflicted files in VS Code.
2. Review both versions of the code.
3. Keep the correct changes and remove all conflict markers:
   - `<<<<<<<`
   - `=======`
   - `>>>>>>>`
4. Save the resolved files.
5. Test the application again.

Then stage and commit the conflict resolution:

```bash
git add path/to/resolved-file
git commit -m "Resolve merge conflicts for Contact Us page"
```

Push the updated feature branch:

```bash
git push origin contact-us
```

Replace the example branch and file names with your actual values.

Return to the Pull Request and ensure the conflicts are resolved and all required checks pass.

If you are unsure which code to keep, ask the project maintainer before proceeding.

## 8. Merge and Deploy Safely

After the Pull Request is reviewed and approved:

1. Confirm the base branch is `deploy`.
2. Confirm all required checks pass.
3. Merge using the repository's approved merge method.
4. Verify the production deployment status.
5. Open the live website and test the updated page.

If Vercel is configured to deploy from `deploy`, merging into that branch may trigger a production deployment. Verify the actual deployment configuration before relying on this behavior.

Do not push directly to `deploy` unless the project maintainer has explicitly authorized that workflow.

## 9. Important Safety Rules

- Always verify your current branch before making changes.
- Keep feature work separate from production.
- Never commit secrets, API keys, credentials, or `.env` files.
- Do not use `git push --force` on production branches.
- Do not use `git reset --hard` or discard changes unless you understand the consequences.
- Review `git diff` before committing.
- Test your changes before opening a Pull Request.
- Never merge without the required approval.
- Do not assume every branch or deployment uses the same configuration.
- Ask the project maintainer if the correct branch or merge procedure is unclear.

---

## Quick Reference

```bash
# Check status and current branch
git status
git branch --show-current

# Get latest remote information
git fetch origin

# Update production branch
git switch deploy
git pull --ff-only origin deploy

# Create a feature branch
git switch -c contact-us

# Test the application
npm run dev
npm run check
npm run build

# Commit and push your feature branch
git add path/to/changed-files
git commit -m "Update Contact Us page"
git push -u origin contact-us
```

**Remember:** Feature branch → Test → Commit → Push → Pull Request → Review → Merge → Verify deployment.

The purpose of this workflow is to protect the production branch and make every change easier to review and maintain.

*Maintained for the Jarurat Care website development workflow.*
