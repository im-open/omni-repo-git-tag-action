const core = require('@actions/core');
const { tagProjects } = require('./git');

const getVersionMap = () => {
  const data = core.getInput('version_map', { required: true });
  return JSON.parse(data);
};

const run = async () => {
  const versionMap = getVersionMap();

  await tagProjects(versionMap);
};

run();
