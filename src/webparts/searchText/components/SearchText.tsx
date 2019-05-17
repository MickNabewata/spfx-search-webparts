import * as React from 'react';
import styles from './SearchText.module.scss';
import { ISearchTextProps } from './ISearchTextProps';
import { ISearchTextStates } from './ISearchTextStates';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import queryUtil from '../../../util/queryUtil';

/** 検索ボックスコントロール */
export default class SearchText extends React.Component<ISearchTextProps, ISearchTextStates> {

  /** 検索ボックス初期化 */
  constructor(props : ISearchTextProps)
  {
    super(props);

    let query = new queryUtil().get().hashes['query'];

    this.state = {
      query : (query)? query : ''
    };
  }

  /** 検索イベント */
  private onSearch = (value : any)=> {
    let util = new queryUtil().get();

    if(value)
    {
      util = util.addHashes({query : value});
    }
    else
    {
      util = util.removehashKey('query').addHashes({query : ''});
    }

    window.location.href = util.createFullUrl();
  }

  /** 描画 */
  public render(): React.ReactElement<ISearchTextProps> {
    return (
      <SearchBox
        placeholder='検索'
        onSearch={this.onSearch}
        value={this.state.query}
        />
    );
  }
}
