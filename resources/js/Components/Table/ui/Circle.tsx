import { FC } from "react";

type Props = {
    outerColor: string
    innerColor: string
}

export const Circle: FC<Props> = ({outerColor, innerColor}) => {
  return (
    <div style={{
      position: 'relative',
      width: '20px',
      height: '20px',
      filter: 'drop-shadow(0px 2px 1.5px rgba(0, 0, 0, 0.25))'
    }}>
      {/* Внешнее кольцо */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        border: `2px solid ${outerColor}`,
        boxSizing: 'border-box'
      }} />
      
      {/* Внутренний круг*/}
      <div style={{
        position: 'absolute',
        top: '5px',
        left: '5px',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: `${innerColor}`,
        filter: 'drop-shadow(0px 2px 1px rgba(0, 0, 0, 0.25))'
      }} />
    </div>
  );
};