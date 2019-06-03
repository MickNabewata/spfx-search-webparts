import * as React from 'react';
import styles from './CardLayout.module.scss';
import { ICardLayoutProps } from './ICardLayoutProps';
import { ISearchResultsStates } from './ICardLayoutStates';
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardPreview,
  DocumentCardTitle,
  IDocumentCardPreviewProps,
  IDocumentCardPreviewImage,
  DocumentCardDetails,
  DocumentCardLocation
} from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Link } from 'office-ui-fabric-react/lib/Link';

/** カード表示コンポーネント */
export default class SearchResults extends React.Component<ICardLayoutProps, ISearchResultsStates> {

  /** カード表示コンポーネント初期化 */
  constructor(props : ICardLayoutProps)
  {
    super(props);

    this.state = {
    };
  }

  /** プレビュー画像プロパティの生成 */
  private getPreviewImages(props : ICardLayoutProps) : IDocumentCardPreviewImage[] {
    return [
      {
        name : props.title,
        previewImageSrc : props.thumbnailUrl,
        iconSrc : props.iconUrl,
        imageFit : ImageFit.centerCover,
        height : 100
      }
    ];
  }

  /** タグ一覧の描画 */
  private renderTags(props : ICardLayoutProps) : JSX.Element {
    return (
      <React.Fragment>
        {
          (props.tags)?
            props.tags.map((tag, i) => {
              return (
                <Link href='' onClick={this.tagClicked(tag)} className={styles.tag} key={`tag-${i}`}>
                  {tag}
                </Link>
              );
            })
          : null
        }
      </React.Fragment>
    );
  }

  /** タグクリックイベント */
  private tagClicked = (tag : string) => (ev? : React.MouseEvent<HTMLElement, MouseEvent>) => {
    this.props.tagClicked(tag);
  }

  /** レンダリング */
  public render(): React.ReactElement<ICardLayoutProps> {
    return (
      <DocumentCard className={`${styles.cardLayout}`} >
        <a href={this.props.url} title={this.props.toolTip} >
          <DocumentCardPreview previewImages={this.getPreviewImages(this.props)}/>
        </a>
        <div className={styles.tagArea}>
          { this.renderTags(this.props) }
        </div>
        <div className={styles.titleArea} >
          <a href={this.props.url} title={this.props.toolTip} className={styles.titleLink}>
            <DocumentCardTitle
              title={this.props.title}
              shouldTruncate={true}
              className={styles.title}
            />
          </a>
        </div>
        <DocumentCardDetails className={styles.bodyArea}>
          {this.props.body}
        </DocumentCardDetails>
        <DocumentCardActivity
          activity={this.props.timeStamp}
          people={[{ name: this.props.userAccount, profileImageSrc: undefined }]}
          className={styles.footerArea}
        />
      </DocumentCard>
    );
  }
}
