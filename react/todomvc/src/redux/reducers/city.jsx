import * as cityConstants from '../constants/city.jsx';

export default function (state = {}, action) {

  switch (action.type) {
    case cityConstants.CITY_NAME: {
      return {
        ...state,
        ...action.data,
        name: '天堂'
      }
    }

    case cityConstants.CITY_AREA: {
      return {
        area: '12万平'
      }
    }

    default: {
      return {
        ...state,
        type: 'NO_TYPES'
      }
    }
  }
}

// Actions 会触发这里的函数