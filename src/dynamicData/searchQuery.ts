import { IDynamicDataPropertyDefinition, IDynamicDataCallables } from '@microsoft/sp-dynamic-data';
import queryUtil from '../util/queryUtil';

/** プロパティID */
export const propertyId = 'searchQuery';

/** 検索ボックス入力値を公開する動的データクラス */
export default class SearchQuery implements IDynamicDataCallables {

  /** 値 */
  private _value : string;

  /** 動的データの型定義 */
  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return [
      {
        id: propertyId,
        title: '入力値'
      }
    ];
  }
  
  /** 値を取得 */
  public getPropertyValue(propId: string): string {
    switch (propId) {
        case propertyId:
            return this._value;
    }

    throw new Error('プロパティIDが不正です。');
  }

  /** 値をセット */
  public setPropertyValue(value : string)
  {
    this._value = value;
    this.refreshHash();
  }

  /** URLパラメータのハッシュ部分を更新 */
  private refreshHash()
  {
    let util = new queryUtil().get();

    if(this._value)
    {
      util = util.addHashes({query : encodeURIComponent(this._value)});
    }
    else
    {
      util = util.removehashKey('query').addHashes({query : ''});
    }

    window.location.href = util.createFullUrl();
  }
}