import { html, template } from "../../../lib/zip-template/index.js";

const Video = ({ video, altText, className = "", dominantColor }) => {
  return html`<div class="video-wrapper">
    <video
      class="video ${className}"
      src="../assets/videos/${video}"
      style="background-color: ${dominantColor}"
      controls
      autoplay
    >
      <p>${altText}</p>
    </video>
  </div>`;
};

export default template(Video);
