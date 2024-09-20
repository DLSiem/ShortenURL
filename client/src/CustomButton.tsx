import { Button, ButtonProps } from "@material-tailwind/react";
import { FC } from "react";

export const CustomButton: FC<ButtonProps> = (props) => {
  return (
    <Button
      {...props}
      placeholder=""
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
    >
      {props.children}
    </Button>
  );
};
