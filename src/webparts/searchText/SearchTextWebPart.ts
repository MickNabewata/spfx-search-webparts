import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { ThemeProvider, ThemeChangedEventArgs, IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'SearchTextWebPartStrings';
import SearchText from './components/SearchText';
import { ISearchTextProps } from './components/ISearchTextProps';
import queryUtil from '../../util/queryUtil';
import SearchQuery, { propertyId } from '../../dynamicData/searchQuery';

/** 検索ボックスWebパーツ プロパティ */
export interface ISearchTextWebPartProps {

  /** タイトル */
  title : string;

  /** Webパーツ接続 */
  connection : string;
}

/** 検索ボックスWebパーツ */
export default class SearchTextWebPart extends BaseClientSideWebPart<ISearchTextWebPartProps> {

  /** 動的データ */
  private dynamicData : SearchQuery;

  /** クエリ初期値 */
  private initialQuery : string;

  /** テーマプロバイダ */
  private themeProvider : ThemeProvider;

  /** 選択中のテーマ */
  private themeVariant : IReadonlyTheme;

  /** レンダリング */
  public render(): void {

    const element: React.ReactElement<ISearchTextProps> = React.createElement(
      SearchText, {
        themeVariant : this.themeVariant,
        title : this.properties.title,
        initialQuery : this.initialQuery,
        onQueryChanged : this.refreshQuery
      }
    );

    ReactDom.render(element, this.domElement);
  }

  /** クエリ変更時コールバック */
  protected refreshQuery = (value : string) =>
  {
    // 動的データを更新
    this.dynamicData.setPropertyValue(value);
    this.context.dynamicDataSourceManager.notifyPropertyChanged(propertyId);
  }

  /** Webパーツ初期化イベント */
  protected onInit(): Promise<void> {

    // URLパラメータのハッシュ部分(#query=)から値を読み取る
    let query = new queryUtil().get().hashes['query'];
    if(!query) query = '';
    query = decodeURIComponent(query);
    this.initialQuery = query;

    // 動的データ初期化
    this.dynamicData = new SearchQuery();
    this.dynamicData.setPropertyValue(query);
    this.context.dynamicDataSourceManager.initializeSource(this.dynamicData);

    // テーマ取得
    this.themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
    if(this.themeProvider)
    {
      this.themeVariant = this.themeProvider.tryGetTheme();
      this.themeProvider.themeChangedEvent.add(this, this.handleThemeChangedEvent);
    }

    // 初期化終了
    return Promise.resolve();
  }

  /** テーマ変更イベント */
  private handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this.themeVariant = args.theme;
    this.render();
}

  /** 破棄イベント */
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  /** データバージョン取得 */
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  /** プロパティペインの構成 */
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups : [
            {
              groupName : '',
              groupFields : [
                PropertyPaneTextField('title', { label : 'タイトル' })
              ]
            }
          ]
        }
      ]
    };
  }
}
