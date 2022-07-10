import {
  Tree,
  formatFiles,
  installPackagesTask,
  getWorkspaceLayout,
} from '@nrwl/devkit';
import { DomainOptions } from "./schema";
import {camelize, capitalize, dasherize} from "@nrwl/workspace/src/utils/strings";
import {generateModuleFiles, updateDepConstraints} from "../utils";
import { generateLibrary } from '../utils/generate-library';

export default async function (tree: Tree, schema: DomainOptions) {
  const workspaceScope = `@${getWorkspaceLayout(tree).npmScope}`;
  const domainName = dasherize(schema.name);
  const domainNameCamelized = camelize(schema.name);
  const domainNameCapitalized = capitalize(domainNameCamelized);
  const domainRootPath = `libs/${domainName}`;

  await generateLibrary(tree, schema, 'application', workspaceScope, domainName)
  await generateLibrary(tree, schema, 'domain', workspaceScope, domainName)
  await generateLibrary(tree, schema, 'infrastructure', workspaceScope, domainName)

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
