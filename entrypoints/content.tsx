import ReactDOM from 'react-dom/client';
import App from './popup/App';

export default defineContentScript({
  matches: ['https://www.linkedin.com/*'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: 'ai-link',
      position: 'inline',
      onMount: (container) => {
     
        const shadowRoot = container.attachShadow({ mode: 'open' });

      
        const app = document.createElement('div');
        shadowRoot.appendChild(app);

        const root = ReactDOM.createRoot(app);
        root.render(<App />);
        return root;
      },
      onRemove: (root) => {
        root?.unmount();
      },
    });

    ui.mount();
  },
});
