import { render } from 'vue-email';

export const useRender = (): typeof render => {
  return render;
};
