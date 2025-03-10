// Release script 1.0

/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')

const pkgFile = path.resolve(__dirname, '..', 'package.json')
const pkg = require(pkgFile)

const usageString = `
Release a new version of ${pkg?.name ?? 'unknown package'}

> node release.js <version>

version - x.x.x
`

const usage = () => {
  console.info(usageString)
}

const errorExit = (reason) => {
  usage()
  console.error(`${reason}\n`)
  process.exit(1)
}

const runOrExit = (cmd, args, message) => {
  const result = spawnSync(cmd, args, { stdio: 'pipe', encoding: 'utf-8' })
  if (result.status !== 0) {
    console.log(result.stderr)
    errorExit(message)
  }
}

if (!pkg) errorExit('Unable to resolve package.json')

let result = spawnSync('npm', ['show', pkg.name, 'version'], {
  stdio: 'pipe',
  encoding: 'utf-8',
})
const prevVersion = result.stdout.trim()
const newVersion = process.argv[2]

console.log(`Previous version: ${prevVersion}`)

console.log('...verifying branch')
result = spawnSync('git', ['branch', '--show-current'], {
  stdio: 'pipe',
  encoding: 'utf-8',
})
const branch = result.stdout.trim()
if (branch !== 'main') errorExit('Error - must be on `main` branch')

if (newVersion === prevVersion) errorExit('New version cannot match previous version')

if (!/\d+\.\d+\.\d+/.test(newVersion)) errorExit('New version format must be x.x.x')

console.log('...building')

runOrExit('npm', ['run', 'build'], 'Build failed')

console.log('...updating version')

try {
  pkg.version = newVersion
  fs.writeFileSync(pkgFile, `${JSON.stringify(pkg, null, 2)}\n`)
} catch (e) {
  errorExit('Failed to write new version to package.json: ' + e.message)
}

console.log('...committing')

runOrExit('git', ['commit', '-am', `release: v${newVersion}`], 'Release commit failed')

console.log('...tagging')

runOrExit(
  'git',
  ['tag', '-a', `v${newVersion}`, '-m', `Version ${newVersion}`],
  'Release tag failed',
)

console.log('...pushing commit')

runOrExit('git', ['push'], 'Release push failed')

console.log('...pushing tags')

runOrExit('git', ['push', '--tags'], 'Release tag push failed')

console.log(`Released version ${newVersion}\n`)
