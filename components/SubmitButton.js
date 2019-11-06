import React from 'react';
import { styled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const SubmitButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 32,
  padding: '0 30px',
});

//TODO: try using Next.js to style this, to avoid the 'className' bug.
export default function StyledComponent({ action, text }) {
  return (
    <SubmitButton
      onClick={action}>{text || "Submit"}
    </SubmitButton>
  );
}
