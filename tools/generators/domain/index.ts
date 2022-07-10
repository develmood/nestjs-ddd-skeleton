import {
  Tree,
  formatFiles,
  installPackagesTask,
  getWorkspaceLayout,
} from '@nrwl/devkit';
import {libraryGenerator} from '@nrwl/nest';
import { DomainOptions } from "./schema";
import {camelize, capitalize, dasherize} from "@nrwl/workspace/src/utils/strings";
import {generateModuleFiles, updateDepConstraints} from "../utils";

export default async function (tree: Tree, schema: DomainOptions) {
  const workspaceScope = `@${getWorkspaceLayout(tree).npmScope}`;
  const domainName = dasherize(schema.name);
  const domainNameCamelized = camelize(schema.name);
  const domainNameCapitalized = capitalize(domainNameCamelized);
  const domainRootPath = `libs/${domainName}`;

  // create application layer
  await libraryGenerator(tree, {
    name: 'application',
    directory: domainName,
    tags: `domain:${domainName}, type:application`,
    buildable: schema.buildable,
    standaloneConfig: true,
  });

  // create domain layer
  await libraryGenerator(tree, {
    name: 'domain',
    directory: domainName,
    tags: `domain:${domainName}, type:domain`,
    buildable: schema.buildable,
    standaloneConfig: true,
  });

  // create infrastructure layer
  await libraryGenerator(tree, {
    name: 'infrastructure',
    directory: domainName,
    tags: `domain:${domainName}, type:infrastructure`,
    buildable: schema.buildable,
    standaloneConfig: true,
  });

  updateDepConstraints(tree, (depConst => {
    depConst.push({
      sourceTag: `domain:${domainName}`,
      onlyDependsOnLibsWithTags: [`domain:${domainName}`]
    })
  }));

  generateModuleFiles(tree, 'application', domainRootPath, domainNameCapitalized, domainName, workspaceScope);
  generateModuleFiles(tree, 'domain', domainRootPath, domainNameCapitalized, domainName, workspaceScope);
  generateModuleFiles(tree, 'infrastructure', domainRootPath, domainNameCapitalized, domainName, workspaceScope);


  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
