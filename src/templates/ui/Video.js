import { html, template } from "../../../lib/zip-template/index.js";

const Video = ({ video, altText, className = "" }) => {
  return html`<div class="video-wrapper">
    <video
      class="video ${className}"
      src="../assets/videos/${video}"
      controls
      autoplay
    >
      <p>${altText}</p>
    </video>
  </div>`;
};

export default template(Video);
