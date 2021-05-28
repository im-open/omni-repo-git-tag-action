const core = require('@actions/core');
const isMain = require('../util/_isMainBranch');
const { tagProjects } = require('./git');

const getVersionMap = () => {
  const data = core.getInput('version_map', { required: true });
  return JSON.parse(data);
};

const run = async () => {
  if (await isMain()) {
    const versionMap = getVersionMap();

    await tagProjects(versionMap);
  } else {
    core.info('No tags will be generated for branches');
  }
};

run();
