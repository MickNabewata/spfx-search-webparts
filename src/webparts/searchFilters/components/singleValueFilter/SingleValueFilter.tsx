import * as React from 'react';
import styles from './SingleValueFilter.module.scss';
import { ISingleValueFilterProps, IFilterValue } from './ISingleValueFilterProps';
import { ISingleValueFilterStates } from './ISingleValueFilterStates';
import { DefaultButton } from 'office-ui-fabric-react';

/** 単数選択検索フィルタWebパーツ */
export default class SingleValueFilter extends React.Component<ISingleValueFilterProps, ISingleValueFilterStates> {

  /** 単数選択検索フィルタWebパーツ 初期化 */
  constructor(props : ISingleValueFilterProps)
  {
    super(props);

    this.state = {};
  }

  /** 1行分の描画 */
  private renderCell(item : IFilterValue) : JSX.Element {
    return (
      <DefaultButton
        data-automation-id={item.value}
        allowDisabledFocus={true}
        text={`${item.value}（${item.count}）`}
        onClick={this.onSelectValue(item)}
        className={styles.SingleValueFilter}
        key={item.value}
      />
    );
  }

  /** フィルタイベント */
  private onSelectValue = (item : IFilterValue) => () => {
    item.selectValueCallBack(item.value);
  }

  /** 描画 */
  public render(): React.ReactElement<ISingleValueFilterProps> {
    return (
      <React.Fragment>
        {this.props.values.map((value) => {
          return this.renderCell(value);
        })}
      </React.Fragment>
    );
  }
}
