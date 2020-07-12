import React, { Component } from 'react'

class AgentDropDown extends Component{

    render(){
        return (
            <select className="form-control" onChange={this.props.changed}>
                <option></option>
            {this.props.agents.map(item=> (
              <option value={item.number} key={item.number}>{item.name}</option>  
            ))}
            </select> 
        );
    };

}

export default AgentDropDown;