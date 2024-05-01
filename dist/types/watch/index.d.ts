import type { ComputedRef, ReactiveEffectOptions, Ref } from '@vue/reactivity';
export type WatchSource<T = any> = Ref<T> | ComputedRef<T> | (() => T);
export type WatchCallback<V = any, OV = any> = (value: V, oldValue: OV, onInvalidate: InvalidateCbRegistrator) => any;
export type WatchStopHandle = () => void;
type MapSources<T> = {
    [K in keyof T]: T[K] extends WatchSource<infer V> ? V : T[K] extends object ? T[K] : never;
};
type MapOldSources<T, Immediate> = {
    [K in keyof T]: T[K] extends WatchSource<infer V> ? Immediate extends true ? (V | undefined) : V : T[K] extends object ? Immediate extends true ? (T[K] | undefined) : T[K] : never;
};
type InvalidateCbRegistrator = (cb: () => void) => void;
export interface WatchOptionsBase {
    /**
     * @depreacted ignored in `@vue-reactivity/watch` and will always be `sync`
     */
    flush?: 'sync' | 'pre' | 'post';
    onTrack?: ReactiveEffectOptions['onTrack'];
    onTrigger?: ReactiveEffectOptions['onTrigger'];
}
export interface WatchOptions<Immediate = boolean> extends WatchOptionsBase {
    immediate?: Immediate;
    deep?: boolean;
}
export declare function watch<T extends Readonly<Array<WatchSource<unknown> | object>>, Immediate extends Readonly<boolean> = false>(sources: T, cb: WatchCallback<MapSources<T>, MapOldSources<T, Immediate>>, options?: WatchOptions<Immediate>): WatchStopHandle;
export declare function watch<T, Immediate extends Readonly<boolean> = false>(source: WatchSource<T>, cb: WatchCallback<T, Immediate extends true ? (T | undefined) : T>, options?: WatchOptions<Immediate>): WatchStopHandle;
export declare function watch<T extends object, Immediate extends Readonly<boolean> = false>(source: T, cb: WatchCallback<T, Immediate extends true ? (T | undefined) : T>, options?: WatchOptions<Immediate>): WatchStopHandle;
export {};
