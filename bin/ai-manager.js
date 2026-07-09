#!/usr/bin/env node
// bin/ai-manager.js
// AI Executive Office — Resource Briefing CLI Prototype
// Node.js built-ins only. No third-party dependencies.
// Implements: Observe → Think → Advise → Remind

'use strict';

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const DEFAULT_SNAPSHOT_PATH = path.join(
  path.dirname(__dirname),
  'data',
  'resources.example.json'
);

const SNAPSHOT_PATH = process.env.AI_MANAGER_SNAPSHOT || DEFAULT_SNAPSHOT_PATH;

const QUOTA_LOW_THRESHOLD = 20;
const RESET_WARN_HOURS = 2;

// ---------------------------------------------------------------------------
// Status / cost / confidence display helpers
// ---------------------------------------------------------------------------

const STATUS_ICON = {
  available:    '✓',
  warning:      '⚠',
  limited:      '⚠',
  exhausted:    '✗',
  cooling_down: '⏳',
  unknown:      '?',
  disabled:     '✗',
};

const COST_DISPLAY = {
  low:     'low',
  medium:  'medium',
  high:    'HIGH',
  unknown: 'unknown',
};

function icon(status) {
  return STATUS_ICON[status] || '?';
}

// ---------------------------------------------------------------------------
// Snapshot loading
// ---------------------------------------------------------------------------

function loadSnapshot(filePath) {
  if (!fs.existsSync(filePath)) {
    die(
      `Snapshot file not found: ${filePath}\n` +
      `Copy data/resources.example.json to ${filePath} and edit it.`
    );
  }

  let raw;
  try {
    raw = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    die(`Cannot read snapshot: ${e.message}`);
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    die(`Invalid JSON in snapshot: ${e.message}`);
  }

  if (!data.resources || !Array.isArray(data.resources)) {
    die(`Snapshot must contain a "resources" array.`);
  }

  if (data.resources.length === 0) {
    die(`Snapshot contains no resource entries.`);
  }

  return data.resources;
}

// ---------------------------------------------------------------------------
// Time helpers
// ---------------------------------------------------------------------------

function parseResetAt(resetAt) {
  if (!resetAt || resetAt === 'unknown') return null;
  const d = new Date(resetAt);
  return isNaN(d.getTime()) ? null : d;
}

function hoursUntil(date) {
  if (!date) return null;
  return (date.getTime() - Date.now()) / (1000 * 60 * 60);
}

function formatDate(date) {
  if (!date) return 'unknown';
  return date.toLocaleString('zh-TW', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
  });
}

// ---------------------------------------------------------------------------
// Rule-based scoring
// ---------------------------------------------------------------------------

// Task classification: returns a list of preferred provider ids (lowercase)
function classifyTask(task) {
  const t = task.toLowerCase();

  const categories = {
    coding:        /\b(bug|fix|code|implement|程式|修|debug|refactor|test|寫|測試|功能|feature)\b/,
    architecture:  /\b(architect|design|system|架構|設計|structure|api|interface|module|元件)\b/,
    documentation: /\b(doc|document|write|readme|spec|文件|說明|規格|draft)\b/,
    research:      /\b(research|study|compare|分析|調查|explore|learn|survey|查|了解)\b/,
  };

  for (const [cat, pattern] of Object.entries(categories)) {
    if (pattern.test(t)) return cat;
  }
  return 'general';
}

const TASK_PREFERRED_PROVIDERS = {
  coding:        ['codex', 'claude', 'antigravity'],
  architecture:  ['chatgpt', 'claude'],
  documentation: ['gemini', 'chatgpt', 'antigravity'],
  research:      ['gemini', 'chatgpt'],
  general:       ['chatgpt', 'gemini', 'claude', 'antigravity'],
};

