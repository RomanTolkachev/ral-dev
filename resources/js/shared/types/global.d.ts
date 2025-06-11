import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';
import { PageProps as AppPageProps } from '.';
import { Action, ThunkAction } from '@reduxjs/toolkit';
import { IRootState } from '@/features/store/root-reducer';

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    /* eslint-disable no-var */
    var route: typeof ziggyRoute;

    /**
     * 
     */
    interface IConfig<T extends string> {
        DICTIONARY: Record<T, string>;
        DEFAULT_COLUMNS: T[];
        DEFAULT_FILTERS: Partial<Record<T, string[]>> & TDefaultPaginationRequest;
        DEFAULT_REQUEST: IAccreditationAreaDefaultRequest;
        CELL_WIDTH: Partial<Record<T, number>>;
    }
}

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps, AppPageProps { }
}

export type AppThunk = ThunkAction<
    ReturnType<any>,
    IRootState,
    unknown,
    Action
>;
