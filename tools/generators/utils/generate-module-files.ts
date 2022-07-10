import {generateFiles, joinPathFragments} from "@nrwl/devkit";

export function generateModuleFiles(tree, type, domainRootPath, domainNameCapitalized, domainName, scope) {
  generateFiles(
    tree,
    joinPathFragments(__dirname, `../domain/files/${type}`),
    `${domainRootPath}/${type}/src/lib`,
    {
      domainModuleName: `${domainNameCapitalized}`,
      domainName: domainName,
      namespace: scope,
      'name@dasherize': domainName,
      tmpl: '',
    }
  );
}
