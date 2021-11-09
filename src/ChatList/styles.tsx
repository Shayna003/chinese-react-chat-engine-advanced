import { Properties } from 'csstype';

export const styles = {
  chatListContainer: {
    width: '100%',
    height: '100%',
    maxHeight: '100vh',
    overflowY: 'scroll',
    overflowX: 'hidden',
    borderRight: '1px solid #afafaf',
    backgroundColor: 'white',
    fontFamily: 'Avenir',
  } as Properties,
  loadingStyle: {
    overflowY: 'hidden',
  } as Properties,
};