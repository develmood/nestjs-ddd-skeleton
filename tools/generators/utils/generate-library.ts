import { libraryGenerator } from '@nrwl/nest';

export async function generateLibrary(tree, schema, layer, scope, name) {
  await libraryGenerator(tree, {
    name: layer,
    directory: name,
    tags: `domain:${name}, type:${layer}`,
    buildable: schema.buildable,
    standaloneConfig: true,
    importPath: `${scope}/${name}-${layer}`
  });
}
