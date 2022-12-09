import { SVGAttributes } from 'react';

export interface IconProps extends SVGAttributes<SVGAElement> {
  size?: SVGAttributes<SVGElement>['width']
}
