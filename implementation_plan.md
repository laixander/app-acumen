# Workspace Context & Access Control Plan

Yes, this is **100% doable** with our current setup! 

Because we already have robust `workspaceStore`, `courseStore`, and `userStore` instances working, we just need to tie them together. We can use Vue's `computed` properties to dynamically filter the courses in the UI based on whichever workspace is currently active, and hide the settings menu based on the user's role.

Here is the plan to implement these logic updates:

## Proposed Changes

### [MODIFY] `app/pages/app/dashboard.vue` & `app/pages/app/courses/collection.vue`
- Update the computed properties that list courses (like `recentCourses` and `filteredCourses`) to be "workspace-aware".
- **Logic:** 
  - If `workspaceStore.currentWorkspaceId === '1'` (Personal Workspace), only show courses where the author matches the current user (`course.createdBy.name === userStore.profile.fullName`).
  - If any other workspace is selected, show courses where `course.workspaceId === workspaceStore.currentWorkspaceId`.

### [MODIFY] `app/components/WorkspaceMenu.vue`
- Update the dropdown menu `items` array.
- Wrap the "Workspace Settings" and "Workspace Members" items in a conditional check using `workspaceStore.isAdmin` (or `workspaceStore.currentUserRole !== 'Member'`) so they are hidden from standard members.

### [MODIFY] `server/api/courses.ts` (Mock Data)
- Update the mock courses so that they actually belong to different `workspaceId`s (e.g., `'1'`, `'2'`, `'3'`). 
- Make sure some courses have different authors so we can properly test the filtering logic.

## Verification Plan
1. Open the **Personal Workspace** from the top-left menu. Verify that only courses authored by "Alex Johnson" (the mock user) are visible.
2. Switch to **Acme Corp** workspace. Verify that only courses belonging to the Acme workspace are visible, and we can still see their specific authors on the course cards.
3. Check the Workspace dropdown menu while in a workspace where the user is just a "Member" and verify that the "Workspace Settings" link is completely hidden.
