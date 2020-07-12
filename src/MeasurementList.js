import React, { Component } from 'react';

class MeasurementList extends Component {

    render(){
        return (
            <div>
                <h3>{this.props.title}</h3>
                {this.props.items.map(item => (
                  <button data-toggle="modal" className={ "measurementButton col-12 ms"+item.score } 
                      data-target={ "#"+this.props.modalId} 
                        onClick={this.props.measurementClicked } 
                        data-measurement={item.title}>{item.title}</button>
                ))}

            </div>

        );
    }
}
export default MeasurementList