import * as stylex from '@stylexjs/stylex';


const styles = stylex.create({
  base: () => ({
    height: "40px",
    width: "80px",
  }),

  checkbox: () => ({
    height: '100%',
    width:'100%'
  }),
});

function MyToggleSwitch() { 
  return (
    <label >
  <input type="checkbox" value={true} defaultChecked/>
  <div >
    <div ></div>
  </div>
</label>

  )
}
export default MyToggleSwitch;