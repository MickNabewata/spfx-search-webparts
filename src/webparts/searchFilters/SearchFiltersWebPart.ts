import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import * as strings from 'SearchFiltersWebPartStrings';
import SearchFilters from './components/SearchFilters';
import { ISearchFiltersProps, IFilterColumn, ISingleFilterColumn, IMultiFilterColumn, ISingleFilterValue, IMultiFilterValue } from './components/ISearchFiltersProps';

/** 検索フィルタWebパーツ プロパティ定義 */
export interface ISearchFiltersWebPartProps {
}

/** 検索フィルタWebパーツ */
export default class SearchFiltersWebPart extends BaseClientSideWebPart<ISearchFiltersWebPartProps> {

  /** 描画 */
  public render(): void {
    const element: React.ReactElement<ISearchFiltersProps > = React.createElement(
      SearchFilters,
      {
        filters : this.getFilters()
      }
    );

    ReactDom.render(element, this.domElement);
  }

  /** フィルタデータ取得 */
  private getFilters() : Array<ISingleFilterColumn | IMultiFilterColumn> {
    return this.createTestCase();
  }

  /** テストケース生成 */
  private createTestCase() : Array<ISingleFilterColumn | IMultiFilterColumn> {
    let ret : Array<ISingleFilterColumn | IMultiFilterColumn> = [];
    for(let i = 1; i <= 4; i++)
    {
      if(i == 3)
      {
        ret.push(this.createMultiTestData(i));
      }
      else
      {
        ret.push(this.createSingleTestData(i));
      }
    }
    return ret;
  }

  /** 単一選択テストデータ生成 */
  private createSingleTestData(num : number) : ISingleFilterColumn {
    return {
      type : 'ISingleFilterColumn',
      internalName : `internalName${num}`,
      displayName : `表示名${num}`,
      values : [
        this.createSingleFilterTestData(1),
        this.createSingleFilterTestData(2),
        this.createSingleFilterTestData(3)
      ]
    };
  }

  /** 単一選択フィルタテストデータ生成 */
  private createSingleFilterTestData(num : number) : ISingleFilterValue {
    return {
      value : `単数値${num}`,
      count : num,
      selectValueCallBack : this.singleValueCallBack
    };
  }

  /** 複数選択テストデータ生成 */
  private createMultiTestData(num : number) : IMultiFilterColumn {
    return {
      type : 'IMultiFilterColumn',
      internalName : `internalName${num}`,
      displayName : `表示名${num}`,
      values : [
        this.multiSingleFilterTestData(1),
        this.multiSingleFilterTestData(2),
        this.multiSingleFilterTestData(3)
      ]
    };
  }

  /** 複数選択フィルタテストデータ生成 */
  private multiSingleFilterTestData(num : number) : IMultiFilterValue {
    return {
      value : `複数値${num}`,
      count : num,
      selectValueCallBack : this.multiValueCallBack
    };
  }

  /** 単一選択フィルタ選択時コールバック */
  private singleValueCallBack = (value : string) => {
    alert(value);
  }

  /** 複数選択フィルタ選択時コールバック */
  private multiValueCallBack = (value : string[]) => {
    alert(value.join(','));
  }

  /** 破棄イベント */
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  /** データバージョン取得 */
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  /** プロパティ定義 */
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
      ]
    };
  }
}
