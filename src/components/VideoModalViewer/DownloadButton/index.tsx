import React, { Component } from 'react';
import classNames from 'classnames';
import { ControlBarControlProps } from 'video-react';


export class DownloadButton extends Component<ControlBarControlProps> {
  // @ts-ignore
  constructor(props: ControlBarControlProps, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    //
  }

  render() {
    const { player, className } = this.props;
    // @ts-ignore
    const { currentSrc } = player;

    return (
      <a
        ref={(c) => {
          // @ts-ignore
          this.button = c;
        }}
        className={classNames(className, {
          'video-react-control': true,
          'video-react-button': true,
        })}
        href={currentSrc}
        download
        style={{
          backgroundImage:
            'url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjE4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTE5IDloLTRWM0g5djZINWw3IDcgNy03ek01IDE4djJoMTR2LTJINXoiLz4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
        tabIndex={0}
        onClick={this.handleClick}
      />
    );
  }
}
