# react-lazy-icons

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { createIconComponents } from 'react-lazy-icons';
import { IconsPaths } from './generated/icons';

const loadIcons = () => import('./generated/icons');

const { Icon, IconsProvider } = createIconComponents<IconsPaths>();

const App: React.FC = () => {
  return (
    <div>
      <span>Some Text</span>
      <Icon icon="home" iconSize={35} />
      <span>just to make sure the flow stay the same</span>
      <Icon icon="chevron-left" color="red" />
      <Icon icon="chevron-left" color="blue" />
      <Icon icon="chevron-left" color="green" />
    </div>
  );
};

const IconsManager: React.FC = ({ children }) => {
  const [icons, setIcons] = React.useState<null | IconsPaths>(null);

  React.useEffect(() => {
    setTimeout(() => {
      loadIcons().then(icons => {
        setIcons(icons.ICONS_PATHS);
      });
    }, 2000);
  }, []);

  return <IconsProvider iconsPaths={icons}>{children}</IconsProvider>;
};

ReactDOM.render(
  <IconsManager>
    <App />
  </IconsManager>,
  document.getElementById('root')
);
```
