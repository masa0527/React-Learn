const mainColor = '#89C9FA';
const mainBorder = '1px solid silver';
export const styles = {
  title: {
    borderBottom: mainBorder,
    backgroundColor: mainColor,
    color: 'white',
    fontSize: '1em',
    padding: 4
  },
  editor: {
    width: 600 - 24,
    padding: 4,
    font: '1em',
    backgroundColor: '#F0F0FF'
  },
  editorPad: {
    position: 'fixed',
    top: 0,
    width: 600 - 16,
    backgroundColor: 'white'
  },
  content: {
    margin: 8,
    borderBottom: mainBorder
  },
  avatar: {
    float: 'left',
    width: 120
  },
  cText: {
    float: 'left',
    width: 430,
    padding: 8
  },
  reBlog: {
    backgroundColor: mainColor
  }
};
