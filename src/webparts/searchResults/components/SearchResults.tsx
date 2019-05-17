import * as React from 'react';
import styles from './SearchResults.module.scss';
import { ISearchResultsProps } from './ISearchResultsProps';
import { ISearchResultsStates } from './ISearchResultsStates';
import queryUtil from '../../../util/queryUtil';

/** 検索結果コントロール */
export default class SearchResults extends React.Component<ISearchResultsProps, ISearchResultsStates> {

  /** 検索結果初期化 */
  constructor(props : ISearchResultsProps)
  {
    super(props);

    let query = new queryUtil().get().hashes['query'];

    this.state = {
      query : (query)? query : ''
    };
  }

  /** レンダリング */
  public render(): React.ReactElement<ISearchResultsProps> {
    return (
      <div>{this.state.query}</div>
    );
  }
}
