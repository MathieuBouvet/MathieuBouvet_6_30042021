import { html, template } from "../../../lib/zip-template/index.js";

const Video = ({ video }) => {
  return html`<div class="video-wrapper">
    <video class="medium video" src="../assets/videos/${video}"></video>
    <div class="play-icon-wrapper">
      <i class="far fa-play-circle play-icon"></i>
    </div>
  </div>`;
};

export default template(Video);
