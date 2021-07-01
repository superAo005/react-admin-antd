import React, { Component } from "react";
import { Button } from "antd";

import PropTypes from "prop-types";
import { connect } from "react-redux";

class Index extends Component {
  static propTypes = {
    themeColor: PropTypes.string,
    onSwitchColor: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = { themeColor: "" };
  }

  handleSwitchColor(color) {
    if (this.props.onSwitchColor) {
      // dispatch action 去改变颜色
      this.props.onSwitchColor(color);
    }
  }
  render() {
    return (
      <div style={{ padding: "50px" }}>
        <p style={{ color: this.props.themeColor }}>颜色改变</p>
        <Button
          style={{ color: this.props.themeColor }}
          onClick={this.handleSwitchColor.bind(this, "red")}
        >
          红色
        </Button>
        <Button
          style={{ color: this.props.themeColor }}
          onClick={this.handleSwitchColor.bind(this, "blue")}
        >
          蓝色
        </Button>
      </div>
    );
  }
}
// 获取state值
const mapStateToProps = (state) => {
  return {
    themeColor: state.ColorReducers.themeColor,
  };
};

// 改变state的值的放阿飞
const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchColor: (color) => {
      dispatch({ type: "CHANGE_COLOR", themeColor: color });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
