#!/usr/bin/env node
/**
 * package.json の patch バージョンを 1 つ上げる
 * コード変更時に自動実行され、ユーザーがどのバージョンを使用しているか把握しやすくする
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgPath = join(__dirname, '..', 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
const [major, minor, patch] = pkg.version.split('.').map(Number);
pkg.version = `${major}.${minor}.${patch + 1}`;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`Version bumped: ${[major, minor, patch].join('.')} → ${pkg.version}`);
