import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:8080/api/meds/'

class MedicationService {
  getMedicationContent() {
    return axios.get(API_URL)
  }
  createMedication(data) {
    data = data || {}
    return axios.post(API_URL, data, {
      headers: authHeader(),
    })
  }
  updateMedication(data) {
    data = data || {}
    return axios.put(API_URL + data._id, data, {
      headers: authHeader(),
    })
  }
  deleteMedication(data) {
    data = data || {}
    return axios.delete(API_URL + data._id, {
      headers: authHeader(),
    })
  }
}

export default new MedicationService()
