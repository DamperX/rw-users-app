import React from 'react';
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import {DATA_VIEW_MOD} from "../../consts";
import PropTypes from "prop-types";

const ToggleViewMode = ({view, onHandleChange}) => {
  return (
    <ToggleButtonGroup
      value={view}
      exclusive
      onChange={onHandleChange}
      size="small"
    >
      <ToggleButton value={DATA_VIEW_MOD.GRID} data-testid="toggle-data-viewmode-grid">
        <GridViewIcon />
      </ToggleButton>
      <ToggleButton value={DATA_VIEW_MOD.TABLE} data-testid="toggle-data-viewmode-table">
        <FormatListBulletedIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

ToggleViewMode.propTypes = {
  view: PropTypes.oneOf([DATA_VIEW_MOD.GRID, DATA_VIEW_MOD.TABLE]).isRequired,
  onHandleChange: PropTypes.func.isRequired
}

export default ToggleViewMode;