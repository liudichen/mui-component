import { forwardRef, createElement } from "react";
import type { FunctionComponent, ReactSVG } from "react";

type IconNode = [elementName: keyof ReactSVG, attrs: Record<string, string>][];
interface IconProps extends Partial<Omit<React.ComponentPropsWithoutRef<"svg">, "stroke">> {
  size?: string | number;
  stroke?: string | number;
  title?: string;
}
type Icon = FunctionComponent<IconProps>;

const defaultAttributes = {
  outline: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
  filled: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "none",
  },
};

export const createReactComponent = (
  type: "outline" | "filled",
  iconName: string,
  iconNamePascal: string,
  iconNode: IconNode
) => {
  const Component = forwardRef<Icon, IconProps>(
    ({ color = "currentColor", size = 24, stroke = 2, title, className, children, ...rest }: IconProps, ref) =>
      createElement(
        "svg",
        {
          ref,
          ...defaultAttributes[type],
          width: size,
          height: size,
          className: [`tabler-icon`, `tabler-icon-${iconName}`, className].join(" "),
          ...(type === "filled"
            ? {
                fill: color,
              }
            : {
                strokeWidth: stroke,
                stroke: color,
              }),
          ...rest,
        },
        [
          title && createElement("title", { key: "svg-title" }, title),
          ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
          ...(Array.isArray(children) ? children : [children]),
        ]
      )
  );

  Component.displayName = `${iconNamePascal}`;

  return Component;
};
