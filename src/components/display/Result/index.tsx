import React from 'react';
import { Stack } from '@mui/material';
import type { SxProps } from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Report as ReportIcon,
  Dangerous as DangerousIcon,
  Warning as WarningIcon,
  Block as BlockIcon,
} from '@mui/icons-material';
import { Space, type SpaceProps } from '@iimm/react-shared';

import { ContentCard, type ContentCardProps } from '../../container';

const iconMap = {
  success: <CheckCircleIcon color='success' sx={{ fontSize: 70 }} />,
  error: <DangerousIcon color='error' sx={{ fontSize: 70 }} />,
  info: <ReportIcon color='info' sx={{ fontSize: 70 }}/>,
  warning: <WarningIcon color='warning' sx={{ fontSize: 70 }} />,
  404: <BlockIcon color='secondary' sx={{ fontSize: 70 }}/>,
};

export const Result = (props: ResultProps) => {
  const { icon, title, subTitle, status = 'info', actions, sx, content, children, spaceProps, ...restProps } = props;
  return (
    <ContentCard
      sx={{
        justifyContent: 'center',
        ...(sx || {}),
      }}
      {...restProps}
    >
      <Stack
        direction='column'
        justifyContent='center'
        alignContent='center'
        textAlign='center'
        spacing={1.5}
      >
        <div>
          { icon || iconMap[status]}
        </div>
        { title ? (
          <div
            style={{
              fontSize: '1.25rem',
              lineHeight: '1.5rem',
            }}
          >
            {title}
          </div>
        ) : (
          status === '404' ? (
            <div
              style={{
                fontSize: '1.25rem',
                lineHeight: '1.5rem',
              }}
            >
              你没有权限进入此模块
            </div>
          ) : null
        )}
        { !!subTitle && (
          <div
            style={{
              fontSize: '1rem',
              lineHeight: '1.25rem',
              color: '#00000073',
            }}
          >
            {subTitle}
          </div>
        )}
        { (typeof content !== 'undefined' || !!children) && (
          <div>
            {content ?? children}
          </div>
        )}
        { !!actions && (
          <Space justify='center' {...(spaceProps || {})}>
            { actions }
          </Space>
        )}
      </Stack>
    </ContentCard>
  );
};

Result.defaultProps = {
  status: 'info',
};

Result.displayName = 'iimm.Mui.Result';

export interface ResultProps extends Omit<ContentCardProps, 'content'> {
  icon?: React.ReactNode,
  title?: React.ReactNode,
  subTitle?: React.ReactNode,
  actions?: React.ReactNode | React.ReactNode[],
  /** @default 'info' */
  status?: 'success' | 'error' | 'info' | 'warning' | '404',
  sx?: SxProps,
  spaceProps?: SpaceProps,
  /** children的别名，优先级高于children */
  content?: React.ReactNode,
}
