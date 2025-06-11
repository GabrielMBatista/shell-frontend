import { defineCustomElements } from '@gabrielmbatista/ui-library-stencil/loader';

export const registerStencilComponents = () => {
  if (typeof window !== 'undefined') {
    defineCustomElements(window);
  }
};
