const core = require('@actions/core');
const github = require('@actions/github');
const isMain = require('../util/_isMainBranch');

const octokit = github.getOctokit(core.getInput('GITHUB_TOKEN', { required: true }));

const tagProjects = async versionMap => {
  core.startGroup('Generate Version Tags');
  if (await isMain()) {
    for (const project of Object.keys(versionMap)) {
      const { tag } = versionMap[project];
      core.info(`Tagging ${project} with ${tag}`);
      await octokit.git.createRef({
        ...github.context.repo,
        ref: `refs/tags/${tag}`,
        sha: github.context.sha,
      });
    }
  } else {
    core.info('No tags will be generated for branches');
  }
  core.endGroup();
};

module.exports = { tagProjects };
