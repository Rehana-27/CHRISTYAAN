import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import {fulfilledNotify, rejectNotify, resetNotify} from "../../helpers/notifyStateHandler";

interface MainState {
    journals: any
    loading: boolean
    count: number
    refetch: boolean;
    rolesWidgets: any[];
    notify: {
        showNotification: boolean
        textNotification: string
        typeNotification: string
    }
}

const initialState: MainState = {
    journals: [],
    loading: false,
    count: 0,
    refetch: false,
    rolesWidgets: [],
    notify: {
        showNotification: false,
        textNotification: '',
        typeNotification: 'warn',
    },
}

export const fetch = createAsyncThunk('journals/fetch', async (data: any) => {
    const { id, query } = data
    const result = await axios.get(
        `journals${
            query || (id ? `/${id}` : '')
        }`
    )
    return id ? result.data : {rows: result.data.rows, count: result.data.count};
})

export const deleteItemsByIds = createAsyncThunk(
  'journals/deleteByIds',
  async (data: any, { rejectWithValue }) => {
    try {
      await axios.post('journals/deleteByIds', { data });
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteItem = createAsyncThunk('journals/deleteJournals', async (id: string, { rejectWithValue }) => {
    try {
        await axios.delete(`journals/${id}`)
    } catch (error) {
        if (!error.response) {
            throw error;
        }

        return rejectWithValue(error.response.data);
    }
})

export const create = createAsyncThunk('journals/createJournals', async (data: any, { rejectWithValue }) => {
    try {
        const result = await axios.post(
          'journals',
          { data }
        )
        return result.data
    } catch (error) {
        if (!error.response) {
            throw error;
        }

        return rejectWithValue(error.response.data);
    }
})

export const uploadCsv = createAsyncThunk(
  'journals/uploadCsv',
  async (file: File, { rejectWithValue }) => {
      try {
          const data = new FormData();
          data.append('file', file);
          data.append('filename', file.name);

          const result = await axios.post('journals/bulk-import', data, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });

          return result.data;
      } catch (error) {
          if (!error.response) {
              throw error;
          }

          return rejectWithValue(error.response.data);
      }
  },
);

export const update = createAsyncThunk('journals/updateJournals', async (payload: any, { rejectWithValue }) => {
    try {
        const result = await axios.put(
          `journals/${payload.id}`,
          { id: payload.id, data: payload.data }
        )
        return result.data
    } catch (error) {
        if (!error.response) {
            throw error;
        }

        return rejectWithValue(error.response.data);
    }
})

export const journalsSlice = createSlice({
    name: 'journals',
    initialState,
    reducers: {
        setRefetch: (state, action: PayloadAction<boolean>) => {
            state.refetch = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetch.pending, (state) => {
            state.loading = true
            resetNotify(state);
        })
        builder.addCase(fetch.rejected, (state, action) => {
            state.loading = false
            rejectNotify(state, action);
        })

        builder.addCase(fetch.fulfilled, (state, action) => {
            if (action.payload.rows && action.payload.count >= 0) {
                state.journals = action.payload.rows;
                state.count = action.payload.count;
            } else {
                state.journals = action.payload;
            }
            state.loading = false
        })

        builder.addCase(deleteItemsByIds.pending, (state) => {
            state.loading = true;
            resetNotify(state);
        });

        builder.addCase(deleteItemsByIds.fulfilled, (state) => {
            state.loading = false;
            fulfilledNotify(state, 'Journals has been deleted');
        });

        builder.addCase(deleteItemsByIds.rejected, (state, action) => {
            state.loading = false;
            rejectNotify(state, action);
        });

        builder.addCase(deleteItem.pending, (state) => {
            state.loading = true
            resetNotify(state);
        })

        builder.addCase(deleteItem.fulfilled, (state) => {
            state.loading = false
            fulfilledNotify(state, `${'Journals'.slice(0, -1)} has been deleted`);
        })

        builder.addCase(deleteItem.rejected, (state, action) => {
            state.loading = false
            rejectNotify(state, action);
        })

        builder.addCase(create.pending, (state) => {
            state.loading = true
            resetNotify(state);
        })
        builder.addCase(create.rejected, (state, action) => {
            state.loading = false
            rejectNotify(state, action);
        })

        builder.addCase(create.fulfilled, (state) => {
            state.loading = false
            fulfilledNotify(state, `${'Journals'.slice(0, -1)} has been created`);
        })

        builder.addCase(update.pending, (state) => {
            state.loading = true
            resetNotify(state);
        })
        builder.addCase(update.fulfilled, (state) => {
            state.loading = false
            fulfilledNotify(state, `${'Journals'.slice(0, -1)} has been updated`);
        })
        builder.addCase(update.rejected, (state, action) => {
            state.loading = false
            rejectNotify(state, action);
        })

        builder.addCase(uploadCsv.pending, (state) => {
            state.loading = true;
            resetNotify(state);
        })
        builder.addCase(uploadCsv.fulfilled, (state) => {
            state.loading = false;
            fulfilledNotify(state, 'Journals has been uploaded');
        })
        builder.addCase(uploadCsv.rejected, (state, action) => {
            state.loading = false;
            rejectNotify(state, action);
        })

    },
})

// Action creators are generated for each case reducer function
 export const { setRefetch } = journalsSlice.actions

export default journalsSlice.reducer
