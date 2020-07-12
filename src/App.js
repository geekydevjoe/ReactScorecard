import React, { Component } from 'react';
import './App.css';
import AgentDropDown from './AgentDropDown';
import MeasurementModal from './MeasurementModal';
import jquery from 'jquery';
import MeasurementList from './MeasurementList';

class App extends Component {

  constructor(){
    super();
    this.state = {
      agents : [],
      selected : null,
      measurementModalId : "modalId",
      measurement:"",
      auto : [],
      operators: [],
      compliance: []
    }

    this.agentChanged = this.agentChanged.bind(this);
    this.showMeasurement = this.showMeasurement.bind(this);
    this.getMeasurements = this.getMeasurements.bind(this);
  }

  componentDidMount(){
    fetch('./agents.json')
    .then(response => response.json())
    .then(result => {
      const tmpAgents = result.map(item => {
          return item;
      });

      this.setState({
        agents : tmpAgents
      });
      
    })

    // bind to the modal....
    const id = "#"+ this.state.measurementModalId;
    
    jquery(id).on('show.bs.modal', function (event) {
      var button = jquery(event.relatedTarget) // Button that triggered the modal
      var recipient = button.data('measurement') // Extract info from data-* attributes
      
      // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
      // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
      var modal = jquery(this);
      modal.find('.modal-title').text(recipient);
      //modal.find('.modal-body input').val(recipient);
    })
  }

  agentChanged(e){
    this.setState({
      selected : null, auto:[], compliance:[], operators: []
    });
    
    if( e.target.value != null && e.target.value !== "" ){
      const filtered = this.state.agents.filter(item => {
        return item.number === e.target.value;
      });

      if( filtered.length > 0 ){
        this.setState({ selected : filtered[0] })
        this.getMeasurements(filtered[0].number)
      }  
    }
    console.log(e.target.value);
  }

  showMeasurement(e){
    const target = jquery(e.target);
    var val = target.data('measurement');
    this.setState({
      measurement : val
    });
  }
  getMeasurements(agentNumber){
    const file = "./"+agentNumber+".json";

    fetch(file)
    .then(response => response.json())
    .then(result => {
      const measurements = result.map(item => {
          return item;
      });
      this.setState({
        auto: measurements.filter(item => {
          return item.category === "Auto"
        }),
        operators: measurements.filter(item => {
          return item.category === "Operators"
        }),
        compliance: measurements.filter(item => {
          return item.category === "Compliance"
        })
      });
      
    })
  }

  render(){
    return (
      <main>
          <div className="container pt-1">
            <div>
                <div className="jumbotron row">
                  <h1>New Business Agent Scorecard</h1>
                </div>
                <div className="row">
                  <div className="col-sm-5 col-12">
                    <AgentDropDown agents={this.state.agents} changed={this.agentChanged} />
                  </div>
                </div>
                <div className="row">&nbsp;</div>
                <div className="row pt3" hidden={this.state.selected == null}>
                  <div className="col-sm-4 col-6 scoreBox">
                    { this.state.selected != null && <div className="card">
                      <div className="card-body">
                        <h1 className="card-title">{this.state.selected.policyCount}</h1>
                        <p className="card-text">
                          This is the total number of polices written for the month.
                        </p>
                      </div>
                    </div> }
                  </div>
                  <div className="col-sm-4 col-6 scoreBox">
                    { this.state.selected != null && 
                    <div className="card">
                      <div className="card-body">
                        <h1 className="card-title">{this.state.selected.score}</h1>
                        <p className="card-text">
                          This is your overall score based on the months new business.
                        </p>
                      </div>
                    </div>
                  }
                  </div>
                  <div className="col-sm-1"></div>
                </div>
                <div className="row">&nbsp;</div>
                {/* Need a few columns */}
                <div className="row" hidden={this.state.selected === null}>
                  <div className="col-sm-4 col-12 measurements">
                    <MeasurementList 
                      items={this.state.auto} 
                      title="Auto" 
                      measurementClicked={this.showMeasurement} 
                      modalId={this.state.measurementModalId} />                  
                  </div>
                  <div className="col-sm-4 col-12 measurements">
                    <MeasurementList 
                      items={this.state.operators} 
                      title="Operators" 
                      measurementClicked={this.showMeasurement} 
                      modalId={this.state.measurementModalId} />
                  </div>
                  <div className="col-sm-4 col-12 measurements">
                  <MeasurementList 
                      items={this.state.operators} 
                      title="Compliance" 
                      measurementClicked={this.showMeasurement} 
                      modalId={this.state.measurementModalId} />
                  </div>
          
                  <MeasurementModal id={this.state.measurementModalId} measurement={this.state.measurement} />
                </div>
                
              </div>
          </div>
      </main>
    );
  }
}

export default App;
