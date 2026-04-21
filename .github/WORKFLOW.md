# Agent Workflow & Scheduling Guide

## Overview

This guide shows you the complete development workflow and when to invoke each agent. Follow this workflow to ensure code quality, security, user experience, and smooth PR creation.

**8 Custom Agents at Your Service:**
1. **Feature Generator** - Creates feature specifications and scaffolding
2. **Code Review** - Reviews code quality
3. **Security Audit** - Audits for vulnerabilities
4. **UX Reviewer** - Reviews UI/UX design
5. **Test Generator** - Generates test suites
6. **Feature Review** - Validates feature completeness
7. **PR Creator** - Creates pull requests
8. **PR Reviewer** - Auto-reviews and approves PRs

---

## Complete Development Workflow

### Phase 1: Planning & Design (Pre-Development)

#### Step 1: Generate Feature Specification
**When**: When starting a new feature or task  
**Agent**: `/feature-generator`

**What to do:**
```
Provide your feature idea, user story, or requirement:
- "Generate a feature for user authentication with email verification"
- "Create scaffolding for a payment processing system"
- "Generate specs from this user story: As a customer, I want..."
```

**What you get:**
- ✅ Feature specification (FEATURE.md)
- ✅ Code structure scaffolding
- ✅ Test file templates
- ✅ Implementation guide
- ✅ Design considerations

**Output Location**: 
- Feature spec: `.github/FEATURE.md` (or feature-specific folder)
- Code structure: Generated folder tree with TODO comments

---

#### Step 2: Design Review (Designer/UX Specialist)
**When**: Before implementation, after mockups are created  
**Agent**: `/ux-reviewer`

**What to do:**
```
Share your design mockup or Figma link:
- "Review this Figma design for accessibility"
- "Check this component for WCAG 2.1 AA compliance"
- "Review the mobile design for touch accessibility"
```

