const core = require('@actions/core');
const github = require('@actions/github');

const octokit = github.getOctokit(core.getInput('GITHUB_TOKEN', { required: true }));

const tagProjects = async versionMap => {
  core.startGroup('Pushing Version Tags');
  for (const project of Object.keys(versionMap)) {
    const { tag } = versionMap[project];

    core.info(`Tagging ${project} with ${tag}`);
    await octokit.rest.git
      .createRef({
        ...github.context.repo,
        ref: `refs/tags/${tag}`,
        sha: github.context.sha
      })
      .then(() => {})
      .catch(() => {});
  }
  core.endGroup();
};

module.exports = { tagProjects };
