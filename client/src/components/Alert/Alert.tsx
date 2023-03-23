import { Fade, Alert } from "@mui/material"
import { useEffect, useState } from "react"

export const SuccessfulQuery = () => {
  const [rendered, toggleRendered] = useState<boolean>(false)

  useEffect(() => {
    toggleRendered(true);
    //fades away
    setTimeout(() => {
      toggleRendered(false)
    }, 3000)
  }, [])

  return (
   <div id="alertDiv">
     <Fade in={rendered} timeout={{enter: 600, exit: 550}} mountOnEnter unmountOnExit>
      <Alert onClose={() => {
        toggleRendered(false)
        }} sx={{border: 0.5, height: 45, display: 'flex', alignItems:'center', width: 175, position: 'fixed'}} severity="success">Successful Query!</Alert>
    </Fade>
   </div>
  )
}

export const BadQuery = (props: BadQueryProps) => {
  const [rendered, toggleRendered] = useState<boolean>(false)
  const [errorMessage, setMessage] = useState<string>('Invalid query!')

  useEffect(() => {
    toggleRendered(true);
    //fades away
    setTimeout(() => {
      toggleRendered(false)
    }, 3000)
  }, [])

  return (
   <div id="alertDiv">
     <Fade in={rendered} timeout={{enter: 600, exit: 550}} mountOnEnter unmountOnExit>
      <Alert onClose={() => {
        toggleRendered(false)
        }} sx={{border: 0.5, display: 'flex', alignItems:'center', width: 175, position: 'fixed'}} severity="error">{props.errorMessage}</Alert>
    </Fade>
   </div>
  )
}

interface BadQueryProps {
  errorMessage: string
}


