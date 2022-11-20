import './NullSpacer.styles.scss';

// This component is created just to add slight margin to top of the navigation and upping the z-index such that data flows under this and not above, providing better visual exp to the user.

function NullSpacer() {
  return <div className='null-spacer'></div>;
}

export default NullSpacer;
