import * as pulumi from "@pulumi/pulumi";

export const stage = pulumi.getStack();
export const projectName = pulumi.getProject();
export const organizationName = pulumi.getOrganization();

export function getResourceConfig(name: string) {
  return {
    name: getResourceName(name),
    tags: getTags(),
  };
}

export function getTags() {
  return {
    "vfd:stack": stage,
    "vfd:project": projectName,
  };
}

export function getResourceName(name: string) {
  return `${projectName}-${name}-${stage}`;
}
