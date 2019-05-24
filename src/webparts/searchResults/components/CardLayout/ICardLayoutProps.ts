/** カード表示コンポーネントプロパティ */
export interface ICardLayoutProps {

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

  /** タグクリックコールバック */
  tagClicked : (tag : string) => void;
}
