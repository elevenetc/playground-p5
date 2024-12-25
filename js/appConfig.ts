import {lightenColor, stringToRGB} from "./p5000/colorUtils";

function tagTitleToColor(title: string): [number, number, number] {
  return lightenColor(stringToRGB(title))
}

export {
  tagTitleToColor
}
