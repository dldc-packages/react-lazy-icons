import React from 'react';

type SpanProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

export const Wrapper = React.forwardRef<HTMLSpanElement, SpanProps>(
  (props, ref) => (
    <span
      ref={ref}
      {...props}
      style={{
        display: 'inline-block',
        lineHeight: '0',
        flex: 0,
        verticalAlign: 'text-bottom',
        ...(props.style || {}),
      }}
    />
  )
);
