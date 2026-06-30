Viewed settings.vue:335-366
Edited settings.vue
Edited settings.vue

Honestly, the slideover has some UX friction for this use case. Here's an honest breakdown:

### Problems with the current slideover approach

| Issue | Detail |
|---|---|
| **Narrow canvas** | Tabs + member list + badges get cramped in a slideover width |
| **Double overlay** | Slideover → Member detail Modal = two layers of overlay, which feels heavy and disorienting |
| **No deep linking** | You can't bookmark or share a direct link to "Pending enrollments for Course X" |
| **Mobile** | Slideovers are awkward on small screens with tab content inside them |

---

### Better alternatives

**1. ✅ Dedicated Route (Recommended)**  
`/app/courses/[courseId]/enrollments`  
A full-page view with tabs (Pending / Approved / Rejected), bulk actions, search, and member detail inline or in a side panel. This is what Teachable, Canvas, and most LMS platforms do.  
→ Clicking "Manage" navigates there. Clean, bookmarkable, scalable.

**2. Full-page Modal (Middle ground)**  
A wide `UModal` (e.g. `max-w-3xl`) that opens over the settings page. Gives more room than a slideover, removes the double-overlay issue, still feels "in context."

**3. Inline Expansion (Simplest)**  
The enrollment list expands inline directly below the Publish Zone card when you click "Manage." No overlays at all — great for a simple list.

---

**My recommendation: Option 1** — a dedicated `/enrollments` route. It's the most scalable (you can add filters, search, bulk approve, CSV export later), and avoids all the overlay problems.

Want me to build that page out?