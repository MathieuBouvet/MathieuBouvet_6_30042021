import { html, template } from "../../../lib/zip-template/index.js";

const Video = ({ video, altText, className = "", dominantColor }) => {
  return html`<div class="video-wrapper">
    <video
      class="video ${className}"
      src="../assets/videos/${video}"
      style="background-color: ${dominantColor}"
    >
      <p>${altText}</p>
    </video>
    <div class="play-icon-wrapper">
      <i class="far fa-file-video play-icon"></i>
    </div>
  </div>`;
};

export default template(Video);
