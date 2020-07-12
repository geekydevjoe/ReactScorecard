import React, { Component } from 'react'
import './AgentDropDown.css';

class AgentDropDown extends Component{
    render(){
        return (
            <div>
            <select className="form-control" onChange={this.props.changed}>
                <option className='dim'>---Select an Agent---</option>
            {this.props.agents.map(item=> (
              <option value={item.number} key={item.number}>{item.name}</option>  
            ))}
            </select> 
            </div>
        );
    };

}

export default AgentDropDown;