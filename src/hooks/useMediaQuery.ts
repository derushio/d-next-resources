import { tailwindConfig } from '@/data-accesses/infra/tailwind';
import { useMediaQuery } from 'react-responsive';

const breakpoints = tailwindConfig.theme.screens;

type BreakpointKey = keyof typeof breakpoints;

/**
 * breakpointを解決
 */
export function useBreakpoint<K extends BreakpointKey>(
  breakpointKey: K,
): { [key in `is${Capitalize<string & K>}`]: boolean } {
  const bool = useMediaQuery({
    query: `(min-width: ${breakpoints[breakpointKey]})`,
  });
  const capitalizedKey =
    (breakpointKey as string)[0].toUpperCase() +
    (breakpointKey as string).substring(1);

  return {
    [`is${capitalizedKey}`]: bool,
  } as { [key in `is${Capitalize<string & K>}`]: boolean };
}
