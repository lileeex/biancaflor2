import { SvgIcon, SvgIconProps } from "@mui/material";

const DataGridArrowUpIcon = ({ ...props }: SvgIconProps) => (
  <SvgIcon sx={{ width: 20, height: 20, ...props.sx }} {...props}>
    <path
      fill="currentColor"
      d="m8.303 11.596l3.327-3.431a.499.499 0 0 1 .74 0l6.43 6.63c.401.414.158 1.205-.37 1.205h-5.723z"
    />
    <path
      fill="currentColor"
      d="M11.293 16H5.57c-.528 0-.771-.791-.37-1.205l2.406-2.482z"
      opacity="0.5"
    />
  </SvgIcon>
);

export default DataGridArrowUpIcon;
