import * as React from 'react';
import styles from './SearchResults.module.scss';
import { ISearchResultsProps, ISearchResult } from './ISearchResultsProps';
import { ISearchResultsStates } from './ISearchResultsStates';
import CardLayout from './CardLayout/CardLayout';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { IRectangle } from 'office-ui-fabric-react/lib/Utilities';

const ROWS_PER_PAGE = 3;
const MAX_ROW_HEIGHT = 500;

/** 検索結果コントロール */
export default class SearchResults extends React.Component<ISearchResultsProps, ISearchResultsStates> {

  private _columnCount: number;
  private _columnWidth: number;
  private _rowHeight: number;

  /** 検索結果コントロール初期化 */
  constructor(props : ISearchResultsProps)
  {
    super(props);

    this.state = {
    };
  }

  /** レンダリング */
  public render2(): React.ReactElement<ISearchResultsProps> {
    
    return (
      <React.Fragment>
        <div>
          <div className={styles.sarchResults} >
            {
              this.props.results.map((result, i) => {
                return (
                  <div className={styles.sarchResult}>
                    <CardLayout {...result} tagClicked={this.props.tagClicked} key={`cardLayout-${i}`} />
                  </div>
                );
              })
            }
          </div>
        </div>
      </React.Fragment>
    );
  }

  /** 1ページ当りアイテム件数の決定 */
  private getItemCountForPage = (itemIndex: number, surfaceRect: IRectangle): number => {
    if (itemIndex === 0) {
      this._columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
      this._columnWidth = Math.floor(surfaceRect.width / this._columnCount);
      this._rowHeight = this._columnWidth;
    }

    return this._columnCount * ROWS_PER_PAGE;
  }

  /** 1ページの高さの決定 */
  private getPageHeight = (): number => {
    return this._rowHeight * ROWS_PER_PAGE;
  }

  /** 1アイテムの描画 */
  private onRenderCell = (item: ISearchResult, index: number | undefined): JSX.Element => {
    let width = `calc(${100 / this._columnCount}% - ${(this._columnCount > 0)? ((this._columnCount - 1) * 10) / this._columnCount : 0}px)`;
    let margin = `${(((index + 1) % this._columnCount) === 0)? 0 : 10}px`;
    return (
      <div className={styles.sarchResult} style={{
        width: width,
        marginRight : margin
      }}>
        <CardLayout {...item} tagClicked={this.props.tagClicked} key={`cardLayout-${index}`} />
      </div>
    );
  }

  /** レンダリング */
  public render(): React.ReactElement<ISearchResultsProps> {
    return (
      <FocusZone>
        <List
          items={this.props.results}
          getItemCountForPage={this.getItemCountForPage}
          getPageHeight={this.getPageHeight}
          renderedWindowsAhead={4}
          onRenderCell={this.onRenderCell}
          className={styles.sarchResults}
        />
      </FocusZone>
    );
  }
}