**What you get:**
- ✅ Accessibility audit (WCAG 2.1)
- ✅ Usability review (Nielsen's heuristics)
- ✅ Design system compliance check
- ✅ Mobile/responsive feedback
- ✅ Actionable improvement recommendations

**Before Moving Forward**: Address all 🔴 Critical issues

---

### Phase 2: Implementation

#### Step 3: Implement Feature Code
**When**: After specification and design review pass  
**Agent**: None (you code)

**What to do:**
- Implement feature based on generated scaffold
- Follow code structure and test templates
- Create feature branch: `feature/[feature-name]`

**Best Practice**: 
- Commit frequently with atomic, descriptive commits
- Use conventional commits: `feat:`, `fix:`, `chore:`, etc.

---

#### Step 4: Code Quality Review
**When**: After implementing code, before creating PR  
**Agent**: `/code-review`

**What to do:**
```
Ask for code quality review:
- "Review js/script.js for quality and best practices"
- "Perform code review on the authentication feature"
- "Review the newly implemented components"
```

**What you get:**
- ✅ Code quality assessment
- ✅ Best practice violations
- ✅ Performance issues
- ✅ Style consistency feedback
- ✅ Specific improvement suggestions

**Before Moving Forward**: 
- Address 🔴 Critical issues
- Address 🟠 High priority issues
- Consider 🟡 Medium priority suggestions

---

#### Step 5: Security Audit
**When**: After code review passes  
**Agent**: `/security-audit`

**What to do:**
```
Request security audit:
- "Audit the authentication code for security vulnerabilities"
- "Check for hardcoded credentials and data exposure"
- "Perform security audit on the new API endpoints"
```

**What you get:**
- ✅ Security vulnerability assessment
- ✅ OWASP Top 10 compliance check
- ✅ Dependency security review
- ✅ Authentication/authorization audit
- ✅ Data exposure risk assessment

**Before Moving Forward**:
- Fix all 🔴 Critical vulnerabilities
- Fix all 🟠 High severity issues
- Plan mitigation for 🟡 Medium issues

---

#### Step 6: UX Implementation Review
**When**: After code review, when UI/UX is implemented  
**Agent**: `/ux-reviewer`

**What to do:**
```
Review the implementation:
- "Review the implemented login form for accessibility"
- "Check the new UI components for design system compliance"
- "Audit the payment form for touch accessibility"
```

**What you get:**
- ✅ Implementation vs design audit
- ✅ Accessibility (WCAG 2.1) status
- ✅ Design system adherence check
- ✅ Interaction pattern review
- ✅ Mobile responsiveness verification

**Before Moving Forward**:
- Fix 🔴 Critical accessibility violations
- Address 🟠 Major usability issues
- Note 🟡 Minor suggestions for polish

---

#### Step 7: Generate Tests
**When**: After code review and security audit pass  
**Agent**: `/test-generator`

**What to do:**
```
Generate comprehensive tests:
- "Generate Jest tests for the authentication service"
- "Create tests for all functions in user.service.js"
- "Generate tests with edge cases and error scenarios"
```

**What you get:**
- ✅ Complete Jest test suite
- ✅ Unit test templates
- ✅ Integration test templates
- ✅ Edge case coverage
- ✅ Error handling tests
- ✅ Mock setup and fixtures

**Next**:
- Implement tests (fill in the TODOs)
- Run tests: `npm test`
- Verify all tests pass ✅
- Verify coverage >80%

**Before Moving Forward**:
- All tests passing ✅
- Coverage ≥ 80%
- No test failures

---

### Phase 3: Pre-Release Quality Gates

#### Step 8: Feature Completeness Review
**When**: Before creating PR, after all tests pass  
**Agent**: `/feature-review`

**What to do:**
```
Validate feature completeness:
- "Review the feature against the requirements - is it complete?"
- "Validate the feature implementation against the specification"
- "Check if all acceptance criteria are met"
```

**What you get:**
- ✅ Requirements completeness check
- ✅ Test coverage assessment
- ✅ Documentation completeness review
- ✅ Backward compatibility verification
- ✅ Performance impact assessment
- ✅ Risk evaluation

**Before Moving Forward**:
- Feature must be "Ready" or "Ready with Caveats"
- No Critical or High risk issues
- All acceptance criteria met

---

### Phase 4: Pull Request Management

#### Step 9: Create Pull Request
**When**: After feature review passes, ready to submit PR  
**Agent**: `/pr-creator`

**What to do:**
```
Create the pull request:
- "Create a PR for this feature after code review and tests pass"
- "Generate PR and validate all quality gates"
- "Create PR with deployment notes and review checklist"
```

**What you get:**
- ✅ PR validation report
- ✅ Auto-generated PR description
- ✅ PR metadata (labels, reviewers, issue links)
- ✅ Review checklist
- ✅ Deployment notes
- ✅ Direct PR link

**Quality Gates Validated**:
- ✅ Code review approved
- ✅ Security audit approved
- ✅ Tests passing (>80% coverage)
- ✅ Feature review completed
- ✅ Documentation complete

---

#### Step 10: PR Review & Approval
**When**: After PR is created  
**Agent**: `/pr-reviewer`

**What to do:**
```
Request automatic PR review:
- "Review this PR and let me know if it's ready to merge"
- "Should we approve this PR or request changes?"
- "Evaluate the PR against quality standards"
```

**What you get**:
- ✅ Comprehensive PR analysis
- ✅ Approval/rejection decision
- ✅ Detailed findings with severity
- ✅ Actionable feedback

**Possible Outcomes**:
1. 🟢 **APPROVED** → Ready to merge ✅
2. 🟡 **REQUEST HUMAN REVIEW** → Escalated for team review
3. 🔴 **REQUEST CHANGES** → Address issues and resubmit

---

## Quick Reference: Agent Invocation Order

```
1. Feature Planning
   └─ /feature-generator
      ↓
2. Design Phase
   └─ /ux-reviewer (on mockups)
      ↓
3. Implementation
   ├─ Code implementation (no agent)
   ├─ /code-review (on completed code)
   ├─ /security-audit (after code review passes)
   ├─ /ux-reviewer (on UI implementation)
   └─ /test-generator (after security audit)
      ↓
4. Testing
   └─ Run tests / ensure >80% coverage (no agent)
      ↓
5. Final Validation
   └─ /feature-review (completeness check)
      ↓
6. PR Submission
   ├─ /pr-creator (create PR)
   └─ /pr-reviewer (auto-review)
      ↓
7. Merge & Deploy ✅
```

---

## Agent Usage Guide by Phase

### For Developers

#### Daily Development
```bash
# Start of feature development
/feature-generator
→ Generate spec and scaffold

# After implementing code
/code-review
→ Get quality feedback
→ Fix issues

/security-audit
→ Verify no vulnerabilities
→ Address findings

/test-generator
→ Generate test templates
→ Implement and run tests
```

#### Before PR
```bash
/feature-review
→ Validate completeness
→ Ensure all gates pass

/pr-creator
→ Create PR with full context
```

#### PR Review
```bash
/pr-reviewer
→ Get automatic review
→ Merge if approved
```

### For Designers

#### Design Phase
```bash
/ux-reviewer
→ Review Design System compliance
→ Check accessibility (WCAG 2.1)
→ Validate usability
→ Approve before handoff to dev
```

#### After Implementation
```bash
/ux-reviewer
→ Verify implementation matches design
→ Spot-check accessibility
→ Validate mobile responsiveness
```

### For QA/Testers

#### Testing Phase
```bash
/test-generator
→ Review generated test coverage
→ Add additional test cases
→ Run full test suite
→ Verify coverage >80%
```

#### Pre-Release
```bash
/feature-review
→ Validate all requirements met
→ Check test coverage
→ Verify no regressions
```

---

## Workflow Decision Tree

```
START: Have a feature idea?
  ├─ YES → /feature-generator (Create spec)
  │         ↓
  │         Mockups needed?
  │         ├─ YES → /ux-reviewer (Design review)
  │         └─ NO → Skip to implementation
  │         ↓
  │ CODE IMPLEMENTATION
  │  ├─ /code-review (Quality check)
  │  ├─ Address issues
  │  ├─ /security-audit (Security check)
  │  ├─ Address vulnerabilities
  │  ├─ /ux-reviewer (UI review)
  │  ├─ /test-generator (Test coverage)
  │  ├─ Run tests (>80% coverage)
  │  └─ All green?
  │      ├─ YES → /feature-review
  │      │         ↓
  │      │         Ready?
  │      │         ├─ YES → /pr-creator
  │      │         │         ↓
  │      │         │         /pr-reviewer
  │      │         │         ↓
  │      │         │         Approved?
  │      │         │         ├─ YES → Merge ✅
  │      │         │         └─ NO → Fix & resubmit
  │      │         └─ NO → Back to implementation
  │      └─ NO → Fix code & restart from /code-review
  │
  └─ NO → All done! 🎉
```

---

## Best Practices & Tips

### ✅ Do's
- ✅ Run agents **in sequence** - don't skip steps
- ✅ Fix **all Critical issues** before moving forward
- ✅ Address **High priority issues** before PR
- ✅ Run tests **locally** before PR creation
- ✅ Use **atomic commits** with clear messages
- ✅ Keep PRs **focused and small** (<500 lines ideally)
- ✅ Address **all agent feedback** before merging
- ✅ Test **mobile responsiveness** yourself
- ✅ Verify **accessibility** with screen readers if possible

### ❌ Don'ts
- ❌ Skip security audit (always run it)
- ❌ Create PR without tests (run test generator)
- ❌ Ignore Critical/High issues (fix before PR)
- ❌ Merge without PR reviewer approval
- ❌ Rush through feature review
- ❌ Assume design is accessible (always review)
- ❌ Create huge PRs (breaks review effectiveness)
- ❌ Commit directly to main (always use branches)

---

## Timeline Estimates

| Phase | Agent(s) | Time | Notes |
|-------|---------|------|-------|
| 1. Planning | `/feature-generator` | 15-30 min | One-time specification |
| 2. Design | `/ux-reviewer` | 20-40 min | Review mockups |
| 3. Implementation | Manual coding | 2-8 hours | Depends on complexity |
| 4. Code Review | `/code-review` | 5-10 min | Agent runs instantly |
| 5. Security | `/security-audit` | 5-10 min | Agent runs instantly |
| 6. UX Check | `/ux-reviewer` | 5-10 min | Implementation review |
| 7. Tests | `/test-generator` + run | 30-60 min | Generate + implement tests |
| 8. Feature Review | `/feature-review` | 5-10 min | Final validation |
| 9. PR Creation | `/pr-creator` | 2-5 min | Auto-generates PR |
| 10. PR Review | `/pr-reviewer` | 1-2 min | Auto-approval/feedback |

**Total**: ~3-12 hours depending on complexity (mostly implementation time)

---

## Example: Real Workflow

### Feature: User Authentication
```
Monday 9 AM
├─ /feature-generator
│  → Get spec, scaffold, test templates
│  → Read FEATURE.md and implementation guide
│
├─ Designer creates Figma mockup
│
Monday 11 AM
├─ /ux-reviewer (on Figma design)
│  → Check WCAG 2.1 AA compliance
│  → Verify design system usage
│  → Get accessibility feedback
│
├─ Designer adjusts design based on feedback
│
Monday 2 PM → Wednesday 5 PM
├─ Developer implements feature
│  → Commit: feat: add user authentication
│  → Follow generated code structure
│
Wednesday 5 PM
├─ /code-review
│  → Find 3 code quality issues
│  → Fix issues
│
├─ /security-audit
│  → Find password hashing issue
│  → Fix vulnerability
│
├─ /ux-reviewer (on implemented form)
│  → Verify form matches design
│  → Check focus management
│
├─ /test-generator
│  → Generate 25 test cases
│  → Implement tests
│  → npm test → All passing ✅
│  → Coverage: 92% ✅
│
Thursday 9 AM
├─ /feature-review
│  → Verify all requirements met
│  → Check test coverage
│  → Approve feature ✅
│
├─ /pr-creator
│  → PR #42 created automatically
│  → Title, description, labels, reviewers added
│  → Review checklist included
│
├─ /pr-reviewer
│  → Auto-approved ✅
│  → Code follows all standards
│
├─ merge PR
│  → Deploy to production
│
Thursday 10 AM
└─ Feature live! 🚀
```

---

## Troubleshooting

### "Agent says Critical issue - what do I do?"
1. Read the detailed description and example
2. Follow the suggested fix
3. Make the change in your code
4. Re-run the same agent to verify it's fixed

### "Test coverage is below 80%"
1. Run `/test-generator` again
2. Implement the generated test cases
3. Run: `npm test -- --coverage`
4. Verify coverage >80%

### "PR Reviewer says REQUEST CHANGES"
1. Fix the identified issues
2. Commit changes: `git add . && git commit -m "fix: address PR feedback"`
3. Push changes
4. Re-run `/pr-reviewer`

### "Feature Review says not ready"
1. Check the specific gaps identified
2. Address documentation/test/completeness issues
3. Re-run `/feature-review` to verify

---

## Agent Command Reference

| Agent | Command | When to Use |
|-------|---------|------------|
| Feature Generator | `/feature-generator` | Start of feature |
| Code Review | `/code-review` | After implementation |
| Security Audit | `/security-audit` | After code review |
| UX Reviewer | `/ux-reviewer` | Design review & implementation |
| Test Generator | `/test-generator` | Before final testing |
| Feature Review | `/feature-review` | Before PR creation |
| PR Creator | `/pr-creator` | Ready to submit |
| PR Reviewer | `/pr-reviewer` | After PR created |

---

## Questions?

If you're unsure which agent to use:
- **Planning phase?** → `/feature-generator`
- **Design review needed?** → `/ux-reviewer`
- **Code quality check?** → `/code-review`
- **Security concern?** → `/security-audit`
- **Need tests?** → `/test-generator`
- **Ready for PR?** → `/feature-review` then `/pr-creator`
- **PR submitted?** → `/pr-reviewer`

Follow the workflow, trust the agents, ship confidently! 🚀
