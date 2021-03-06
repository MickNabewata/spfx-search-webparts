/** 検索結果Webパーツプロパティ */
export interface ISearchResultsProps {
  /** 検索結果 */
  results : ISearchResult[];
  /** タグクリックコールバック */
  tagClicked : (tag : string) => void;
}

/** 検索結果 */
export interface ISearchResult {

  /** タイトル */
  title : string;

  /** サムネイル画像URL */
  thumbnailUrl : string;

  /** アイコン画像URL */
  iconUrl : string;

  /** タグ一覧 */
  tags : string[];

  /** クリック時リンク先URL */
  url : string;

  /** ツールチップ */
  toolTip : string;

  /** 本文 */
  body : string;

  /** ユーザーアカウント */
  userAccount : string;

  /** タイムスタンプ */
  timeStamp : string;
}
