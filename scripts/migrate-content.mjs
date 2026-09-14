import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const legacyRoot = '/Users/chenduo/Desktop/开发项目20260812/TarventGIT/cd-blog';
const destinationRoot = '/Users/chenduo/Desktop/开发项目20260812/TarventGIT/tarvent-blog';
const legacyPosts = path.join(legacyRoot, 'source/_posts');
const contentDir = path.join(destinationRoot, 'src/content/blog');
const publicDir = path.join(destinationRoot, 'public');
const siteBase = '';

const dateFixes = new Map([
	['LeetCode_70(每日).md', '2022-09-10'],
	['paizab096爆弾の大爆発.md', '2022-05-30'],
]);

function listValue(raw = '') {
	const inline = raw.match(/^\[(.*)\]$/)?.[1];
	if (!inline) return raw.trim() ? [raw.trim()] : [];
	return inline.split(',').map((item) => item.trim()).filter(Boolean);
}

function parseLegacyDocument(filename, raw) {
	const normalized = raw.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').trimStart();
	let metadata = '';
	let body = '';

	if (normalized.startsWith('---\n')) {
		const end = normalized.indexOf('\n---', 4);
		metadata = normalized.slice(4, end);
		body = normalized.slice(end + 4).trimStart();
	} else {
		const end = normalized.indexOf('\n---');
		metadata = normalized.slice(0, end);
		body = normalized.slice(end + 4).trimStart();
	}

	const lines = metadata.split('\n');
	const data = { tags: [], categories: [] };
	let activeList = null;
	for (const line of lines) {
		const item = line.match(/^\s*-\s+(.+)$/);
		if (item && activeList) {
			data[activeList].push(item[1].trim());
			continue;
		}
		const match = line.match(/^([A-Za-z_]+):\s*(.*)$/);
		if (!match) continue;
		const [, key, value] = match;
		activeList = null;
		if (key === 'tags' || key === 'categories') {
			data[key] = listValue(value);
			if (!value.trim()) activeList = key;
		} else {
			data[key] = value.trim();
		}
	}

	data.date = dateFixes.get(filename) ?? data.date;
	if (!data.title || !data.date) throw new Error(`Missing title/date in ${filename}`);
	return { data, body };
}

function cleanDescription(value, title) {
	if (value) return value.replace(/^['"]|['"]$/g, '');
	return `${title}：Tarvent 的个人学习与实践记录。`;
}

function safeStem(filename) {
	return filename.replace(/\.md$/i, '').replace(/[\\/:*?"<>|]/g, '-').trim();
}

await rm(contentDir, { recursive: true, force: true });
await mkdir(contentDir, { recursive: true });
await mkdir(publicDir, { recursive: true });
await rm(path.join(publicDir, 'img'), { recursive: true, force: true });
await rm(path.join(publicDir, 'media'), { recursive: true, force: true });
await mkdir(path.join(publicDir, 'media'), { recursive: true });

const files = (await readdir(legacyPosts)).filter((name) => name.endsWith('.md')).sort();
const manifest = [];

for (const filename of files) {
	const sourcePath = path.join(legacyPosts, filename);
	const { data, body: originalBody } = parseLegacyDocument(filename, await readFile(sourcePath, 'utf8'));
	const stem = safeStem(filename);
	let cover;
	if (data.index_img) {
		const imageName = path.basename(data.index_img);
		const coverName = `${safeStem(imageName)}.webp`;
		let coverSource = path.join(legacyRoot, 'source/img', imageName);
		try { await sharp(coverSource).metadata(); } catch { coverSource = path.join(legacyRoot, 'img', imageName); }
		await sharp(coverSource).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(publicDir, 'media', coverName));
		cover = `${siteBase}/media/${encodeURIComponent(coverName)}`;
	}
	const assetSource = path.join(legacyPosts, filename.replace(/\.md$/i, ''));
	const assetDestination = path.join(publicDir, 'post-assets', stem);
	await cp(assetSource, assetDestination, { recursive: true, force: true }).catch(() => undefined);

	const body = originalBody
		.replace(/\{%\s*asset_img\s+([^\s]+)(?:\s+([^%]+?))?\s*%\}/g, (_all, image, alt = '') =>
			`![${alt.trim()}](${siteBase}/post-assets/${encodeURIComponent(stem)}/${encodeURIComponent(image)})`,
		)
		.replace(/^---\s*$/m, '');

	const frontmatter = [
		'---',
		`title: ${JSON.stringify(data.title)}`,
		`description: ${JSON.stringify(cleanDescription(data.description, data.title))}`,
		`pubDate: ${JSON.stringify(data.date)}`,
		`legacyDate: ${JSON.stringify(data.date.slice(0, 10))}`,
		`tags: ${JSON.stringify(data.tags)}`,
		`categories: ${JSON.stringify(data.categories)}`,
		`legacySlug: ${JSON.stringify(stem)}`,
		`draft: ${['oneComputerTwogithub.md', 'JapanWork2023.md'].includes(filename)}`,
		cover ? `cover: ${JSON.stringify(cover)}` : null,
		'---',
		'',
	].filter(Boolean).join('\n');

	await writeFile(path.join(contentDir, filename), `${frontmatter}${body.trim()}\n`);
	manifest.push({ filename, title: data.title, date: data.date, tags: data.tags, categories: data.categories });
}

await writeFile(path.join(destinationRoot, 'content-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Migrated ${manifest.length} posts.`);
