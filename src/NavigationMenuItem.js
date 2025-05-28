// NavigationMenuItem.js
export class NavigationMenuItem {
  constructor({
    name,
    type = "link", // "header", "link", or "divider"
    path = "",
    icon = null,
    component = null,
    children = [],
  }) {
    this.name = name;
    this.type = type;
    this.path = path;
    this.icon = icon;
    this.component = component;
    this.children = children;
  }
}
