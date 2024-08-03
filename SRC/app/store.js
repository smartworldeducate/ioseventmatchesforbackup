import { configureStore, } from "@reduxjs/toolkit";
import registerReducer from '../features/register/registerSlice';
import emailReducer from '../features/login/emailSlice';
import passwordReducer from '../features/login/passwordSlice';
import adminListRerducer from '../features/adminlist/adminSlice';
import alleventsReducer from '../features/allevents/alleventSlice';
import activitiReducer from '../features/eventactivityhome/hactivitySlice';
import userActivityReducer from '../features/useractivity/userActivitySlice';
import activityDetailReducer from '../features/activitydetail/activityDetailSlice';
import pastEventReducer from '../features/pastevents/pastEventSlice';
import speakerReducer from '../features/speaker/speakerSlice';
import speakerDetailReducer from '../features/speakerDetail/speakerDetailSlice';
import feedBackReducer from '../features/feedback/feedBackSlice';
import futureEventReducer from '../features/upcommingevents/upcomingEventSlice';
import verifiEmailReducer from '../features/login/emailSlice';
import verifiPasswordReducer from '../features/login/passwordSlice';
import registerActivityReducer from '../features/registeractivity/registerActivitySlice';
import attendeeReducer from '../features/attendees/attendeesSlice';
import meetingReducer from '../features/schedulemeeting/meetingSlice';
import myspeakerReducer from '../features/myspeaker/speakerDetailSlice';
import qrcodeReducer from '../features/qrcode/qrSlice';
import getScheduleAvailabilityReducer from '../features/getschedualavailability/getSchedulaAvailabilitySlice';
import setAvailabilityReducer from '../features/setavailability/setAvailabilitySlice';
import searchMeetingReducer from '../features/serchmeeting/searchMeeetingSlice';
import userScheduleReducer from '../features/userschedule/userScheduleSlice';
import bookUserReducer from '../features/bookuserstatus/bookSlice';
import getDeclineReducer from '../features/decline/confirmDeclineSlice';
import getFavroitAttendeeReducer from '../features/getFavouriteAttendee/favriotAttendeeSlice';
import getShortListAttendeeReducer from '../features/getshortlistattndee/shortListAttendeeSlice';
import favroitStarReducer from '../features/favroitmeeting/favroitMeetingSlice';
import scanerPostReducer from '../features/scanerpostdata/scanerPostSlice';
import getAppVersionReducer from '../features/getappversion/getAppVersionSlice';
import getPrintBadgeReducer from '../features/printerbadge/printerBadgeSlice'
export const store=configureStore({
    reducer:{
        registerState:registerReducer,
        emailState:emailReducer,
        passwordState:passwordReducer,
        adminListState:adminListRerducer,
        alleventsState:alleventsReducer,
        acitivityState:activitiReducer,
        userActivityState:userActivityReducer,
        activityDetailState:activityDetailReducer,
        pastEventState:pastEventReducer,
        speakerState:speakerReducer,
        speakerDetailState:speakerDetailReducer,
        feedBackState:feedBackReducer,
        futureEventState:futureEventReducer,
        emailState:verifiEmailReducer,
        passwordState:verifiPasswordReducer,
        registerActivityState:registerActivityReducer,
        attendeeState:attendeeReducer,
        meetingState:meetingReducer,
        myDetailState:myspeakerReducer,
        qrState:qrcodeReducer,
        getScheduleAvailabilityState:getScheduleAvailabilityReducer,
        setAvailabilityState:setAvailabilityReducer,
        searchMeetingSatte:searchMeetingReducer,
        userScheduleState:userScheduleReducer,
        bookState:bookUserReducer,
        getDeclineState:getDeclineReducer,
        favroitAttendeeState:getFavroitAttendeeReducer,
        shortListAttendeeState:getShortListAttendeeReducer,
        favStarState:favroitStarReducer,
        scanPostState:scanerPostReducer,
        appVersionState:getAppVersionReducer,
        getPrintBadgeState:getPrintBadgeReducer
       }
})