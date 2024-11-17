import {lightenColor, stringToRGB} from "./colorUtils";

function tagTitleToColor(title: string): [number, number, number] {
  return lightenColor(stringToRGB(title))
}

export {
  tagTitleToColor
}
