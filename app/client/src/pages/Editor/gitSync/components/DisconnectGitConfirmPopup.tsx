import React from "react";
import Text, { TextType } from "components/ads/Text";
import { HelpIcons } from "icons/HelpIcons";
import { withTheme } from "styled-components";
import styled from "styled-components";
import { Color } from "constants/Colors";
import Dialog from "components/ads/DialogComponent";
import Icon, { IconSize } from "components/ads/Icon";
import { IconProps } from "constants/IconConstants";
import Button, { Category, Size } from "components/ads/Button";
// import AnalyticsUtil from "utils/AnalyticsUtil";
import { useSelector } from "react-redux";
import {
  GIT_DISCONNECT_POPUP_TITLE,
  GIT_DISCONNECT_POPUP_SUBTITLE,
  GIT_DISCONNECT_POPUP_MAIN_HEADING,
} from "constants/messages";
import { getIsDisconnectingGit } from "selectors/gitSyncSelectors";

type Props = {
  isModalOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
};

const HeaderContents = styled.div`
  padding: ${(props) => props.theme.spaces[9]}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${(props) => props.theme.spaces[7]}px;
`;

const Heading = styled.div`
  color: ${(props) => props.theme.colors.modal.headerText};
  display: flex;
  justify-content: center;
  font-weight: ${(props) => props.theme.typography.h1.fontWeight};
  font-size: ${(props) => props.theme.typography.h1.fontSize}px;
  line-height: ${(props) => props.theme.typography.h1.lineHeight}px;
  letter-spacing: ${(props) => props.theme.typography.h1.letterSpacing};
`;

const HeaderRight = styled.div`
  display: flex;
`;

const CloseIconContainer = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.modal.hoverState};
  }
`;

const ActionButtonWrapper = styled.div`
  display: flex;
  margin: 30px 0px 0px;
`;

export const StyledSeparator = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.modal.separator};
  opacity: 0.6;
  height: 1px;
`;

const StyledIcon = styled(Icon)<IconProps>`
  margin: 0px 8px;
  svg {
    .triangle {
      fill: #efa903;
    }
    .symbol {
      fill: #ffffff;
    }
  }
  &:hover {
    .triangle {
      fill: #efa903;
    }
    .symbol {
      fill: #ffffff;
    }
  }
`;

const ActionButton = styled(Button)`
  margin-right: 16px;
`;

const Content = styled.div`
  margin: 8px 0px;
`;

const CloseIcon = HelpIcons.CLOSE_ICON;

const Header = withTheme(
  ({ onClose, theme }: { onClose: () => void; theme: any }) => (
    <>
      <HeaderContents>
        <Heading>
          <StyledIcon
            className="default_cursor"
            clickable={false}
            name="warning-triangle"
            size={IconSize.XL}
          />
          {GIT_DISCONNECT_POPUP_MAIN_HEADING()}
        </Heading>
        <HeaderRight>
          <CloseIconContainer
            data-cy="t--product-updates-close-btn"
            onClick={onClose}
          >
            <CloseIcon
              color={theme.colors.text.normal as Color}
              height={20}
              width={20}
            />
          </CloseIconContainer>
        </HeaderRight>
      </HeaderContents>
      <div style={{ padding: `0 ${theme.spaces[9]}px` }}>
        <StyledSeparator />
      </div>
    </>
  ),
);
// Unsupported Plugin for gen CRUD page
function DisconnectGitConfirmPopup(props: Props) {
  const { isModalOpen, onContinue } = props;
  const handleClose = () => {
    props.onClose();
  };

  return (
    <Dialog
      canEscapeKeyClose
      canOutsideClickClose
      getHeader={() => <Header onClose={props.onClose} />}
      isOpen={isModalOpen}
      setModalClose={handleClose}
    >
      <Content>
        <Text type={TextType.H5}>{GIT_DISCONNECT_POPUP_TITLE()}</Text>
        <br />
        <br />
        <Text type={TextType.P1}>{GIT_DISCONNECT_POPUP_SUBTITLE()}</Text>
      </Content>

      <ActionButtonWrapper>
        <ActionButton
          category={Category.tertiary}
          onClick={() => {
            handleClose();
          }}
          size={Size.medium}
          text="BACK"
        />
        <ActionButton
          category={Category.primary}
          onClick={() => {
            onContinue();
            handleClose();
          }}
          size={Size.medium}
          text="DISCONNECT"
        />
      </ActionButtonWrapper>
    </Dialog>
  );
}

export default DisconnectGitConfirmPopup;