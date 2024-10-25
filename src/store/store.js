import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import taskReducer from "./taskSlice";

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
        tasks: taskReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER, PERSIST],
            },
        }),
});

export const persistor = persistStore(store);