// Score a single resource for a task. Returns { score, reasons, warnings }.
function scoreResource(r, taskCategory, taskText) {
  let score = 0;
  const reasons = [];
  const warnings = [];

  // Hard disqualification
  if (['exhausted', 'cooling_down', 'disabled'].includes(r.status)) {
    return { score: -999, disqualified: true, disqualReason: `status is ${r.status}`, warnings };
  }

  // Unknown-status: only fallback
  if (r.status === 'unknown') {
    score -= 30;
    warnings.push('status unknown — treat as fallback only');
  }

  // Available / warning / limited
  if (r.status === 'available') { score += 20; reasons.push('status available'); }
  if (r.status === 'warning')   { score += 5;  warnings.push('quota warning'); }
  if (r.status === 'limited')   { score -= 5;  warnings.push('limited availability'); }

  // Quota
  if (r.quotaLevel < QUOTA_LOW_THRESHOLD) {
    score -= 20;
    warnings.push(`quota low at ${r.quotaLevel}`);
  } else if (r.quotaLevel >= 60) {
    score += 10;
    reasons.push(`quota healthy at ${r.quotaLevel}`);
  } else {
    score += 3;
  }

  // Reset timing
  const resetDate = parseResetAt(r.resetAt);
  const hrs = hoursUntil(resetDate);
  if (hrs !== null && hrs > 0 && hrs <= RESET_WARN_HOURS) {
    warnings.push(`resets in ~${Math.round(hrs * 60)} min — consider waiting`);
  }

  // Task fit
  const preferred = TASK_PREFERRED_PROVIDERS[taskCategory] || [];
  const providerKey = r.provider.toLowerCase();
  const toolKey = r.tool.toLowerCase();
  const match = preferred.findIndex(
    p => providerKey.includes(p) || toolKey.includes(p) || r.id.toLowerCase().includes(p)
  );
  if (match === 0) {
    score += 25;
    reasons.push(`top match for ${taskCategory} tasks`);
  } else if (match === 1) {
    score += 15;
    reasons.push(`strong match for ${taskCategory} tasks`);
  } else if (match > 1) {
    score += 8;
    reasons.push(`good match for ${taskCategory} tasks`);
  } else {
    score -= 5;
  }

  // Context owner
  if (r.contextOwner && r.contextOwner !== 'none') {
    score += 15;
    reasons.push(`holds active context (${r.contextOwner})`);
  }

  // Cost
  if (r.costLevel === 'high') {
    score -= 10;
    warnings.push('high cost — justify usage');
  } else if (r.costLevel === 'low') {
    score += 5;
    reasons.push('low cost');
  }

  return { score, disqualified: false, reasons, warnings };
}

// ---------------------------------------------------------------------------
// Reminder generation
// ---------------------------------------------------------------------------

function generateReminders(resources) {
  const reminders = [];

  for (const r of resources) {
    const resetDate = parseResetAt(r.resetAt);
    const hrs = hoursUntil(resetDate);

    // Reset imminent
    if (hrs !== null && hrs > 0 && hrs <= RESET_WARN_HOURS) {
      reminders.push(
        `⏰ ${r.provider} (${r.id}) resets in ~${Math.round(hrs * 60)} min at ${formatDate(resetDate)}.`
      );
    }

    // Low quota
    if (r.quotaLevel < QUOTA_LOW_THRESHOLD && !['exhausted', 'disabled'].includes(r.status)) {
      reminders.push(
        `⚠ ${r.provider} (${r.id}) quota is low at ${r.quotaLevel}. Avoid large tasks.`
      );
    }

    // High cost
    if (r.costLevel === 'high') {
      reminders.push(
        `💰 ${r.provider} (${r.id}) cost level is HIGH. Use only when value justifies cost.`
      );
    }

    // Context owner
    if (r.contextOwner && r.contextOwner !== 'none') {
      reminders.push(
        `🔗 ${r.provider} (${r.id}) holds active context [${r.contextOwner}]. Preserve continuity.`
      );
    }

    // Cooling down
    if (r.status === 'cooling_down') {
      const resetStr = resetDate ? ` until ${formatDate(resetDate)}` : '';
      reminders.push(
        `⏳ ${r.provider} (${r.id}) is cooling down${resetStr}. Wait before using.`
      );
    }

    // Unknown status
    if (r.status === 'unknown') {
      reminders.push(
        `? ${r.provider} (${r.id}) status is unknown. Verify before relying on it.`
      );
    }

    // Exhausted
    if (r.status === 'exhausted') {
      const resetStr = resetDate ? ` Resets at ${formatDate(resetDate)}.` : '';
      reminders.push(
        `✗ ${r.provider} (${r.id}) is exhausted.${resetStr}`
      );
    }
  }

  return reminders;
}

// ---------------------------------------------------------------------------
// Command: status
// ---------------------------------------------------------------------------

