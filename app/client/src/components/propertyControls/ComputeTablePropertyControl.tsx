import React from "react";
import BaseControl, { ControlProps } from "./BaseControl";
import { StyledDynamicInput } from "./StyledControls";
import CodeEditor from "components/editorComponents/CodeEditor";
import {
  EditorModes,
  EditorSize,
  EditorTheme,
  TabBehaviour,
} from "components/editorComponents/CodeEditor/EditorConfig";
import { ColumnProperties } from "widgets/TableWidget";
import { isDynamicValue } from "utils/DynamicBindingUtils";

export function InputText(props: {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement> | string) => void;
  isValid: boolean;
  errorMessage?: string;
  evaluatedValue?: any;
  expected?: string;
  placeholder?: string;
  dataTreePath?: string;
  additionalDynamicData: Record<string, Record<string, unknown>>;
}) {
  const {
    errorMessage,
    expected,
    value,
    isValid,
    onChange,
    placeholder,
    dataTreePath,
    evaluatedValue,
    additionalDynamicData,
  } = props;
  return (
    <StyledDynamicInput>
      <CodeEditor
        input={{
          value: value,
          onChange: onChange,
        }}
        evaluatedValue={evaluatedValue}
        expected={expected}
        dataTreePath={dataTreePath}
        meta={{
          error: isValid ? "" : errorMessage,
          touched: true,
        }}
        theme={EditorTheme.DARK}
        mode={EditorModes.TEXT_WITH_BINDING}
        tabBehaviour={TabBehaviour.INDENT}
        size={EditorSize.EXTENDED}
        placeholder={placeholder}
        additionalDynamicData={additionalDynamicData}
      />
    </StyledDynamicInput>
  );
}

class ComputeTablePropertyControl extends BaseControl<ControlProps> {
  render() {
    const {
      expected,
      propertyValue,
      isValid,
      label,
      dataTreePath,
      validationMessage,
    } = this.props;
    const value =
      propertyValue &&
      propertyValue.includes(
        `{{${this.props.widgetProperties.widgetName}.tableData.map((currentRow) => `,
      )
        ? `{{${propertyValue.substring(
            `{{${this.props.widgetProperties.widgetName}.tableData.map((currentRow) => `
              .length,
            propertyValue.length - 3,
          )}}}`
        : propertyValue;
    const evaluatedProperties = this.props.widgetProperties;
    const columns: ColumnProperties[] = [
      ...evaluatedProperties.primaryColumns,
      ...evaluatedProperties.derivedColumns,
    ];
    const currentRow: { [key: string]: any } = {};
    for (let i = 0; i < columns.length; i++) {
      currentRow[columns[i].id] = undefined;
    }
    return (
      <InputText
        label={label}
        value={value}
        onChange={this.onTextChange}
        isValid={isValid}
        errorMessage={validationMessage}
        expected={expected}
        dataTreePath={dataTreePath}
        additionalDynamicData={{
          currentRow,
        }}
      />
    );
  }

  onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement> | string) => {
    let value = "";
    if (typeof event !== "string") {
      value = event.target.value;
    } else {
      value = event;
    }
    if (value && isDynamicValue(value)) {
      const trimmedValue = value.substring(2, value.length - 2);
      if (trimmedValue) {
        this.updateProperty(
          this.props.propertyName,
          `{{${this.props.widgetProperties.widgetName}.tableData.map((currentRow) => ${trimmedValue})}}`,
        );
      } else {
        this.updateProperty(this.props.propertyName, "");
      }
    } else {
      this.updateProperty(this.props.propertyName, value);
    }
  };

  static getControlType() {
    return "COMPUTE_VALUE";
  }
}

export default ComputeTablePropertyControl;
