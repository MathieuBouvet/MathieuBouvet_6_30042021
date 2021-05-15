import { html, template } from "../../lib/zip-template/index.js";

const PhotgrapherPage = ({useStore}) => {
  const [test] = useStore(store=>store.photographer)
  return html`<div>coucou ${test.name}</div>`;
};

export default template(PhotgrapherPage);
