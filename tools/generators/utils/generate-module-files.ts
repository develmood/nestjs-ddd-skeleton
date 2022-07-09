import {generateFiles, joinPathFragments} from "@nrwl/devkit";

export function generateModuleFiles(tree, type, domainRootPath, domainCapitalizedName, domainName, scope) {
  generateFiles(
    tree,
    joinPathFragments(__dirname, `../domain/files/${type}`),
    `${domainRootPath}/${type}/src/lib`,
    {
      domainModuleName: `${domainCapitalizedName}`,
      domainName: domainName,
      namespace: scope,
      'name@dasherize': domainName,
      tmpl: '',
    }
  );
}
