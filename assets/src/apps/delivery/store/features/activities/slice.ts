import {
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityAdapter,
  EntityId,
  EntityState,
  PayloadAction,
  Slice,
} from '@reduxjs/toolkit';
import { ObjectiveMap } from 'data/content/activity';
import { RootState } from '../../rootReducer';
import ActivitiesSlice from './name';
export interface ActivityContent {
  custom?: any;
  partsLayout: any[];
  [key: string]: any;
}
export interface IActivity {
  id: EntityId;
  resourceId?: number;
  activitySlug?: string;
  authoring?: any;
  content?: ActivityContent;
  activityType?: any;
  title?: string;
  objectives?: ObjectiveMap;
  tags: number[];
  [key: string]: any;
}

export interface ActivitiesState extends EntityState<IActivity> {
  currentActivityId: EntityId;
}

const adapter: EntityAdapter<IActivity> = createEntityAdapter<IActivity>();

const slice: Slice<ActivitiesState> = createSlice({
  name: ActivitiesSlice,
  initialState: adapter.getInitialState({
    currentActivityId: '' as EntityId,
  }),
  reducers: {
    setActivities(state, action: PayloadAction<{ activities: IActivity[] }>) {
      adapter.setAll(state, action.payload.activities);
    },
    upsertActivity(state, action: PayloadAction<{ activity: IActivity }>) {
      adapter.upsertOne(state, action.payload.activity);
    },
    upsertActivities(state, action: PayloadAction<{ activities: IActivity[] }>) {
      adapter.upsertMany(state, action.payload.activities);
    },
    deleteActivity(state, action: PayloadAction<{ activityId: string }>) {
      adapter.removeOne(state, action.payload.activityId);
    },
    deleteActivities(state, action: PayloadAction<{ ids: string[] }>) {
      adapter.removeMany(state, action.payload.ids);
    },
    setCurrentActivityId(state, action: PayloadAction<{ activityId: EntityId }>) {
      state.currentActivityId = action.payload.activityId;
    },
  },
});

export const {
  setActivities,
  upsertActivity,
  upsertActivities,
  deleteActivity,
  deleteActivities,
  setCurrentActivityId,
} = slice.actions;

// SELECTORS
export const selectState = (state: RootState): ActivitiesState =>
  state[ActivitiesSlice] as ActivitiesState;
export const selectCurrentActivityId = createSelector(
  selectState,
  (state) => state.currentActivityId,
);
const { selectAll, selectById, selectTotal, selectEntities } = adapter.getSelectors(selectState);
export const selectAllActivities = selectAll;
export const selectActivityById = selectById;
export const selectTotalActivities = selectTotal;

export const selectCurrentActivity = createSelector(
  [selectEntities, selectCurrentActivityId],
  (activities, currentActivityId) => activities[currentActivityId],
);

export const selectCurrentActivityContent = createSelector(
  selectCurrentActivity,
  (activity) => activity?.content,
);

export default slice.reducer;
