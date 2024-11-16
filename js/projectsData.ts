import Project from "./Project";
import Tag from "./Tag";

const allTags = [
  new Tag("art"),
  new Tag("kotlin"),
  new Tag("kmp"),
  new Tag("js"),
  new Tag("node"),
  new Tag("obj-c"),
  new Tag("ios"),
  new Tag("android"),
]

function tags(titles: String[]): Tag[] {
  const result: Tag[] = [];
  titles.forEach(title => {
    result.push(tag(title));
  })
  return result;
}

function tag(title: String): Tag {
  for (let i = 0; i < allTags.length; i++) {
    const tag = allTags[i];
    if (tag.title === title) {
      return tag;
    }
  }
  throw new Error("Unknown tag: " + title);
}

const allProjects: Project[] = [
  new Project("Mobile sync node js tool", new Date(2020, 20), tags(["js", "node"])),
  new Project("Yo momma KMP app", new Date(2022, 6), tags(["kmp", "kotlin", "ios", "android"])),
  new Project("Objective-C diff tool", new Date(2023, 6), tags(["obj-c", "kotlin"]))
];

export {
  allProjects,
  allTags
}
