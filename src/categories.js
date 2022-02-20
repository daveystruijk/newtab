import { } from './integrations/tu';

export const CATEGORIES = {
  personal: {
    color: '#28CD41',
  },
  momo: {
    color: '#C697C5',
  },
  freelance: {
    color: '#F6BB3F',
  },
  tu: {
    color: '#0697CF',
    integrations: [
      (task) => (
        <button key="tu-link" onClick={(e) => {
          e.stopPropagation();
        }}>
          t
        </button>
      ),
    ],
  },
};

export const CATEGORY_KEYS = Object.keys(CATEGORIES);
