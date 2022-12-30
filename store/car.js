import { carService } from '@/_services'

const initialState = {
  cars: { items: [], notInitialized : true },
  brands: { items: [] },
  types: { items: [] },
  authors: { items: [] },
  nations: { items: [] },
  carCategories : { items : [
    { name: 'Endurance' },
    { name: 'Open Wheel' },
    { name: 'GT' },
    { name: 'Prototype' },
    { name: 'Rally' },
    { name: 'Stock Car' },
    { name: 'Street' },
    { name: 'Tuned' },
    { name: 'Touring' },
    { name: 'Vintage' },
    ]},
}

export const state = () => initialState

export const getters = {
  loadingCars: state => state.cars.fetching || state.cars.notInitialized,
  cars: state => state.cars.items,
  car: state => (brand, name, year) => state.cars.items.find(c => c.brand.name === brand && c.modelName === name && c.year === parseInt(year)),
  sortedCars: state => sorter => state.cars.items.sort(sorter),
  getCarById: state => (id) => state.cars.items.find(c => c.id === parseInt(id)),
  loadingBrands: state => state.brands.fetching,
  brands: state => state.brands.items,
  loadingTypes: state => state.types.loading,
  types: state => state.types.items,
  authors: state => state.authors.items,
  loadingAuthors: state => state.authors.fetching,
  nations: state => state.nations.items,
  nationsLoading: state => state.nations.fetching,
  carCategories: state => state.carCategories.items,
}
export const actions = {
  async getAll ({
    dispatch,
    commit
  }) {
    return new Promise((res, rej) => {
      commit('carsFetching')
      carService.getAll()
        .then(
          cars => {
            commit('carsFetched', cars)
            res(cars)
          }
        )
        .catch(
          error => {
            commit('carsFetchingError', error)
            dispatch('alert/error', error, { root: true })
            rej(error)
          }
        )
    })
  },
  async getCarTypes ({
    dispatch,
    commit
  }) {
    commit('typesFetching')
    await carService.getCarTypes()
      .then(types => {
        commit('typesFetched', types)
      })
      .catch(error => {
        commit('typesFetchingError', error)
        dispatch('alert/error', error, { root: true })
      })
  },
  async addCar ({
    dispatch,
    commit
  }, car) {
    return new Promise((res, rej) => {
      commit('carPushing')
      carService.addCar(car)
        .then(car => {
          commit('carPushed')
          dispatch('getAll')
          dispatch('alert/success', car, { root: true })
          res(car)
        })
        .catch(err => {
          commit('carPushError', err)
          dispatch('alert/error', err, { root: true })
          rej(err)
        })
    })
  },
  async updateCar ({
    dispatch,
    commit
  }, car) {
    return new Promise((res, rej) => {
      commit('carPushing')
      carService.updateCar(car)
        .then(car => {
          commit('carPushed')
          dispatch('getAll')
          dispatch('alert/success', car, { root: true })
          res(car)
        })
        .catch(err => {
          commit('carPushError', err)
          dispatch('alert/error', err, { root: true })
          rej(err)
        })
    })
  },
  async getCarBrands ({
    dispatch,
    commit
  }) {
    commit('brandsFetching')
    await carService.getCarBrands()
      .then(brands => commit('brandFetched', brands))
      .catch(error => {
        commit('brandFetchingError', error)
        dispatch('alert/error', error, { root: true })
      })
  },
  async getCarAuthors ({
    dispatch,
    commit
  }) {
    commit('authorsFetching')
    await carService.getCarAuthors()
      .then(authors => commit('authorsFetched', authors))
      .catch(err => {
        commit('authorsFetchError', err)
        dispatch('alert/error', err, { root: true })
      })
  },
  async getBrandNations ({
    dispatch,
    commit
  }) {
    commit('nationsFetching')
    await carService.getCarNations()
      .then(nations => commit('nationsFetched', nations))
      .catch(err => {
        commit('nationsFetchError', err)
        dispatch('alert/error', err, { root: true })
      })
  }
}

export const mutations = {
  carsFetching (state) {
    state.cars = {
      items: state.cars.items,
      fetching: true
    }
  },
  carsFetched (state, cars) {
    state.cars = { items: cars }
  },
  carsFetchingError (state, error) {
    state.cars = {
      items: [],
      error
    }
  },
  carPushing (state) {
    delete state.cars.error
    state.cars.pushing = true
  },
  carPushed (state) {
    delete state.cars.pushing
  },
  carPushError (state, error) {
    delete state.cars.pushing
    state.cars = {
      items: state.cars.items,
      error
    }
  },
  brandsFetching (state) {
    state.brands = {
      items: state.brands.items,
      fetching: true
    }
  },
  brandFetched (state, brands) {
    state.brands = { items: brands }
  },
  brandFetchingError (state, error) {
    state.brands = {
      items: [],
      error
    }
  },
  typesFetching (state) {
    state.types = {
      items: [],
      fetching: true
    }
  },
  typesFetched (state, types) {
    state.types = { items: types }
  },
  typesFetchingError (state, error) {
    state.types = {
      items: [],
      error
    }
  },
  authorsFetching (state) {
    state.authors = {
      items: [],
      fetching: true
    }
  },
  authorsFetched (state, authors) {
    state.authors = { items: authors }
  },
  authorsFetchError (state, error) {
    state.authors = {
      items: [],
      error
    }
  },
  nationsFetching (state) {
    state.nations = {
      items: [],
      fetching: true
    }
  },
  nationsFetched (state, nations) {
    state.nations = { items: nations }
  },
  nationsFetchError (state, error) {
    state.nations = {
      items: [],
      error
    }
  }
}
