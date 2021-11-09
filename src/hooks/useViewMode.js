import {useEffect, useState} from "react";
import {DATA_VIEW_MOD} from "../consts";

const getViewModState = () => {
  return localStorage.getItem('view') || DATA_VIEW_MOD.TABLE
}

const useViewMode = () => {
  const [viewMode, setViewMode] = useState(getViewModState)

  useEffect(() => {
    localStorage.setItem('view', viewMode)
  }, [viewMode])

  return [viewMode, setViewMode]
}

export default useViewMode