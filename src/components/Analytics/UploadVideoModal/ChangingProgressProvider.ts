import React from 'react';

interface ChangingProgressProviderProps {
    interval?: number;
    valuesIndex?: number;
    values?: any;
    children?: any;
}
class ChangingProgressProvider extends React.Component<ChangingProgressProviderProps> {
    static defaultProps = {
        interval: 1000
    };

    state = {
        valuesIndex: 0
    };

    componentDidMount() {
        setInterval(() => {
            this.setState({
                valuesIndex: (this.state.valuesIndex + 1) % this.props.values.length
            });
        }, this.props.interval);
    }

    render() {
        return this.props.children(this.props.values[this.state.valuesIndex]);
    }
}

export default ChangingProgressProvider;
