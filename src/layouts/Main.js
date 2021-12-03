import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from '../components/Navbar';

class Main extends React.Component {
  render(){
    const { children } = this.props;
    return (
      <>
        <Navbar/>
        <Suspense fallback={<div>Loading..</div>}>
          {children}
        </Suspense>
      </>
    );
  }
}

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

const mapActionsToProps = {};

export default connect(mapStateToProps,mapActionsToProps)(Main);