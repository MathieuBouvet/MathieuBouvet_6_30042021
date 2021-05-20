import { html, template } from "../../../lib/zip-template/index.js";
import { getHashString, getHashParams } from "../../helpers/urlHash.js";

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

  const hashParams = getHashParams(window.location);
  hashParams["main-content"] = [];

  return (
    (isAwayFromTop || !goToContentAnimationEnded) &&
    html` <div
      class="scroll-top-link-wrapper ${!isAwayFromTop && "fade-out"}"
      @animationend=${e => {
        if (e.animationName === "fade-out") {
          setGoToContentAnimationEnded(true);
        }
      }}
    >
      <a class="scroll-to-top" href="#${getHashString(hashParams)}">
        Passer au contenu
      </a>
    </div>`
  );
};

export default template(GoToContent);
