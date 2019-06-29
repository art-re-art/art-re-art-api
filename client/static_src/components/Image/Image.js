import React from "react";

import "./Image.less";

class ResponsiveImage extends React.Component {
  render() {
    return <img className="image__responsive" {...this.props} />;
  }
}

const Image = { ResponsiveImage: ResponsiveImage };

export default Image;
