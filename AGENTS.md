# UNIVERSAL PREMIUM UI/ANIMATION STANDARD

This rule applies universally whenever modifying, fixing, or improving ANY frontend UI. Automatically consider modern premium animations inspired by the quality and interaction style commonly seen in 21st.dev-quality interfaces.

The goal is:
PREMIUM
→ MODERN
→ SMOOTH
→ RESPONSIVE
→ PURPOSEFUL
→ NOT OVER-ANIMATED

==================================================

1. # UNIVERSAL ANIMATION RULE
   Every new or modified UI should be evaluated for appropriate motion.
   Do NOT add animation everywhere just for decoration.
   Use animation where it improves:

- User feedback
- Navigation
- Hierarchy
- Focus
- Discoverability
- Loading states
- Transitions
- Micro-interactions
- Visual polish
  Animations should feel intentional and production-quality.

================================================== 2. 21ST.DEV-STYLE MOTION
========================
Use modern patterns such as:

- Smooth entrance animations
- Fade + slide transitions
- Scale-in components
- Staggered card animations
- Hover elevation
- Magnetic-style interactions where appropriate
- Button hover/press feedback
- Smooth dropdowns
- Animated modals
- Animated tabs
- Expand/collapse transitions
- Skeleton loading
- Shimmer effects
- Animated borders
- Gradient movement
- Subtle glow
- Background motion
- Scroll reveal
- Parallax where genuinely useful
- Number/count animations
- Progress animations
- Toast animations
- Tooltip transitions
- Page transitions
- Shared-element style transitions where practical

Use these selectively.

================================================== 3. MICRO-INTERACTIONS
=====================
Important UI elements should feel responsive. Examples:

BUTTON:
hover → subtle scale/position change → smooth transition
click → press feedback → loading state if async → success/error state

CARD:
hover → subtle elevation → image movement/scale → optional border/glow

INPUT:
focus → smooth border transition → focus ring → optional label transition

MODAL:
open → backdrop fade → content scale + fade
close → reverse animation

DROPDOWN:
open → opacity + translate/scale
close → smooth reverse

================================================== 4. SCROLL ANIMATIONS
====================
For landing pages and content-heavy pages, use subtle scroll-based reveals.
Example:
Section enters viewport → fade → slight upward movement → stagger child elements
Do NOT animate every element independently if it makes the page distracting.
Use staggered animations for: Cards, Feature lists, Statistics, Testimonials, Navigation items, Product grids.

================================================== 5. PREMIUM HERO SECTIONS
========================
Hero sections can use: Animated gradients, Soft background particles, Grid movement, Floating elements, Gradient blobs, Subtle glow, Text reveal, Word/character reveal where appropriate, Image entrance animation.
Keep the animation lightweight and professional. Avoid gimmicky animations.

================================================== 6. LOADING EXPERIENCE
=====================
Never leave the user staring at a frozen UI. For asynchronous operations use:
Loading → skeleton/spinner/progress → success OR error
Examples:
API request → loading indicator
AI generation → typing/generating animation
Page loading → skeleton
Image loading → blur/skeleton transition
Navigation → smooth transition

================================================== 7. AI / CHAT UI
===============
For chatbot interfaces, use premium interaction patterns:
User sends message → message appears smoothly
AI thinking → animated typing indicator
AI response → smooth reveal
Streaming response → natural text appearance
Error → subtle error animation
Do NOT make the animation slow down the user.

================================================== 8. PERFORMANCE RULES
====================
Animations must remain performant. Use CSS hardware acceleration where possible. Never sacrifice framerate or responsiveness for visual flair. Adopt the high-quality 21st.dev-style frontend standards.

- CSS transitions
- GPU-friendly properties

Avoid expensive continuous animations unnecessarily.
Do not cause:

- Layout shifts
- Jank
- High CPU usage
- Excessive re-renders
- Slow page load
- Scroll lag

Respect:
`prefers-reduced-motion`
Users who disable motion should receive an accessible reduced-motion experience.

================================================== 9. RESPONSIVE ANIMATION
=======================
Animations must work correctly on:

- Desktop
- Laptop
- Tablet
- Mobile

Reduce or simplify expensive animations on mobile when necessary.
Never let animation break:

- layout
- scrolling
- touch interaction
- accessibility
- navigation

================================================== 10. DESIGN SYSTEM CONSISTENCY
=============================
Do NOT create random animation styles for every component.
Create reusable motion patterns/tokens where the project's architecture supports it.
For example:

- fast interaction
- standard transition
- slow entrance
- page transition
- modal transition
- stagger transition

Use consistent easing and timing.

================================================== 11. TECHNOLOGY
==============
First inspect the existing project stack.
If the project already uses an animation library, reuse it.
If appropriate for the existing stack, consider production-quality tools such as:

- Framer Motion / Motion
- GSAP
- CSS animations
- Tailwind transitions
- existing project animation utilities

Do NOT install a new library unnecessarily.
Before adding a dependency:
INVESTIGATE
→ check existing dependencies
→ determine whether current tools can handle it
→ install only if genuinely useful

================================================== 12. VISUAL QUALITY STANDARD
===========================
Every UI change should be judged on:
Design + Spacing + Typography + Color + Hierarchy + Responsive behavior + Interaction + Animation + Accessibility + Performance

Do not consider a page finished merely because it functions.
It should also feel polished and modern.

================================================== 13. UNIVERSAL WORKFLOW INTEGRATION
==================================
Combine this animation system with the existing universal workflow:
UNDERSTAND
↓
INVESTIGATE
↓
CHECK EXISTING UI
↓
IMPLEMENT / FIX + ADD APPROPRIATE MOTION
↓
TEST
↓
PLAYWRIGHT VERIFY
↓
CHECK RESPONSIVENESS
↓
CHECK PERFORMANCE
↓
REGRESSION TEST
↓
PASS

If verification fails:
INVESTIGATE AGAIN → FIX → VERIFY AGAIN → Repeat until PASS.

================================================== 14. PLAYWRIGHT VERIFICATION
===========================
For every UI change, use Playwright to verify:

- Page loads
- Animation does not block interaction
- Buttons remain clickable
- Inputs remain usable
- Navigation works
- Modal/dropdown transitions work
- Loading states work
- Mobile layout works
- No console errors
- No failed network requests
- No unexpected layout breakage

Do not try to "verify" animation merely by reading source code.
Actually open and interact with the page.

================================================== 15. IMPORTANT — DO NOT OVERDO IT
================================
Never turn the application into an animation showcase.
Avoid:
❌ Excessive bouncing
❌ Constant moving backgrounds
❌ Huge delays
❌ Distracting particles everywhere
❌ Animation on every text element
❌ Slow page transitions
❌ Unnecessary 3D effects
❌ Motion that hurts usability

Prefer:
✅ Smooth
✅ Subtle
✅ Fast
✅ Intentional
✅ Premium
✅ Interactive
✅ Accessible
✅ Production-ready

==================================================
FINAL STANDARD
==============
From now on, whenever you touch ANY frontend UI in this project or future tasks:
Ask internally:
"Can this interaction be made smoother or more polished with purposeful motion?"
If yes → implement it.
If no → keep it clean.
Never add animation just because this instruction exists.
The final result should feel like a modern premium product interface, with the level of interaction polish expected from high-quality 21st.dev-style frontend work.
