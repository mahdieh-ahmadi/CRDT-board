'use strict';

const { execSync } = require('child_process');
const path = require('path');

// Simple exec helper with consistent options.
const run = (cmd, options = {}) =>
  execSync(cmd, {
    cwd: process.cwd(),
    stdio: ['pipe', 'pipe', 'inherit'],
    encoding: 'utf8',
    ...options,
  }).trim();

const safeExec = (cmd) => {
  try {
    return run(cmd);
  } catch (error) {
    return null;
  }
};

const args = process.argv.slice(2);
const flags = args.reduce((acc, arg) => {
  const [key, value] = arg.split('=');
  switch (key) {
    case '--dry-run':
      acc.dryRun = true;
      break;
    case '--no-push':
      acc.noPush = true;
      break;
    case '--message':
      acc.message = value || '';
      break;
    case '--auth':
      acc.auth = value;
      break;
    default:
      break;
  }
  return acc;
}, {});

const log = (...msgs) => console.log('[auto-commit]', ...msgs);

const getRemoteUrl = () => run('git remote get-url origin');

const detectAuthMode = (remoteUrl) => {
  if (flags.auth === 'ssh' || flags.auth === 'https') return flags.auth;
  return remoteUrl.startsWith('git@') || remoteUrl.startsWith('ssh://')
    ? 'ssh'
    : 'https';
};

const verifyAuth = (authMode) => {
  log(`Verifying ${authMode.toUpperCase()} authentication...`);

  try {
    // Run the command; execSync throws on non-zero exit code
    execSync('git ls-remote --exit-code origin HEAD', { stdio: 'ignore' });
    console.log(`${authMode} authentication verified ✅`);
  } catch (err) {
    throw new Error(
      `Authentication check failed for ${authMode}. Confirm access and try again.`
    );
  }


  /* const result = safeExec('git ls-remote --exit-code --heads origin HEAD');
  if (!result) {
    throw new Error(
      `Authentication check failed for ${authMode}. Confirm access and try again.`
    );
  } */
};

const classifyFile = (filePath) => {
  const file = filePath.toLowerCase();
  if (file.includes('package-lock') || file.includes('package.json'))
    return 'dependencies';
  if (file.endsWith('.md')) return 'docs';
  if (file.includes('test') || file.includes('__tests__')) return 'tests';
  if (file.endsWith('.css') || file.endsWith('.scss') || file.endsWith('.less'))
    return 'styles';
  if (file.includes('config') || file.endsWith('.config.js')) return 'config';
  if (file.startsWith('app/')) return 'app';
  return 'code';
};

const formatTitle = (files) => {
  const categories = files.reduce((acc, file) => {
    const type = classifyFile(file);
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];
  const [category, count] = topCategory || ['code', files.length];

  const prefixMap = {
    dependencies: 'chore',
    docs: 'docs',
    tests: 'test',
    styles: 'style',
    config: 'chore',
    app: 'feat',
    code: 'chore',
  };

  const labelMap = {
    dependencies: 'dependencies',
    docs: 'docs',
    tests: 'tests',
    styles: 'styles',
    config: 'config',
    app: 'app',
    code: 'code',
  };

  const sample = files.slice(0, 3).map((file) => path.basename(file));
  const suffix = sample.length ? ` (${sample.join(', ')}${files.length > 3 ? ', ...' : ''})` : '';

  return `${prefixMap[category] || 'chore'}: update ${labelMap[category] || 'files'}${count > 1 ? 's' : ''}${suffix}`;
};

const ensureChanges = () => {
  const status = run('git status --porcelain');
  if (!status) {
    log('No changes to commit.');
    process.exit(0);
  }
};

const stageAll = () => {
  run('git add -A');
  const staged = run('git diff --cached --name-only')
    .split('\n')
    .filter(Boolean);
  if (!staged.length) {
    throw new Error('Nothing staged after git add.');
  }
  return staged;
};

const makeCommit = (title) => run(`git commit -m ${JSON.stringify(title)}`);

const pushChanges = () => run('git push origin HEAD');

const main = () => {
  try {
    ensureChanges();

    const remoteUrl = getRemoteUrl();
    const authMode = detectAuthMode(remoteUrl);
    verifyAuth(authMode);

    const stagedFiles = stageAll();
    const commitTitle = flags.message || formatTitle(stagedFiles);

    if (flags.dryRun) {
      log('[dry-run] Would commit with title:', commitTitle);
      log('[dry-run] Would push to origin');
      return;
    }

    log('Committing with title:', commitTitle);
    makeCommit(commitTitle);
    log('Commit created.');

    if (flags.noPush) {
      log('Skipping push (per --no-push).');
    } else {
      log('Pushing to origin...');
      pushChanges();
      log('Push completed.');
    }
  } catch (error) {
    console.error('[auto-commit] Error:', error.message);
    process.exitCode = 1;
  }
};

main();

