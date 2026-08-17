---
description: Fetch/pull origin to sync, then commit and push local changes to GitHub
---

Sync the local branch with the remote, then commit and push any pending changes.

Follow these steps in order:

1. **Sync first.**
   - Run `git status` to see the current branch, staged/unstaged/untracked files.
   - Run `git fetch origin`.
   - Run `git pull origin <current-branch>` (or `git pull --rebase` if the user's git config prefers rebase) to bring the local branch up to date with the remote before making a new commit.
   - If the pull produces merge conflicts, STOP and resolve them with the user rather than proceeding — do not use destructive flags like `--force` or `-X ours/theirs` to paper over conflicts.

2. **Commit local changes (if any).**
   - Run `git diff` and `git status` (again, post-pull) to see what changed.
   - If there is nothing to commit, skip straight to step 3 (still push, in case the pull brought the local branch ahead of what's already been pushed, or there are unpushed prior commits).
   - Stage relevant files by name (avoid `git add -A`/`git add .` if it would sweep in unrelated or sensitive files).
   - Write a concise commit message (1-2 sentences, focused on *why*) that reflects the actual staged diff — do not use a generic placeholder message.
   - Commit using a heredoc, ending with:
     ```
     Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
     Claude-Session: https://claude.ai/code/session_01GiQbaSvDaQYLsutChUVVXb
     ```

3. **Push.**
   - Run `git push origin <current-branch>`.
   - If the branch has no upstream yet, use `git push -u origin <current-branch>`.
   - Never use `--force` unless the user explicitly asks for it in this conversation.

4. **Report** the final `git status` and a one-line summary of what was synced/committed/pushed.
