import { CSSProperties } from "react";
type iconType = 'light' | 'dark' | 'vite';
interface SvgIconProps {
  prefix?: string;
  icon: iconType;
  color?: string;
  size?: string | number;
  className?: string;
  style?: CSSProperties;
}
export default function SvgIcon(props: SvgIconProps) {
  const { prefix = 'icon', icon, color = 'currentColor', size = '1em', className, style } = props;
  const symbolId = `#${prefix}-${icon}`
  const svgStyle: CSSProperties = {
    verticalAlign: 'middle',
    width: size,
    height: size,
    color,
    ...style,
  };

  return (
    <svg style={svgStyle} aria-hidden="true" className={className}>
      <use href={symbolId} fill={color} />
    </svg>
  )
}