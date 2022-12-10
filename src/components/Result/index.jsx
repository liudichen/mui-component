import React from 'react';
import { Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReportIcon from '@mui/icons-material/Report';
import DangerousIcon from '@mui/icons-material/Dangerous';
import WarningIcon from '@mui/icons-material/Warning';
import BlockIcon from '@mui/icons-material/Block';

import { ContentCard } from '../ContentCard';
import { Space } from '../Space';

const iconMap = {
  success: <CheckCircleIcon color='success' sx={{ fontSize: 70 }} />,
  error: <DangerousIcon color='error' sx={{ fontSize: 70 }} />,
  info: <ReportIcon color='info' sx={{ fontSize: 70 }}/>,
  warning: <WarningIcon color='warning' sx={{ fontSize: 70 }} />,
  404: <BlockIcon color='secondary' sx={{ fontSize: 70 }}/>,
};

export const Result = (props) => {
  const { icon, title, subTitle, status, actions, sx, content, children, spaceProps, ...restProps } = props;
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
          <Space {...(spaceProps || {})}>
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
