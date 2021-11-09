import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {useCallback, useState} from "react";
import Tooltip from "@mui/material/Tooltip";
import {makeStyles} from "@mui/styles";
import {useCopyToClipboard} from "react-use";
import {ClickAwayListener} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer'
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  text: {
    whiteSpace: 'nowrap'
  }
}))

const STATUS_ENUM = {
  COPY: 'copy',
  COPIED: 'copied'
}

const STATUS_VIEW = {
  [STATUS_ENUM.COPY]: 'Copy!',
  [STATUS_ENUM.COPIED]: 'Copied!'
}

const CopyToClipBoard = ({text}) => {
  const [status, setStatus] = useState(STATUS_ENUM.COPY)
  const [, copyToClipboard] = useCopyToClipboard();
  const classes = useStyles()

  const onCopyToClipboardHandler = useCallback(() => {
    copyToClipboard(text)
    setStatus(STATUS_ENUM.COPIED)
  }, [copyToClipboard, text])

  const onClickAwayCopyHandler = useCallback(() => {
    setStatus(STATUS_ENUM.COPY)
  }, [])

  return (
    <ClickAwayListener onClickAway={onClickAwayCopyHandler}>
      <Tooltip
        disableFocusListener
        disableTouchListener
        title={STATUS_VIEW[status]}
      >
        <Box className={classes.root} display="flex" alignItems="center" onClick={onCopyToClipboardHandler}>
          <ContentCopyIcon fontSize="small" color="primary" className={classes.icon}/>
          <Box className={classes.text}>{text}</Box>
        </Box>
      </Tooltip>
    </ClickAwayListener>
)
};

CopyToClipBoard.propTypes = {
  text: PropTypes.string.isRequired
}

export default CopyToClipBoard;