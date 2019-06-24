import React from "react";

export default class CustomMouse extends React.Component {
  state = {
    position: null
  };

  componentDidMount() {
    window.onmousemove = this._mouseMove;
  }

  _mouseMove = event => {
    this.setState({
      position: event,
    })
  };

  render() {
    const position = this.state.position;

    if (position === null) return null;

    return (
      <div style={{
        position: "absolute",
        zIndex: 9999,
        pointerEvents: "none"
      }}>
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "20px",
            transform: "translate(-10px, -10px)",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
            position: "absolute",
            top: position.pageY,
            left: position.pageX
          }}
        />
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "40px",
            transform: "translate(-20px, -20px)",
            border: "1px solid rgba(255, 0, 0, 0.8)",
            borderStyle: "dashed",
            transition: "top 200ms, left 200ms",
            position: "absolute",
            top: position.pageY,
            left: position.pageX
          }}
        />
      </div>
    );
  }
}
