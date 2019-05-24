import * as React from 'react';
import styles from './SearchResults.module.scss';
import { ISearchResultsProps } from './ISearchResultsProps';
import { ISearchResultsStates } from './ISearchResultsStates';
import CardLayout from './CardLayout/CardLayout';

/** 検索結果コントロール */
export default class SearchResults extends React.Component<ISearchResultsProps, ISearchResultsStates> {

  /** 検索結果コントロール初期化 */
  constructor(props : ISearchResultsProps)
  {
    super(props);

    this.state = {
    };
  }

  /** レンダリング */
  public render(): React.ReactElement<ISearchResultsProps> {
    return (
      <div className={styles.sarchResults} >
        {
          this.props.results.map((result, i) => {
            return <CardLayout {...result} tagClicked={this.props.tagClicked} key={`cardLayout-${i}`} />;
          })
        }
      </div>
    );
  }
}
