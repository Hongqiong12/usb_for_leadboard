# USB-SafeBench Leaderboard

This repository contains the leaderboard for USB-SafeBench, displaying the performance metrics of various models.

## Overview

The leaderboard shows:
- Model rankings
- Total Attack Success Rate (ASR)
- Attack Resistance Rate (ARR)
- Detailed metrics for different attack scenarios

## Data Format

The data is stored in `public/models_results.csv` with the following columns:
- Rank
- Model Name
- RIRT, SIRT, RIST, SIST metrics for three scenarios
- Total ASR
- ARR

## Development

1. Install dependencies:
```bash
pnpm install
```

2. Start development server:
```bash
pnpm start
```

3. Build for production:
```bash
pnpm build
```

4. replace other file
将build里的文件复制出来替换成其它的文件

## Deployment

The site is automatically deployed to GitHub Pages through GitHub Actions when changes are pushed to the main branch.

Visit the leaderboard at: https://Hongqiong12.github.io/usb_for_leadboard
 