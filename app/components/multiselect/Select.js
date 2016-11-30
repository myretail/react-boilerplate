import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [],
        }
    }

    logChange(value) {
        console.log('You\'ve selected:', value);
        this.setState({value});
        this.props.onChange(value.split(','));
    }


    render() {


        return (
            <Select ref="stateSelect"
                    options={this.props.options}
                    simpleValue
                    value={this.state.value}
                    placeholder="请选择："
                    onChange={this.logChange.bind(this)}/>

        )
            ;
    }
}


export default Select;
