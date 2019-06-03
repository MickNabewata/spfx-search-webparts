/** 単数選択検索フィルタWebパーツ プロパティ定義 */
export interface ISingleValueFilterProps {
    /** フィルタの値 */
    values : IFilterValue[];
}

/** フィルタの値 */
export interface IFilterValue {
    /** 値 */
    value : string;

    /** 件数 */
    count : number;

    /** 選択時コールバック */
    selectValueCallBack : (value : string) => void;
}