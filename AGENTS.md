<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep notebook lesson content in the supplied JSON data files and render all editions from the same content so preview and print remain consistent.
- Use revision.sheets for lesson-plus-assessment viewing, revision.assessmentSheets for grouped assessments, and revision.octoberSourceOrderSheets for source-order solutions followed by unchanged booklet sheets; all use Paper so print and preview stay consistent.
- Reference uploaded teacher artwork through a Lovable Assets pointer rather than bundling the binary so the supplied image stays available without repository media overhead.
- Use named CSS print pages for portrait and landscape editions because @page rules cannot be conditional descendants of body selectors.
- Build condensed lesson pages from reference-plan.json source IDs with getReferenceSheets and render them inside Paper with portrait printing; selections reuse literal original rules, examples, steps, and notes without mutating the full notebook.
