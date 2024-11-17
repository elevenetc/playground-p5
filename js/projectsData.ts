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
  new Tag("ij"),
  new Tag("swift"),
  new Tag("graphite"),

  new Tag("android"),
  new Tag("java"),
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
  new Project("DraggableView", new Date(2015, 1), tags(["java"])),
  new Project("Interactive canvas", new Date(2016, 1), tags(["android", "java"])),
  new Project("Raytracer", new Date(2016, 4), tags(["android", "java"])),
  new Project("TextSurface", new Date(2016, 6), tags(["android", "kotlin"])),
  new Project("Mobile device manager", new Date(2020, 20), tags(["js", "node", "android", "ios"])),
  new Project("Pinocchio", new Date(2023, 8), tags(["art", "graphite"])),
  new Project("Yo momma KMP app", new Date(2024, 6), tags(["kmp", "kotlin", "ios", "android"])),
  new Project("Hello IDE", new Date(2024, 6), tags(["kotlin", "ij", "swift"])),
  new Project("Diff-Issue plugin", new Date(2024, 6), tags(["kotlin", "ij"])),
  new Project("Batman", new Date(2024, 7), tags(["art", "graphite"])),
  new Project("Objective-C diff tool", new Date(2024, 6), tags(["obj-c", "kotlin"])),
  new Project("Objective-C validation plugin", new Date(2024, 6), tags(["obj-c", "kotlin", "ij"])),
  new Project("Omon", new Date(2024, 10), tags(["art", "graphite"])),
];

export {
  allProjects,
  allTags
}