function cmdStatus(resources) {
  console.log('\nAI Resource Status');
  console.log('='.repeat(50));

  for (const r of resources) {
    const resetDate = parseResetAt(r.resetAt);
    const hrs = hoursUntil(resetDate);
    const resetDisplay = resetDate
      ? `${formatDate(resetDate)}${hrs !== null && hrs > 0 && hrs <= RESET_WARN_HOURS ? ' ⏰' : ''}`
      : 'unknown';

    console.log(`\n${icon(r.status)} ${r.id}`);
    console.log(`  provider:       ${r.provider}`);
    console.log(`  tool:           ${r.tool}`);
    console.log(`  model:          ${r.model}`);
    console.log(`  status:         ${r.status}`);
    console.log(`  quota:          ${r.quotaLevel}`);
    console.log(`  reset:          ${resetDisplay}`);
    console.log(`  cost:           ${COST_DISPLAY[r.costLevel] || r.costLevel}`);
    console.log(`  context owner:  ${r.contextOwner || 'none'}`);
    console.log(`  confidence:     ${r.confidence}`);
    if (r.notes) {
      console.log(`  notes:          ${r.notes}`);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`Snapshot: ${SNAPSHOT_PATH}`);
  console.log(`Loaded:   ${resources.length} resource(s)\n`);
}

// ---------------------------------------------------------------------------
// Command: brief
// ---------------------------------------------------------------------------

function cmdBrief(resources) {
  const now = new Date();

  const available = resources.filter(r =>
    ['available', 'warning', 'limited'].includes(r.status)
  );
  const unavailable = resources.filter(r =>
    ['exhausted', 'cooling_down', 'disabled'].includes(r.status)
  );
  const unknown = resources.filter(r => r.status === 'unknown');

  const watchList = resources.filter(r =>
    (r.quotaLevel < QUOTA_LOW_THRESHOLD && r.status !== 'exhausted') ||
    (() => {
      const hrs = hoursUntil(parseResetAt(r.resetAt));
      return hrs !== null && hrs > 0 && hrs <= RESET_WARN_HOURS;
    })()
  );

  console.log('\nDaily AI Resource Briefing');
  console.log(`Generated: ${now.toLocaleString('zh-TW', { hour12: false })}`);
  console.log('='.repeat(50));

  // Available
  if (available.length > 0) {
    console.log('\nAvailable:');
    for (const r of available) {
      const taskHint = (() => {
        const p = r.provider.toLowerCase();
        if (p.includes('codex') || p.includes('antigravity')) return 'coding / hands-on tasks';
        if (p.includes('claude')) return 'coding and architecture';
        if (p.includes('gemini')) return 'research and documentation';
        if (p.includes('chatgpt')) return 'architecture and general reasoning';
        return 'general tasks';
      })();
      const contextNote = r.contextOwner && r.contextOwner !== 'none'
        ? `, context: ${r.contextOwner}`
        : '';
      console.log(`  ${icon(r.status)} ${r.provider} (${r.id}): good for ${taskHint}, quota ${r.quotaLevel}${contextNote}.`);
    }
  } else {
    console.log('\nAvailable: none');
  }

  // Watch
  if (watchList.length > 0) {
    console.log('\nWatch:');
    for (const r of watchList) {
      if (r.quotaLevel < QUOTA_LOW_THRESHOLD) {
        console.log(`  ⚠ ${r.provider} (${r.id}) is below quota threshold at ${r.quotaLevel}.`);
      }
      const hrs = hoursUntil(parseResetAt(r.resetAt));
      if (hrs !== null && hrs > 0 && hrs <= RESET_WARN_HOURS) {
        console.log(`  ⏰ ${r.provider} (${r.id}) resets within ${RESET_WARN_HOURS} hours.`);
      }
    }
  }

  // Unavailable
  if (unavailable.length > 0) {
    console.log('\nNot Available:');
    for (const r of unavailable) {
      const resetDate = parseResetAt(r.resetAt);
      const resetNote = resetDate ? ` Resets at ${formatDate(resetDate)}.` : '';
      console.log(`  ${icon(r.status)} ${r.provider} (${r.id}): ${r.status}.${resetNote}`);
    }
  }

  // Unknown
  if (unknown.length > 0) {
    console.log('\nStatus Unknown (verify before use):');
    for (const r of unknown) {
      console.log(`  ? ${r.provider} (${r.id})`);
    }
  }

  // Advice
  console.log('\nAdvice:');
  const adviceLines = [];

  const contextOwners = available.filter(r => r.contextOwner && r.contextOwner !== 'none');
  for (const r of contextOwners) {
    adviceLines.push(`  → Use ${r.provider} while it holds active context [${r.contextOwner}].`);
  }

  const lowCostAvail = available.filter(r => r.costLevel === 'low' && r.quotaLevel >= QUOTA_LOW_THRESHOLD);
  if (lowCostAvail.length > 0) {
    adviceLines.push(
      `  → Prefer ${lowCostAvail.map(r => r.provider).join(' or ')} for cost-sensitive tasks today.`
    );
  }

  const awaitReset = unavailable.filter(r => {
    const hrs = hoursUntil(parseResetAt(r.resetAt));
    return hrs !== null && hrs > 0;
  });
  for (const r of awaitReset) {
    const hrs = hoursUntil(parseResetAt(r.resetAt));
    adviceLines.push(
      `  → ${r.provider} is unavailable. Reset in ~${Math.round(hrs * 60)} min — plan accordingly.`
    );
  }

  if (adviceLines.length === 0) {
    adviceLines.push('  → No specific advice. Review resource notes and reminders.');
  }
  for (const line of adviceLines) console.log(line);

  // Reminders summary
  const reminders = generateReminders(resources);
  if (reminders.length > 0) {
    console.log('\nReminders:');
    for (const r of reminders) console.log(`  ${r}`);
  }

  console.log('\n' + '='.repeat(50) + '\n');
}

// ---------------------------------------------------------------------------
// Command: recommend
// ---------------------------------------------------------------------------

function cmdRecommend(resources, taskText) {
  if (!taskText || taskText.trim() === '') {
    die('Please provide a task description.\nUsage: node bin/ai-manager.js recommend "your task"');
  }

  const taskCategory = classifyTask(taskText);
  const scored = [];

  for (const r of resources) {
    const result = scoreResource(r, taskCategory, taskText);
    scored.push({ resource: r, ...result });
  }

  scored.sort((a, b) => b.score - a.score);

  const recommended = scored.filter(s => !s.disqualified && s.score > 0);
  const disqualified = scored.filter(s => s.disqualified);
  const lowScore = scored.filter(s => !s.disqualified && s.score <= 0);

  console.log(`\nRecommendation for: "${taskText}"`);
  console.log(`Task category:       ${taskCategory}`);
  console.log('='.repeat(50));

  if (recommended.length === 0) {
    console.log('\n⚠ No eligible resources available for this task.');
    console.log('  Review reminders and resource status.\n');
  } else {
    console.log('\nRecommended:');
    recommended.slice(0, 3).forEach((s, i) => {
      console.log(`  ${i + 1}. ${s.resource.provider} (${s.resource.id})`);
      if (s.reasons.length > 0) {
        console.log(`     reason: ${s.reasons.join(', ')}.`);
      }
      if (s.warnings.length > 0) {
        console.log(`     ⚠ warning: ${s.warnings.join('; ')}.`);
      }
    });
  }

  const notRecommended = [...disqualified, ...lowScore];
  if (notRecommended.length > 0) {
    console.log('\nNot recommended:');
    for (const s of notRecommended) {
      if (s.disqualified) {
        console.log(`  ✗ ${s.resource.provider} (${s.resource.id}): ${s.disqualReason}.`);
      } else {
        console.log(`  − ${s.resource.provider} (${s.resource.id}): lower task fit or cost concern.`);
        if (s.warnings.length > 0) {
          console.log(`    ⚠ ${s.warnings.join('; ')}.`);
        }
      }
    }
  }

  console.log('\nConstraints applied:');
  console.log('  status, quotaLevel, resetAt, costLevel, contextOwner, taskCategory');
  console.log('\n' + '='.repeat(50) + '\n');
}

// ---------------------------------------------------------------------------
// Command: reminders
// ---------------------------------------------------------------------------

function cmdReminders(resources) {
  console.log('\nAI Resource Reminders');
  console.log('='.repeat(50));

  const reminders = generateReminders(resources);

  if (reminders.length === 0) {
    console.log('\n  No active reminders. All resources appear healthy.\n');
  } else {
    console.log('');
    for (const r of reminders) {
      console.log(`  ${r}`);
    }
    console.log('');
  }

  console.log('='.repeat(50) + '\n');
}

// ---------------------------------------------------------------------------
// Error exit
// ---------------------------------------------------------------------------

function die(msg) {
  console.error(`\nai-manager error: ${msg}\n`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

function main() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (!cmd || cmd === '--help' || cmd === '-h') {
    console.log(`
ai-manager — AI Executive Office Resource Briefing CLI

Usage:
  node bin/ai-manager.js status                  Show AI resource status
  node bin/ai-manager.js brief                   Daily resource briefing
  node bin/ai-manager.js recommend "<task>"      Recommend AI for a task
  node bin/ai-manager.js reminders               Show active reminders

Environment:
  AI_MANAGER_SNAPSHOT   Path to resource snapshot JSON
                        (default: data/resources.example.json)

Example:
  node bin/ai-manager.js recommend "我要修 React bug"
  node bin/ai-manager.js recommend "review architecture design"
`);
    process.exit(0);
  }

  const resources = loadSnapshot(SNAPSHOT_PATH);

  switch (cmd) {
    case 'status':
      cmdStatus(resources);
      break;
    case 'brief':
      cmdBrief(resources);
      break;
    case 'recommend':
      cmdRecommend(resources, args.slice(1).join(' '));
      break;
    case 'reminders':
      cmdReminders(resources);
      break;
    default:
      die(
        `Unknown command: ${cmd}\n` +
        `Run: node bin/ai-manager.js --help`
      );
  }
}

main();
