const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

// Directories to ignore
const IGNORE_DIRS = [
    'node_modules',
    '.git',
    '.next',
    'dist',
    '.turbo',
    ".vscode",
    'generated'
];

// Files to ignore
const IGNORE_FILES = [
    '.DS_Store'
];

async function generateTree(dir, prefix = '', isLast = true) {
    let output = '';
    const stats = await stat(dir);
    
    if (!stats.isDirectory()) return output;
    
    const files = await readdir(dir);
    const filteredItems = files
        .filter(file => !IGNORE_FILES.includes(file))
        .filter(file => {
            const fullPath = path.join(dir, file);
            const stats = fs.statSync(fullPath);
            return stats.isFile() || 
                   (stats.isDirectory() && !IGNORE_DIRS.includes(file));
        })
        .sort((a, b) => {
            const aStats = fs.statSync(path.join(dir, a));
            const bStats = fs.statSync(path.join(dir, b));
            // Directories come first
            if (aStats.isDirectory() && !bStats.isDirectory()) return -1;
            if (!aStats.isDirectory() && bStats.isDirectory()) return 1;
            return a.localeCompare(b);
        });

    for (let i = 0; i < filteredItems.length; i++) {
        const file = filteredItems[i];
        const fullPath = path.join(dir, file);
        const stats = await stat(fullPath);
        const isLastItem = i === filteredItems.length - 1;
        
        // Add current file/directory to output
        output += `${prefix}${isLast ? '└── ' : '├── '}${file}${stats.isDirectory() ? '/' : ''}\n`;
        
        // If it's a directory, recursively process its contents
        if (stats.isDirectory()) {
            const newPrefix = prefix + (isLast ? '    ' : '│   ');
            output += await generateTree(fullPath, newPrefix, isLastItem);
        }
    }
    
    return output;
}

async function main() {
    try {
        const projectRoot = process.cwd();
        const treeOutput = await generateTree(projectRoot);
        
        // Create generated directory if it doesn't exist
        const generatedDir = path.join(projectRoot, 'generated');
        await mkdir(generatedDir, { recursive: true });
        
        const outputPath = path.join(generatedDir, 'project-tree.txt');
        
        // Add timestamp and header
        const timestamp = new Date().toISOString();
        const header = `Project File Tree\nGenerated at: ${timestamp}\n\n`;
        
        await writeFile(outputPath, header + treeOutput);
        console.log(`File tree has been generated at: ${outputPath}`);
    } catch (error) {
        console.error('Error generating file tree:', error);
        process.exit(1);
    }
}

main();
