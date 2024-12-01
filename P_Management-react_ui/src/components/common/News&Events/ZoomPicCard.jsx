import React from "react";
import Zoom from "react-medium-image-zoom";
import "./ZoomPicCard.css"

import "react-medium-image-zoom/dist/styles.css";

function ZoomPicCard({ imgs, title }) {
  return (
    <Zoom overlayBgColorStart="rgba(0, 0, 0, 0)" overlayBgColorEnd="rgba(0, 0, 0, 0.5)">
      <img
        src={imgs}
        alt={`${title}'s picture`}
        className="w-full min-w-72 h-80 min-h-56 max-h-96 rounded-xl object-cover"
      />
    </Zoom>
  );
}

export default ZoomPicCard;
