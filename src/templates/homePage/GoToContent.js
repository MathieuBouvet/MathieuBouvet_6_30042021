import { html, template } from "../../../lib/zip-template/index.js";

const GoToContent = ({ useStore, useEffect }) => {
  const [goToContentAnimationEnded, setGoToContentAnimationEnded] = useStore(
    store => store.goToContentAnimationEnded
  );
  const [isAwayFromTop] = useStore(store => store.isAwayFromTop);

  useEffect(() => {
    if (isAwayFromTop) {
      setGoToContentAnimationEnded(false);
    }
  });

  return (
    (isAwayFromTop || !goToContentAnimationEnded) &&
    html` <a
      class="scroll-to-top ${!isAwayFromTop && "fade-out"}"
      href="#main-content"
      @animationend=${e => {
        if (e.animationName === "fade-out") {
          setGoToContentAnimationEnded(true);
        }
      }}
    >
      Passer au contenu
    </a>`
  );
};

export default template(GoToContent);
