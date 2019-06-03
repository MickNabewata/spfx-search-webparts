/** 検索フィルタWebパーツ プロパティ定義 */
export interface ISearchFiltersProps {
    /** フィルタ項目一覧 単数選択 */
    filters : Array<ISingleFilterColumn | IMultiFilterColumn>;
}

/** フィルタ項目 基底 */
export interface IFilterColumn {

    /** 型名 */
    type : 'ISingleFilterColumn' | 'IMultiFilterColumn';

    /** 内部名 */
    internalName : string;

    /** 表示名 */
    displayName : string;

    /** フィルタの値 */
    values : ISingleFilterValue[] | IMultiFilterValue[];
}

/** フィルタ項目 単数選択 */
export interface ISingleFilterColumn extends IFilterColumn {
    /** 型名 */
    type : 'ISingleFilterColumn';
    /** フィルタの値 */
    values : ISingleFilterValue[];
}

/** フィルタ項目 複数選択 */
export interface IMultiFilterColumn extends IFilterColumn {
    /** 型名 */
    type : 'IMultiFilterColumn';
    /** フィルタの値 */
    values : IMultiFilterValue[];
}

/** フィルタの値 基底 */
export interface IFilterValue<T, U> {
    /** 値 */
    value : T;

    /** 件数 */
    count : number;

    /** 選択時コールバック */
    selectValueCallBack : (value : U) => void;
}

/** フィルタの値 単数選択 */
export interface ISingleFilterValue extends IFilterValue<string, string> {}

/** フィルタの値 複数選択 */
export interface IMultiFilterValue extends IFilterValue<string, string[]> {}