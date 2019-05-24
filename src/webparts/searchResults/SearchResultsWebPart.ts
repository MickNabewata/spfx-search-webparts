import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, PropertyPaneDynamicFieldSet, PropertyPaneDynamicField, DynamicDataSharedDepth } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import * as strings from 'SearchResultsWebPartStrings';
import SearchResults from './components/SearchResults';
import { ISearchResultsProps, ISearchResult } from './components/ISearchResultsProps';
import { DynamicProperty } from '@microsoft/sp-component-base';
import { propertyId } from '../../dynamicData/searchQuery';

/** 検索結果表示Webパーツプロパティ */
export interface ISearchResultsWebPartProps {
  /** クエリテキスト */
  searchQuery : DynamicProperty<string>;
}

/** 検索結果表示Webパーツ */
export default class SearchResultsWebPart extends BaseClientSideWebPart<ISearchResultsWebPartProps> {

  /** レンダリング */
  public render(): void {
    // 動的データ取得
    let queryText : string = (this.properties.searchQuery)? this.properties.searchQuery.tryGetValue() : undefined;
    let searchResults : ISearchResult[] = [];
    if(queryText) searchResults = this.getSearchResults(queryText);

    // 描画
    const element: React.ReactElement<ISearchResultsProps > = React.createElement(
      SearchResults,
      {
        results : searchResults,
        tagClicked : this.tagClicked
      }
    );
    ReactDom.render(element, this.domElement);
  }

  /** 検索実施 */
  private getSearchResults(queryText : string) : ISearchResult[]
  {
    return this.createTestCases(queryText);
  }

  /** テストケース */
  private createTestCases(queryText : string) : ISearchResult[]
  {
    let datas = this.createTestDatas(queryText, 10);

    datas.push(
      {
        title : `大きい画像`,
        thumbnailUrl : `http://flat-icon-design.com/f/f_object_28/s512_f_object_28_0bg.png`,
        iconUrl : 'http://flat-icon-design.com/f/f_object_173/s32_f_object_173_0bg.png',
        tags : ['big', 'img'],
        url : `https://www.google.co.jp/search?q=big`,
        toolTip : `ツールチップbig`,
        body : '大きいよ',
        userAccount : `watanabemi@techdev.onmicrosoft.com`,
        timeStamp : new Date(2019, 2, 1, 10, 20, 30, 40).toString()
      }
    );

    datas.push(
      {
        title : `小さい画像`,
        thumbnailUrl : `http://flat-icon-design.com/f/f_object_28/s16_f_object_28_0bg.png`,
        iconUrl : 'http://flat-icon-design.com/f/f_object_173/s32_f_object_173_0bg.png',
        tags : ['big', 'img'],
        url : `https://www.google.co.jp/search?q=big`,
        toolTip : `ツールチップbig`,
        body : '小さいよ',
        userAccount : `watanabemi@techdev.onmicrosoft.com`,
        timeStamp : new Date(2019, 2, 1, 10, 20, 30, 40).toString()
      }
    );

    datas.push(this.createTestData('タグなし', 1, 0));

    datas.push(
      {
        title : '存在しないデータ',
        thumbnailUrl : `https://www.notexists.com/dammy.png`,
        iconUrl :`https://www.notexists.com/dammy.png`,
        tags : [],
        url : `https://www.notexists.com/`,
        toolTip : `存在しないよ`,
        body : '存在しません。',
        userAccount : `notexists@techdev.onmicrosoft.com`,
        timeStamp : new Date(2019, 2, 1, 10, 20, 30, 40).toString()
      }
    );

    datas.push(
      {
        title : `空データ`,
        thumbnailUrl : '',
        iconUrl : '',
        tags : [],
        url : '',
        toolTip : '',
        body : '',
        userAccount : '',
        timeStamp : ''
      }
    );

    datas.push(
      {
        title : `NULLデータ`,
        thumbnailUrl : null,
        iconUrl : null,
        tags : null,
        url : null,
        toolTip : null,
        body : null,
        userAccount : null,
        timeStamp : null
      }
    );

    datas.push(
      {
        title : `UNDEFINEDデータ`,
        thumbnailUrl : undefined,
        iconUrl : undefined,
        tags : undefined,
        url : undefined,
        toolTip : undefined,
        body : undefined,
        userAccount : undefined,
        timeStamp : undefined
      }
    );

    return datas;
  }

  /** テストデータ作成 */
  private createTestDatas(queryText : string, dataCount : number) : ISearchResult[]
  {
    let datas : ISearchResult[] = [];

    for(let i = 1; i <= dataCount; i++)
    {
      datas.push(this.createTestData(queryText, i, 5));
    }

    return datas;
  }

  /** テストデータを1つ作成 */
  private createTestData(title : string, num : number, tagsCount : number = 3) : ISearchResult
  {
    let tags : string[] = [];
    for(let i = 1; i <= tagsCount; i++)
    {
      tags.push(`タグ${i}`);
    }

    return {
      title : `${title}${num}`,
      thumbnailUrl : `https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png`,
      iconUrl : 'http://flat-icon-design.com/f/f_object_173/s32_f_object_173_0bg.png',
      tags : tags,
      url : `https://www.google.co.jp/search?q=${num}`,
      toolTip : `ツールチップ${num}`,
      body : `本文${num}　aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよわをんあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよわをんあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよわをんあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよわをんあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよわをんあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよわをん`,
      userAccount : `watanabemi@techdev.onmicrosoft.com`,
      timeStamp : new Date(2019, 2, 1 + num, 10, 20, 30, 40).toString()
    };
  }

  /** 検索結果のタグクリックイベント */
  private tagClicked = (tag : string) => {
    alert(tag);
  }

  /** 破棄イベント */
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  /** データバージョン */
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  /** プロパティウィンドウの構成 */
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName : '接続',
              groupFields : [
                PropertyPaneDynamicFieldSet({
                  label : '接続',
                  fields : [
                    PropertyPaneDynamicField(
                      propertyId,
                      {
                        label : '検索クエリ取得元'
                      }
                    )
                  ],
                  sharedConfiguration : {
                    depth : DynamicDataSharedDepth.Property
                  }
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
