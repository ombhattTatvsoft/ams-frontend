type selectOption = { value: string | number; label: string }
interface FormField {
  name: string;
  label: string;
  type: string;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
  isPassword?: boolean;
  options?: selectOption[];
  to?: string; // For link type
  minDate?: Date;
  maxDate?: Date;
}

export const createInputField = ({
  name,
  label,
  type = "text",
  disabled = false,
  isPassword = false,
  containerClassName = "",
  className = "",
}: {
  name: string;
  label: string;
  type?: string;
  disabled?: boolean;
  isPassword?: boolean;
  containerClassName?: string;
  className?: string;
}): FormField => {
  return {
    name,
    label,
    type: isPassword ? "password" : type,
    isPassword,
    disabled,
    containerClassName,
    className,
  };
};

export const createSelectDropdown = ({
  name,
  label,
  options,
  containerClassName = "",
}: {
  name: string;
  label: string;
  options: selectOption[];
  containerClassName?: string;
}): FormField => {
  return {
    name,
    label,
    type: "select",
    options,
    containerClassName,
  };
};

export const createCheckBox = ({
  name,
  label,
  containerClassName = "",
  className = "",
}: {
  name: string;
  label: string;
  containerClassName?: string;
  className?: string;
}): FormField => {
  return {
    name,
    label,
    type: "checkbox",
    containerClassName,
    className,
  };
};

export const createLink = ({
  name,
  label,
  to,
  containerClassName = "",
  className = "",
}: {
  name: string;
  label: string;
  to: string;
  containerClassName?: string;
  className?: string;
}): FormField => {
  return {
    name,
    label,
    to,
    type: "link",
    containerClassName,
    className,
  };
};

export const createButton = ({
  name,
  label,
  type = "button",
  containerClassName = "",
  className = "",
}: {
  name: string;
  label: string;
  type?: string;
  containerClassName?: string;
  className?: string;
}): FormField => {
  return {
    name,
    label,
    type,
    containerClassName,
    className,
  };
};

export const createDatePicker = ({
  name,
  label,
  type = "datepicker",
  containerClassName = "",
  className = "",
  minDate,
  maxDate,
}: {
  name: string;
  label: string;
  type?: string;
  containerClassName?: string;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
}): FormField => {
  return {
    name,
    label,
    type,
    containerClassName,
    className,
    minDate,
    maxDate,
  };
};