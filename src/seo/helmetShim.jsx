import React, { useLayoutEffect } from 'react';

const textContent = (value) => React.Children.toArray(value).join('');

export function Helmet({ children }) {
  useLayoutEffect(() => {
    const elements = React.Children.toArray(children).filter(React.isValidElement);
    document.head.querySelectorAll('[data-rh="true"], [data-helmet-managed="true"]').forEach((node) => node.remove());

    for (const element of elements) {
      if (element.type === 'title') {
        document.title = textContent(element.props.children);
        document.querySelector('title')?.setAttribute('data-helmet-managed', 'true');
        continue;
      }
      if (!['meta', 'link', 'script'].includes(element.type)) continue;
      const node = document.createElement(element.type);
      for (const [name, value] of Object.entries(element.props)) {
        if (name === 'children' || value == null || value === false) continue;
        node.setAttribute(name === 'className' ? 'class' : name, String(value));
      }
      if (element.type === 'script') node.textContent = textContent(element.props.children);
      node.setAttribute('data-helmet-managed', 'true');
      document.head.appendChild(node);
    }
  }, [children]);

  return null;
}

export function HelmetProvider({ children }) {
  return <>{children}</>;
}
