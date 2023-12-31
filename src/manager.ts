import { addons, types } from "@storybook/manager-api";
import { ADDON_ID, TOOL_ID } from "./constants";
import { FigmaComparatorTool } from "./FigmaComparatorTool";

/**
 * Note: if you want to use JSX in this file, rename it to `manager.tsx`
 * and update the entry prop in tsup.config.ts to use "src/manager.tsx",
 */

// Register the addon
addons.register(ADDON_ID, () => {
  // Register the tool
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "Figma Comparator",
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: FigmaComparatorTool,
  });

  // Register the panel
  // addons.add(PANEL_ID, {
  //   type: types.PANEL,
  //   title: "My addon",
  //   match: ({ viewMode }) => viewMode === "story",
  //   render: Panel,
  // });

  // Register the tab
  // addons.add(TAB_ID, {
  //   type: types.TAB,
  //   title: "Figma",
  //   //👇 Checks the current route for the story
  //   route: ({ storyId }) => `/figma/${storyId}`,
  //   //👇 Shows the Tab UI element in myaddon view mode
  //   match: ({ viewMode }) => viewMode === "figma",
  //   render: Tab,
  // });
});
