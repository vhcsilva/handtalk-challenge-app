import { useEffect, useRef } from 'react'
import interact from 'interactjs'

import { useStyles } from './styles'



const Cut = ({
  begin, 
  end, 
  updateArea,
  handleSelectArea,
  handleUnselectArea,
  index 
}: {
    begin: number, 
    end:number, 
    index:number, 
    updateArea: (index: number, begin: number, end: number) => void,
    handleSelectArea: (index: number) => void,
    handleUnselectArea: () => void
  }) => {
  const classes = useStyles()
  const selfRef = useRef<HTMLDivElement>(null)
  const newCoordRef = useRef({begin, end})

  useEffect(() => {
    if (selfRef.current) {
      let interactable = interact(selfRef.current)
      let x = 0

      interactable.draggable({
        listeners: {
          move (event) {
            x += event.dx
            newCoordRef.current.begin = x
            event.target.style.transform = `translate(${x}px, 0px)`
            updateArea(index, begin + x, end + event.dx)
          }
        },
        modifiers: [
          interact.modifiers.restrict({
            restriction: 'parent'
          })
        ]
      })
    }
  }, [])

  const handleFocus = () => {
    handleSelectArea(index)
  }
  
  return(
    <div tabIndex={1} className={classes.area} style={{width: `${end}px`}} ref={selfRef} onFocus={handleFocus}></div>
  )
}

export default Cut