import React, { useCallback } from "react";
import { FigmaOutline } from "./components/icons/FigmaOutline";
import { FigmaColors } from "./components/icons/FigmaColors";
import { useGlobals } from "@storybook/manager-api";
import { PARAM_KEY, TOOL_ID } from "./constants";
import { IconButton } from "@storybook/components";

export const FigmaComparatorTool = () => {
  const [globals, updateGlobals] = useGlobals();

  const compareWithFigma = globals[PARAM_KEY] || false;

  const toggleMyTool = useCallback(
    () =>
      updateGlobals({
        [PARAM_KEY]: !compareWithFigma,
      }),
    [compareWithFigma]
  );

  return (
    <IconButton
      key={TOOL_ID}
      active={compareWithFigma}
      title="Compare With Figma"
      onClick={toggleMyTool}
    >
      {compareWithFigma ? (
        <FigmaColors height={12} />
      ) : (
        <FigmaOutline height={12} />
      )}
    </IconButton>
  );
};
