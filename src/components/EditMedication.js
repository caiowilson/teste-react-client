import React, { Component } from "react";

export default class EditMedication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medication: props.medication
    };
  }
  onChangeName = (e) => {
    var medication = { ...this.state.medication }
    medication.name = e.target.value
    this.setState({ medication })
  }
  onChangeDesc = (e) => {
    var medication = { ...this.state.medication }
    medication.description = e.target.value
    this.setState({ medication })
  }
  onChangePrice = (e) => {
    var medication = { ...this.state.medication }
    medication.price = e.target.value
    this.setState({ medication })
  }

  render() {
    const { medication } = this.state;
    return (
      <div className="card">
        <h5 className="card-header info-color white-text text-center py-4">
          <strong>Medicação</strong>
        </h5>
        <div className="card-body px-lg-5 pt-0">
          <form className="p-3" >
            <label htmlFor="name">Nome</label>
            <input type="text" id="name" className="form-control" autoComplete="off" defaultValue={medication.name} onChange={this.onChangeName} />
            <label htmlFor="description">Descrição</label>
            <textarea type="text" id="description" className="form-control md-textarea" rows="3" defaultValue={medication.description} onChange={this.onChangeDesc} ></textarea>
            <label htmlFor="price">Preço</label>
            <input type="text" id="price" className="form-control" defaultValue={medication.price} onChange={this.onChangePrice} />
            <div className="custom-control custom-checkbox">
              {medication.categories && medication.categories.map(category => (
                <div>
                  <label className="custom-control-label" htmlFor={category.name}>{category.name}</label>
                  <input type="checkbox" className="custom-control-input" id={category.name} checked="true" disabled />
                </div>
              ))}
            </div>

            <button onClick={() => { this.props.updateMedication(this.state.medication) }} className="btn btn-outline-success btn-block my-4">Save</button>
          </form>
        </div>
      </div>
    );
  }
}
