import React, { useMemo } from "react";
import { FIGMA_WRAPPER_CLASS, PARAM_KEY } from "../constants";
import { FigmaParams } from "../types";
import { FigmaComparator } from "../components/FigmaComparator";
import { NoFigmaEnabled } from "../components/NoFigmaEnabled";
import { getCurrentComponentNode } from "../utils/figma";
import { useWindowSize } from "@uidotdev/usehooks";
import { DecoratorFunction } from "@storybook/types";

export const withFigmaComparator: DecoratorFunction = (StoryFn, context) => {
  const compareWithFigma = !!context.globals[PARAM_KEY];
  const figmaParams = context.parameters?.figma as FigmaParams;
  const hasFigmaComponent = !!figmaParams?.component;

  const windowSize = useWindowSize();
  const [fileId, nodeId, comparatorOptions] = useMemo(() => {
    if (!figmaParams) {
      return [null, null, null];
    }
    const figmaNode = getCurrentComponentNode(
      figmaParams?.component,
      windowSize.width
    );
    return [
      figmaNode?.component?.fileId,
      figmaNode?.component?.nodeId,
      figmaNode?.options,
    ];
  }, [figmaParams, windowSize]);

  return (
    <>
      <div style={compareWithFigma ? comparatorOptions?.componentStyle : null}>
        {StoryFn() as React.ReactNode}
      </div>
      <div className={FIGMA_WRAPPER_CLASS}>
        {compareWithFigma &&
          (hasFigmaComponent ? (
            <FigmaComparator
              fileId={fileId}
              nodeId={nodeId}
              currentComponentOptions={comparatorOptions}
              component={figmaParams?.component}
              options={figmaParams?.options}
            />
          ) : (
            <NoFigmaEnabled />
          ))}
      </div>
    </>
  );
};
