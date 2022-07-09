import { Tree } from "@nrwl/devkit";
import { hasRule } from "./has-rule";

export function updateDepConstraints(
  host: Tree,
  update: (depConst: Array<object>) => void
): void {
  let rule = 'nx-enforce-module-boundaries';
  let esRule = '@nrwl/nx/enforce-module-boundaries';
  let filePath = 'tslint.json';
  let esLintJsonPath = '.eslintrc.json';
  let esLintRcPath = '.eslintrc';


  if(!host.exists(filePath)) {
    if (host.exists(esLintJsonPath)) {
      filePath = esLintJsonPath;
      rule = esRule;
      console.info('Found .eslintrc.json');
    } else if (host.exists(esLintRcPath)) {
      filePath = esLintRcPath;
      rule = esRule;
      console.info('Found .eslintrc');
    } else {
      console.info('Cannot add linting rules, linting config file does not exist');
      return;
    }
  }

  const text = host.read(filePath).toString();
  const json = JSON.parse(text);
  let rules = json;

  if (rules['overrides']) {
    rules = rules['overrides'].find((e) => e.rules && e.rules[esRule]);
  }

  if (!hasRule(filePath, rule, rules)) return;

  const depConst = rules['rules'][rule][1]['depConstraints'] as Array<object>;
  update(depConst);

  const newText = JSON.stringify(json, undefined, 2);
  host.write(filePath, newText);
}
