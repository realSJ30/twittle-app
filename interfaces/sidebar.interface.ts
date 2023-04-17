import { IconType } from "react-icons";

export interface ISideBarItem {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}
