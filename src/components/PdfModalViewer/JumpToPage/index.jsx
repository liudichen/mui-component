import { useSafeState } from 'ahooks';
import { InputBase, Stack } from '@mui/material';

import { Modal } from '../../Modal';

export const JumpToPage = (props) => {
  const { trigger, handlePageChange } = props;
  const [ pg, setPg ] = useSafeState(1);
  return (
    <Modal
      title='页面跳转'
      trigger={trigger}
      maxWidth='xs'
      onConfirm={() => handlePageChange(pg)}
    >
      <Stack direction='row' alignItems='center' sx={{ my: 1 }}>
        <span>跳转到：</span>
        <InputBase
          value={pg}
          type='number'
          onChange={(e) => setPg(+e.target.value || 1)}
          sx={{ border: '1px solid grey' }}
        />
      </Stack>
    </Modal>
  );
};

JumpToPage.displayName = 'iimm.Mui.PdfModalViewer.JumpToPage';
