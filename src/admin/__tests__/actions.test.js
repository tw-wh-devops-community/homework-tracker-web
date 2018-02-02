import configureMockStore from 'redux-mock-store'
import promise from 'redux-promise-middleware'
import axios from 'axios'
import nock from 'nock'
import httpAdapter from 'axios/lib/adapters/http'
import { fetchAssignments, deleteAssignment } from '../actions'

describe('action', () => {
  it('ASSIGNMENT/FETCH_ASSIGNMENT', () => {
    const middlewares = [promise()]
    const mockStore = configureMockStore(middlewares)

    const payload =
      [{
        id: '5a72d5f434c8394b769bbd17',
        candidate: 'yangyang',
        job_role: 'DEV',
        interviewer_employee_id: '18585',
        interviewer_name: '周训杰',
        assigned_date: '2011-02-01T00:00:00.000Z',
        deadline_date: '2011-02-12T00:00:00.000Z',
        finished_date: '2011-02-13T00:00:00.000Z',
        interviewer_profile: 'fakeStorePicBathUrl18585',
        is_finished: 'true',
        status: 'finished',
      }]

    const host = 'http://localhost:5678/api'
    axios.defaults.host = host
    axios.defaults.adapter = httpAdapter

    nock(host).get('/assignments').reply(200, payload)

    const store = mockStore({})

    return store.dispatch(fetchAssignments()).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: 'ASSIGNMENT/FETCH_ASSIGNMENT_PENDING',
      })

      expect(store.getActions()[1].type).toEqual('ASSIGNMENT/FETCH_ASSIGNMENT_FULFILLED')

      expect(store.getActions()[1].payload).toEqual(payload)
    })
  })

  it('ASSIGNMENT/DELETE_ASSIGNMENT', () => {
      const middlewares = [promise()]
      const mockStore = configureMockStore(middlewares)

      const payload =
        [{
          message: 'deleted',
        }]

      const host = 'http://localhost:5678/api'
      axios.defaults.host = host
      axios.defaults.adapter = httpAdapter

      nock(host).delete('/assignments/1').reply(200, payload)

      const store = mockStore({})

      return store.dispatch(deleteAssignment('1')).then(() => {
        expect(store.getActions()[0]).toEqual({
          type: 'ASSIGNMENT/DELETE_ASSIGNMENT_PENDING',
          meta: [{ 'id': '1' }],
        })
        expect(store.getActions()[1].type).toEqual('ASSIGNMENT/DELETE_ASSIGNMENT_FULFILLED')

        expect(store.getActions()[1].payload).toEqual(payload)
      })
    })
})
