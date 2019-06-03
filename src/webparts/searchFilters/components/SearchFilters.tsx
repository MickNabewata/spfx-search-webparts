import * as React from 'react';
import styles from './SearchFilters.module.scss';
import { ISearchFiltersProps, ISingleFilterColumn, IMultiFilterColumn } from './ISearchFiltersProps';
import { ISearchFiltersStates } from './ISearchFiltersStates';
import SingleValueFilter from './singleValueFilter/SingleValueFilter';
import { GroupedList, IGroup, IGroupHeaderProps } from 'office-ui-fabric-react/lib/GroupedList';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

/** 検索フィルタWebパーツ */
export default class SearchFilters extends React.Component<ISearchFiltersProps, ISearchFiltersStates> {

  /** 検索フィルタWebパーツ 初期化 */
  constructor(props : ISearchFiltersProps)
  {
    super(props);

    this.state = {};
  }

  /** フィルタ項目が無い場合の表示 */
  private renderNoData(key : string) : JSX.Element {
    return <div key={key}>フィルタデータがありません。</div>;
  }

  /** グループヘッダーの描画 */
  private renderGroupHeader(props: IGroupHeaderProps): JSX.Element {
    const toggleCollapse = (): void => {
      props.onToggleCollapse!(props.group!);
    };

    return (
      <div onClick={toggleCollapse} className={styles.filterGroupHeader}>
        {props.group!.name}
        <div className={styles.filterGroupHeaderButton}>
          {props.group!.isCollapsed ? <Icon iconName='Add' /> : <Icon iconName='Remove' />}
        </div>
      </div>
    );
  }

  /** 描画 */
  public render() : React.ReactElement<ISearchFiltersProps> {

    // フィルタ一覧
    let filters : JSX.Element[] = [];

    // グループ一覧
    let groups : IGroup[] = [];

    // プロパティで渡されたフィルタの分だけ繰り返しながらフィルタ一覧とグループ一覧を生成
    if(this.props.filters && this.props.filters.length > 0)
    {
      this.props.filters.forEach((filter, i) => {

        if(filters.values && filter.values.length > 0)
        {
          // 単数選択
          if(filter.type === 'ISingleFilterColumn')
          {
            filters.push(<SingleValueFilter values={filter.values} key={`filter-${filter.internalName}`} />);
          }
          // サポートされていない種類
          else
          {
            filters.push(this.renderNoData(`filter-${filter.internalName}`));
          }
        }
        else
        {
          filters.push(this.renderNoData(`filter-${filter.internalName}`));
        }

        // グループの生成
        groups.push({
          key : `filterGroup${i}`,
          name : filter.displayName,
          startIndex : i,
          count : 1,
        });

      });
    }
    else
    {
      filters.push(this.renderNoData(`filter-noData`));
    }

    // 描画
    return (
      <GroupedList
        items={filters}
        onRenderCell={(depth : number, item : JSX.Element, i : number) : JSX.Element => { return item; }}
        groups={groups}
        className={styles.searchFilter}
        groupProps={
          {
            onRenderHeader : this.renderGroupHeader
          }
        }
      />
    );
  }
}
