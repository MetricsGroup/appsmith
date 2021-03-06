import React from "react";
import { ControlIcons } from "icons/ControlIcons";
import { withTheme } from "styled-components";
import { Theme } from "constants/DefaultTheme";
import { EntityTogglesWrapper } from "./ExplorerStyledComponents";
import styled from "styled-components";
import { Colors } from "constants/Colors";

const ToggleIcon = styled(ControlIcons.MORE_VERTICAL_CONTROL)`
  &&& {
    flex-grow: 0;
    width: ${(props) => props.theme.fontSizes[3]}px;
    height: ${(props) => props.theme.fontSizes[3]}px;
    g {
      path {
        fill: ${Colors.GRAY};
      }
    }
  }
`;
export function ContextMenuTrigger(props: {
  className?: string;
  theme: Theme;
}) {
  return (
    <EntityTogglesWrapper className={props.className}>
      <ToggleIcon
        height={props.theme.fontSizes[3]}
        width={props.theme.fontSizes[3]}
      />
    </EntityTogglesWrapper>
  );
}

export default withTheme(ContextMenuTrigger);
