import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'SearchTextWebPartStrings';
import SearchText from './components/SearchText';
import { ISearchTextProps } from './components/ISearchTextProps';

/** 検索ボックスWebパーツ プロパティ */
export interface ISearchTextWebPartProps {
  /** Webパーツ接続 */
  connection : string;
}

/** 検索ボックスWebパーツ */
export default class SearchTextWebPart extends BaseClientSideWebPart<ISearchTextWebPartProps> {

  /** レンダリング */
  public render(): void {
    const element: React.ReactElement<ISearchTextProps > = React.createElement(
      SearchText
    );

    ReactDom.render(element, this.domElement);
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
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('connection', {
                  label: strings.ConnectionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
