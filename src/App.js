import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'

import AuthService from './services/auth.service'
import MedicationService from './services/medication.service'

import Login from './components/Login'
import Register from './components/Register'
import Public from './components/Home'
import Profile from './components/Profile'
import EditMedication from './components/EditMedication'

class App extends Component {
  constructor(props) {
    super(props)

    this.logOut = this.logOut.bind(this)
    this.editMedication = this.editMedication.bind(this)
    this.state = {
      showAdminContent: false,
      currentUser: undefined,
      currentMedication: {},
      redirect: null,
    }
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser()
    MedicationService.getMedicationContent().then((response) => {
      this.setState({
        medications: response.data,
      })
    })

    if (user) {
      this.setState({
        currentUser: user,
      })
    }
  }

  logOut() {
    AuthService.logout()
  }
  editMedication(medDoc) {
    this.setState({
      currentMedication: medDoc,
    })
    this.setState(
      {
        redirect: '/medication',
      },
      () => {
        this.setState({
          redirect: null,
        })
      }
    )
  }
  updateMedication = (medDoc) => {
    if (medDoc._id) {
      MedicationService.updateMedication(medDoc).then((response) => {
        this.setState({
          currentMedication: response.data,
        })
        this.setState(
          {
            redirect: '/home',
          },
          () => {
            window.location.reload()
          }
        )
      })
    } else {
      MedicationService.createMedication(medDoc).then((response) => {
        this.setState({
          currentMedication: response.data,
        })
        this.setState(
          {
            redirect: '/home',
          },
          () => {
            window.location.reload()
          }
        )
      })
    }
  }
  createMedication = (medDoc) => {
    MedicationService.createMedication(medDoc).then((response) => {
      this.setState({
        currentMedication: response.data,
      })
      this.setState(
        {
          redirect: '/home',
        },
        () => {
          window.location.reload()
        }
      )
    })
  }
  deleteMedication = (medDoc) => {
    MedicationService.deleteMedication(medDoc).then((response) => {
      this.setState(
        {
          redirect: '/home',
        },
        () => {
          window.location.reload()
        }
      )
    })
  }

  render() {
    const {
      currentUser,
      showAdminContent,
      medications,
      currentMedication,
    } = this.state
    return (
      <Router>
        {this.state.redirect && <Redirect to={this.state.redirect} />}
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-primary">
            <Link to={'/'} className="navbar-brand">
              <i className="fas fa-flask"> </i>
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={'/home'} className="nav-link">
                  Listar
                </Link>
              </li>
              {showAdminContent && (
                <li className="nav-item">
                  <Link to={'/admin'} className="nav-link">
                    Admin Content
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link to={'/medication'} className="nav-link">
                    Adicionar
                  </Link>
                </li>
              )}
            </div>
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={'/profile'} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    <i className="fas fa-sign-out-alt"> </i> Sair
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={'/login'} className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={'/register'} className="nav-link">
                    Cadastrar
                  </Link>
                </li>
              </div>
            )}
          </nav>
          <div className="container mt-3">
            <Switch>
              <Route
                exact
                path={['/', '/home']}
                component={() => (
                  <Public
                    currentUser={currentUser}
                    medications={medications}
                    editMedication={this.editMedication}
                    deleteMedication={this.deleteMedication}
                  />
                )}
              />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route
                path="/medication"
                component={() => (
                  <EditMedication
                    medication={currentMedication}
                    updateMedication={this.updateMedication}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
