import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';

import usersSlice from "./users/usersSlice";
import artworksSlice from "./artworks/artworksSlice";
import challengesSlice from "./challenges/challengesSlice";
import communitiesSlice from "./communities/communitiesSlice";
import eventsSlice from "./events/eventsSlice";
import journalsSlice from "./journals/journalsSlice";
import meditationsSlice from "./meditations/meditationsSlice";

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,

users: usersSlice,
artworks: artworksSlice,
challenges: challengesSlice,
communities: communitiesSlice,
events: eventsSlice,
journals: journalsSlice,
meditations: meditationsSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
