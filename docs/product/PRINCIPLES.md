# Product Principles

## Status

Accepted for product direction. Changes require explicit review because these
principles guide product tradeoffs across modules and roadmap stages.

## Purpose

ai-manager is an AI-native software engineering platform. These principles
define how it should behave when requirements compete or implementation choices
are unclear. They are product constraints, not slogans.

## 1. Documentation Is the Product Specification

Documentation defines intended behavior, boundaries, and decisions before
implementation. Code realizes an accepted specification; it does not silently
become the specification.

Product, architecture, prompt, workflow, routing, memory, and quota changes must
first be made explicit in the relevant documents.

## 2. AI Augments Developers; It Does Not Replace Them

AI should increase a developer's leverage, reduce repetitive coordination, and
surface useful options. It must not erase developer judgment, accountability, or
ownership.

The product should help people make better decisions and execute them more
effectively, not present autonomous replacement as the goal.

## 3. Every AI Action Should Be Observable

Users should be able to determine what an AI system attempted, which inputs and
constraints shaped the action, what tools it used, and what outcome it produced.

Observability is part of the product behavior. Hidden actions and unexplained
state changes are product failures.

## 4. Every Routing Decision Should Be Explainable

When ai-manager selects a model, it should retain an understandable explanation:
which candidates were eligible, which constraints applied, and why the selected
model was preferred.

A routing result without its reason is incomplete.

## 5. The Manager Manages AI, Not the Other Way Around

Models execute within policies and workflows owned by ai-manager. No individual
model should control the manager's durable policy, memory, permissions, or
scheduling decisions.

The manager remains authoritative even when models recommend changes.

## 6. Humans Remain in Control

Humans define goals, policies, permissions, and consequential review gates.
ai-manager should make automation boundaries explicit and provide a path to
inspect, pause, reject, or override consequential actions.

Human control must be designed into workflows rather than added only as an
emergency mechanism.

## 7. Context Is More Valuable Than Prompts

A well-written instruction cannot compensate for missing product intent,
repository history, constraints, or current state. ai-manager should prioritize
assembling relevant, trustworthy context before optimizing prompt wording.

Prompt quality matters, but context quality determines whether work continues
coherently.

## 8. Memory Belongs to the Manager, Not to Individual Models

Durable knowledge must remain under ai-manager's control so that workflows can
survive model changes, provider changes, and session boundaries.

Models may read or propose memory within policy, but no model is the sole owner
or authoritative store of project memory.

## 9. Quota Is a Scheduling Problem

Quota is not merely a counter displayed after consumption. It is capacity that
must be allocated across tasks, time windows, priorities, and fallback options.

Quota information should influence planning before execution and support
deliberate scheduling decisions.

## 10. The Best Model Is Not Always the Smartest One

Model selection should optimize for the task and its constraints, not for a
single capability ranking. Availability, latency, cost, context capacity,
tool support, reliability, privacy, and required quality can all change the
correct choice.

The preferred model is the least costly eligible model that can satisfy the
documented requirements with acceptable confidence.

## 11. The Best AI Is Not Always the Smartest AI

The best resource is the one that advances the goal under current context,
quota, cost, timing, tool, and risk constraints. Existing context or immediate
availability can matter more than maximum model capability.

## 12. AI Resource Coordination Is as Important as AI Capability

Capability without available quota, credits, tools, context, or time cannot
deliver work. ai-manager treats resource state and scheduling as first-class
product inputs.

## 13. Context Continuity Is a First-Class Resource

Context already held by an advisor, session, or project memory has measurable
value. Reassignment must preserve authoritative sources, decisions, open
questions, and next steps.

## 14. Advisors Advise; Humans Decide

Specialized advisors expose tradeoffs. Decision Engine reconciles their input.
Humans retain final authority over goals, consequential actions, architecture,
permissions, cost, and accepted risk.

## 15. Decisions Reconcile Architecture, Resources, Cost, Risk, and Execution

No single lens owns the decision. Recommendations identify hard constraints,
preferences, conflicts, uncertainty, and the reasons one plan is preferred.

## 16. Continuous Productivity Matters More Than Isolated Task Completion

The product should sustain useful progress across quota resets, unavailable
providers, context handoffs, and review gates. Waiting, reassigning, preserving
context, and splitting work can be better decisions than immediate execution.

## Applying the Principles

Product and architecture proposals should state which principles they support
and where tradeoffs exist. If a proposal conflicts with a principle, the
conflict must be documented and reviewed rather than hidden in implementation.
