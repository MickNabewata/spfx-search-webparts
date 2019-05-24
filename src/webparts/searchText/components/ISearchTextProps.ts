import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface ISearchTextProps {

  /** テーマ */
  themeVariant : IReadonlyTheme;

  /** タイトル */
  title : string;

  /** クエリ初期値 */
  initialQuery : string;

  /** クエリ変更時コールバック */
  onQueryChanged : (value : string) => void;
}
