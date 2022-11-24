// from @mui/utils@5.10.14

import generateUtilityClass from '../generateUtilityClass';

export function generateUtilityClasses<T extends string>(
  componentName: string,
  slots: T[],
  globalStatePrefix = 'Mui',
): Record<T, string> {
  const result: Record<string, string> = {};

  slots.forEach(slot => {
    result[slot] = generateUtilityClass(componentName, slot, globalStatePrefix);
  });

  return result;
}

export default generateUtilityClass;
