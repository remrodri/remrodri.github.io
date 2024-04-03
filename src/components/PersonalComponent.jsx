import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  base: () => ({
    height: "100%",
    width: "100%",
    background: {
      default: "rgba(248, 248, 255, 0.21)",
    },
    borderTopRightRadius: "16px",
    borderBottomRightRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(13px)",
    border: "1px solid rgba(248, 248, 255, 0.3)",
  }),
});
function PersonalComponent() { 
  return (
    <div {...stylex.props(styles.base())}>
      
    </div>
  )
}
export  default PersonalComponent;