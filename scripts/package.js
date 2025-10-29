import archiver from 'archiver';
import { createWriteStream, existsSync } from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createPluginZip() {
	// Read plugin metadata
	const pluginMeta = JSON.parse(
		await readFile(path.join(__dirname, '../plugin.json'), 'utf-8')
	);
	const version = pluginMeta.version;
	const outputName = `${pluginMeta.id}-v${version}.zip`;

	console.log(`📦 Packaging ${pluginMeta.name} v${version}...`);

	// Check if dist exists
	if (!existsSync(path.join(__dirname, '../dist'))) {
		console.error('❌ Error: dist/ directory not found. Run "pnpm run build" first.');
		process.exit(1);
	}

	// Create ZIP output stream
	const zipOutput = createWriteStream(path.join(__dirname, '..', outputName));
	const archive = archiver('zip', { zlib: { level: 9 } });

	// Track errors
	let hasError = false;

	archive.on('error', (err) => {
		console.error('❌ Archive error:', err);
		hasError = true;
		throw err;
	});

	archive.on('warning', (err) => {
		if (err.code === 'ENOENT') {
			console.warn('⚠️  Warning:', err);
		} else {
			console.error('❌ Archive warning:', err);
			hasError = true;
			throw err;
		}
	});

	zipOutput.on('close', () => {
		if (!hasError) {
			const sizeMB = (archive.pointer() / 1024 / 1024).toFixed(2);
			console.log(`✅ Created ${outputName} (${sizeMB} MB)`);
			console.log(`\n📤 Upload this file to GitHub Releases:`);
			console.log(`   gh release create v${version} ${outputName} --title "v${version}" --notes "Release v${version}"`);
		}
	});

	// Pipe archive to output
	archive.pipe(zipOutput);

	// Add files to ZIP
	console.log('  Adding plugin.json...');
	archive.file(path.join(__dirname, '../plugin.json'), { name: 'plugin.json' });

	console.log('  Adding README.md...');
	if (existsSync(path.join(__dirname, '../README.md'))) {
		archive.file(path.join(__dirname, '../README.md'), { name: 'README.md' });
	}

	console.log('  Adding compiled files (main/)...');
	archive.directory(path.join(__dirname, '../dist'), 'main');

	// Optional files
	if (existsSync(path.join(__dirname, '../CHANGELOG.md'))) {
		console.log('  Adding CHANGELOG.md...');
		archive.file(path.join(__dirname, '../CHANGELOG.md'), { name: 'CHANGELOG.md' });
	}

	if (existsSync(path.join(__dirname, '../icon.png'))) {
		console.log('  Adding icon.png...');
		archive.file(path.join(__dirname, '../icon.png'), { name: 'icon.png' });
	}

	// Finalize archive
	await archive.finalize();
}

createPluginZip().catch((err) => {
	console.error('❌ Packaging failed:', err);
	process.exit(1);
});
