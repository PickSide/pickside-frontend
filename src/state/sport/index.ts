import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

export interface SportType {
	id?: string
	name?: string
}

const Sport = createSlice({
	initialState: null as unknown as SportType[],
	name: 'sportType',
	reducers: {
		setSports: (state, action: PayloadAction<SportType[]>) => (state = [...state, ...action.payload]),
	},
})

export const { setSports } = Sport.actions

export const fetchAllSports =
	(data: SportType[]) =>
	async (dispatch: Dispatch): Promise<any> => {
		if (data) {
			setSports(data)
		}
	}

export default Sport.reducer
