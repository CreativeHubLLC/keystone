import path from 'path';
import fs from 'fs/promises';
import { format } from 'util';
import { createSystem } from '@keystone-6/core/system';
import {
  validateCommittedArtifacts,
  generateNodeModulesArtifacts,
  generateCommittedArtifacts,
} from '@keystone-6/core/___internal-do-not-use-will-break-in-patch/artifacts';
import { loadConfig } from '@keystone-6/core/___internal-do-not-use-will-break-in-patch/load-config';

const mode = process.argv.includes('update-schemas') ? 'generate' : 'validate';

async function generateArtifactsForProjectDir(projectDir: string) {
  try {
    const config = await loadConfig(projectDir);
    const { graphQLSchema } = createSystem(config);
    if (mode === 'validate') {
      await validateCommittedArtifacts(graphQLSchema, config, projectDir);
    } else {
      await generateCommittedArtifacts(graphQLSchema, config, projectDir);
    }
    await generateNodeModulesArtifacts(graphQLSchema, config, projectDir);
  } catch (err) {
    throw new Error(
      `An error occurred generating/validating the artifacts for the project at ${projectDir}:\n${format(
        err
      )}\n`
    );
  }
}
async function main() {
  const repoRoot = path.resolve(__dirname, '../../../');
  const directoriesOfProjects = [
    path.join(repoRoot, 'examples'),
    path.join(repoRoot, 'tests/test-projects'),
  ];
  const projectDirectories = (
    await Promise.all(
      directoriesOfProjects.map(async dir => {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        const projectPaths: string[] = [];
        await Promise.all(
          entries.map(async entry => {
            if (entry.isDirectory()) {
              const projectPath = path.join(dir, entry.name);
              const projectDirEntries = await fs.readdir(projectPath, { withFileTypes: true });
              for (const entry of projectDirEntries) {
                if (entry.name === 'keystone.ts' && entry.isFile()) {
                  projectPaths.push(projectPath);
                  break;
                }
                if (entry.name === 'keystone-server' && entry.isDirectory()) {
                  const e2eServerProjectPath = path.join(projectPath, 'keystone-server');
                  const keystoneConfigPath = path.join(e2eServerProjectPath, 'keystone.ts');
                  try {
                    if ((await fs.stat(keystoneConfigPath)).isFile()) {
                      projectPaths.push(e2eServerProjectPath);
                      break;
                    }
                  } catch (err: any) {
                    if (err.code !== 'ENOENT') {
                      throw err;
                    }
                  }
                }
              }
            }
          })
        );
        return projectPaths;
      })
    )
  )
    .flat()
    .concat(
      path.join(repoRoot, 'tests/sandbox'),
      path.join(repoRoot, 'packages/core/src/scripts/tests/fixtures/basic-project')
    );

  // this breaks if we do this entirely in parallel (it only seemed to consistently fail on Vercel though)
  // because of Prisma's loading native libraries and child processes stuff and it seems racey
  // it's fine if we just do one and then the rest together though
  // so we do that so we get decent parallelism
  const [firstProject, ...otherProjects] = projectDirectories;

  await generateArtifactsForProjectDir(firstProject);

  await Promise.all(
    otherProjects.map(async projectDir => {
      await generateArtifactsForProjectDir(projectDir);
    })
  );
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
