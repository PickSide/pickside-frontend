import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { fetchItems } from 'api'

export interface Sports {
	results?: Sport[]
}
export interface Sport {
	id?: string
	value?: string
	description?: string
}

const Sport = createSlice({
	initialState: null as unknown as Sports,
	name: 'sports',
	reducers: {
		setSports: (state, action: PayloadAction<Sports>) => (state = action.payload),
	},
})

export const { setSports } = Sport.actions

export const fetchSports =
	() =>
		async (dispatch: Dispatch): Promise<any> => {
			const items = await fetchItems({
				endpoint: 'sports',
				secure: false
			})(dispatch)

			if (items) {
				dispatch(setSports(items))
			}
		}

export default Sport.reducer
