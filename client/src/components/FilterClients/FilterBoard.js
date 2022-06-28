import React from "react";
import { connect } from "react-redux";
import OptionsForm from "./OptionsForm";


class FilterBoard extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <>
                <h1>Filter for specific clients:</h1>
                <OptionsForm />
                
            </>
        )
    }
}

export default FilterBoard