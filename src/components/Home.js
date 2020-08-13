import React, { Component } from 'react'
import Moment from 'react-moment'

export default class Home extends Component {
  render() {
    if (!this.props.medications) {
      return (
        <strong className="text-center"> Nenhum medicamento encontrado </strong>
      )
    }
    //todo extrair medicamentos para Medications
    return (
      <div className="container">
        <div className="card">
          <h5 className="card-header info-color white-text text-center py-4">
            <strong> Medicamentos </strong>
          </h5>
          <div className="container-fluid">
            <div className="row">
              {this.props.medications.map((medication) => (
                <div className="card p-0 m-2 col-lg-4" key={medication._id}>
                  <div className="card-body p-3">
                    <h4 className="card-title"> {medication.name} </h4>
                    <p className="card-text"> {medication.description} </p>
                    <span className="card-text">Categorias: </span>
                    {medication.categories.map((category) => (
                      <span className="card-text" key={category._id}>{category.name} </span>
                    ))}
                    <p className="card-text">
                      Preço: <strong> R$ {medication.price} </strong>
                    </p>
                    {this.props.currentUser && (
                      <>
                        <button
                          onClick={() => {
                            this.props.editMedication(medication)
                          }}
                          className="btn btn-outline-primary my-0">
                          Editar
                        </button>
                        <button
                          onClick={() => {
                            this.props.deleteMedication(medication)
                          }}
                          className="btn btn-danger my-0">
                          Remover
                        </button>
                      </>
                    )}
                  </div>
                  <div className="card-footer text-justify mt-4">
                    <small className="text-muted">
                      <div className="pull-left block">
                        Criado por:
                        <strong> {medication.createdBy.username}</strong>
                        <span>, </span>
                        <Moment fromNow>{medication.createdAt}</Moment>
                      </div>
                      <div className="pull-right block">
                        Alterado por:
                        <strong> {medication.updatedBy.username}</strong>
                        <span>, </span>
                        <Moment fromNow>{medication.updatedAt}</Moment>
                      </div>
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
