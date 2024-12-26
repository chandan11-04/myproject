const fs = require('fs');
const path = require('path');

// Directory containing dataset files (e.g., c1.txt, c2.txt, etc.)
const datasetDir = './datasets';
const outputFile = './merged_datasets.json';

const mergedData = [];

// Read and merge all dataset files
fs.readdirSync(datasetDir).forEach(file => {
  if (path.extname(file) === '.txt') { // Process only .txt files
    const filePath = path.join(datasetDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Structure the dataset content
    const caseData = {
      content: fileContent.trim() // Store the full content from the file
    };

    mergedData.push(caseData);
  }
});

// Save the combined dataset
fs.writeFileSync(outputFile, JSON.stringify(mergedData, null, 2));
console.log('Datasets merged successfully!');
