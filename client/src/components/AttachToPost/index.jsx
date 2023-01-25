import { Widget } from "@uploadcare/react-widget";

const AttachToPost = ({ setImg }) => {
  return (
    <div className="post-popup-attach">
      <Widget
        publicKey="76c56b73b9d7c613465c"
        id="file"
        className="widget"
        previewStep='true'
        systemDialog='true'
        imagesOnly='true'
        onChange={(info) => setImg(info.cdnUrl)}
      />
    </div>
  );
};

export default AttachToPost;
