import React from 'react';
import { Wrapper } from './elements';
import { IconsPaths } from 'icons-bundler';

export const IconsContext = React.createContext<IconsPaths | null>(null);

interface IconProps<I extends IconsPaths> {
  icon: keyof I;
  color?: string;
  strokeWidth?: number | string;
  iconSize?: number;
}

interface IconsProviderProps<I extends IconsPaths> {
  iconsPaths: I | null;
}

export function createIconComponents<I extends IconsPaths>() {
  const IconsProvider: React.FC<IconsProviderProps<I>> = React.memo(
    function IconsProvider({ children, iconsPaths }) {
      return (
        <IconsContext.Provider value={iconsPaths}>
          {children}
        </IconsContext.Provider>
      );
    }
  );

  function useIconsContext(): I | null {
    return React.useContext(IconsContext) as any;
  }

  const Icon: React.FC<IconProps<I>> = ({
    iconSize = 18,
    color = 'currentColor',
    icon,
    strokeWidth = '2',
  }) => {
    const iconsPaths: I = React.useContext(IconsContext) as any;
    const parts = iconsPaths && iconsPaths[icon];
    const elems = parts
      ? parts.map((d, i) => {
          if (typeof d === 'string') {
            return <path key={i} d={d} fillRule="evenodd" />;
          }
          if (Array.isArray(d)) {
            const [type, params] = d;
            if (type === 'rect') {
              const [x, y, width, height, rx, ry] = params;
              return (
                <rect
                  key={i}
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  rx={rx}
                  ry={ry}
                />
              );
            }
          }
          console.warn(`Unhandled icon part`);
          return <path key={i} fillRule="evenodd" />;
        })
      : [];

    return (
      <Wrapper style={{ width: iconSize, height: iconSize }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth}
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            margin: 0,
          }}
        >
          {elems}
        </svg>
      </Wrapper>
    );
  };

  return { Icon, IconsProvider, useIconsContext };
}

export const { Icon, IconsProvider, useIconsContext } = createIconComponents<
  IconsPaths
>();
