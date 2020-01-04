import React from "react";
import PropTypes from "prop-types";
import autoBind from "auto-bind";
import {StepButton} from "material-ui";

class Counter extends React.Component {

    constructor(props, context) {
        super(props, context);
        autoBind(this);
    }

    render() {
        // TODO
        const {onDecrement, onIncrement} = this.props;

        const initValue = 0;
        return (
            <div className="stepper-input">
                <StepButton onClick={onDecrement}>-</StepButton>
                <input
                    type="number"
                    className="quantity"
                    value={initValue}
                    onChange={this.onChangeValue}
                />
                <div className="increment" onClick={onIncrement}>
                    +
                </div>
            </div>
        );
    }
}

Counter.propTypes = {
    initValue: PropTypes.number,
    onDecrement: PropTypes.func,
    onIncrement: PropTypes.func,
    onValueChanged: PropTypes.func,
};

export default Counter;
